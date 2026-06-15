import type { Context } from "@netlify/functions";
import {
  rehearse,
  interlocuteur,
  variationVue,
  type Lang,
} from "./lib/portique.ts";

interface Body {
  mode: "rehearse" | "interlocuteur" | "vue";
  lang?: Lang;
  peur?: string;
  question?: string;
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export default async (req: Request, _context: Context) => {
  if (req.method !== "POST") return json({ error: "POST only" }, 405);

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const lang: Lang = body.lang === "en" ? "en" : "fr";
  const en = lang === "en";

  // ── Fast paths (haiku, plain JSON) ────────────────────────────────────────
  if (body.mode === "interlocuteur") {
    const q = (body.question ?? "").trim();
    if (q.length < 3) {
      return json({ error: en ? "Write your question." : "Écris ta question." }, 400);
    }
    try {
      return json(await interlocuteur(q, lang));
    } catch (err) {
      return json({ error: err instanceof Error ? err.message : "Unknown error" }, 500);
    }
  }

  if (body.mode === "vue") {
    try {
      return json(await variationVue(lang));
    } catch (err) {
      return json({ error: err instanceof Error ? err.message : "Unknown error" }, 500);
    }
  }

  // ── Le matin — rehearsal (opus). NDJSON keepalive. ────────────────────────
  if (body.mode === "rehearse") {
    const peur = (body.peur ?? "").trim();
    if (peur.length < 3) {
      return json({ error: en ? "First write what you dread." : "Écris d'abord ce que tu redoutes." }, 400);
    }

    // The Opus rehearsal can run ~25–55s — longer than the synchronous proxy's
    // idle timeout. We stream NDJSON: a heartbeat every 3s keeps the connection
    // live, then a final { result } | { error } line carries the payload. The
    // client reads to end-of-stream and parses the last JSON line.
    const enc = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        let done = false;
        const beat = setInterval(() => {
          if (!done) {
            try {
              controller.enqueue(enc.encode("\n"));
            } catch {
              /* closed */
            }
          }
        }, 3000);

        try {
          const result = await rehearse(peur, lang);
          done = true;
          clearInterval(beat);
          controller.enqueue(enc.encode(JSON.stringify({ result }) + "\n"));
        } catch (err) {
          done = true;
          clearInterval(beat);
          const message =
            err instanceof Error ? err.message : en ? "Unknown error" : "Erreur inconnue";
          controller.enqueue(enc.encode(JSON.stringify({ error: message }) + "\n"));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": "application/x-ndjson; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Accel-Buffering": "no",
      },
    });
  }

  return json({ error: en ? "Unknown mode" : "Mode inconnu" }, 400);
};
