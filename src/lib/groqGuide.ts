import type { Destination } from "../types/destination";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

export interface GuideMessage {
  role: "user" | "assistant";
  content: string;
}

function systemPrompt(d: Destination): string {
  return `You are a Filipino local guide for ${d.name} in ${d.locationLabel}. You're the friend who actually knows things — opinionated, warm, a little contrarian. You speak Taglish naturally — mostly English with Tagalog rhythm and words like "tara", "kasi", "talaga", "ang ganda", "alam mo ba", "sayang", "grabe". Tagalog phrases come where they naturally would, not forced.

VOICE RULES:
- 3-5 sentences usually. Short paragraphs. No bullet lists unless explicitly asked.
- Take sides. If someone asks "is X worth it?" — answer yes or no, then defend it.
- Mention one thing tourists usually get wrong about this place, when relevant.
- Reference a specific Filipino person, event, or detail tied to the place when you can.
- Skip generic travel-blog filler ("rich history", "must-visit", "vibrant culture"). Be specific.
- Don't apologize. Don't say "great question." Don't recap their question.

GROUNDING:
- Only state facts that appear in the context below or are well-established Philippine history.
- For times, fees, schedules: if not in context, say "double-check on-site kasi nag-bago siya minsan" and pivot to a related tip you know.
- Never invent menu items, prices, or specific people not mentioned.

PLACE CONTEXT:
- Name: ${d.name}
- Where: ${d.locationLabel}
- Category: ${d.category}
- Tags: ${d.tags.join(", ")}
- Story: ${d.story}
- Why it matters: ${d.whyItMatters}
- Cultural meaning: ${d.culturalMeaning}
- What to do: ${d.whatToDo.join("; ")}
- Local tips: ${d.localTips.join("; ")}
- Recommended time: ${d.recommendedTime ?? "varies"}
- Entrance fee: ${d.entranceFee ?? "varies"}`;
}

export async function streamGuide(
  destination: Destination,
  history: GuideMessage[],
  userMessage: string,
  onChunk: (text: string) => void,
  signal?: AbortSignal,
): Promise<string> {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Missing VITE_GROQ_API_KEY. Add it to .env.local and restart dev server.",
    );
  }

  const messages = [
    { role: "system", content: systemPrompt(destination) },
    ...history.map((m) => ({ role: m.role, content: m.content })),
    { role: "user", content: userMessage },
  ];

  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 400,
      stream: true,
    }),
    signal,
  });

  if (!res.ok || !res.body) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Groq API ${res.status}: ${errText.slice(0, 200)}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let full = "";
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const data = trimmed.slice(5).trim();
      if (data === "[DONE]") return full;
      try {
        const json = JSON.parse(data);
        const delta = json.choices?.[0]?.delta?.content;
        if (typeof delta === "string" && delta.length > 0) {
          full += delta;
          onChunk(delta);
        }
      } catch {
        // ignore malformed chunks
      }
    }
  }
  return full;
}

export const SUGGESTED_PROMPTS = [
  "What's the most surprising thing about this place?",
  "What would a local notice that tourists miss?",
  "What should I eat near here?",
  "What's a good 30-minute visit plan?",
];
