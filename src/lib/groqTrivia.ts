import type { Destination } from "../types/destination";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

export interface TriviaQuestion {
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
}

export async function generateTrivia(
  destination: Destination,
  signal?: AbortSignal,
): Promise<TriviaQuestion> {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) throw new Error("Missing VITE_GROQ_API_KEY");

  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      response_format: { type: "json_object" },
      temperature: 0.6,
      max_tokens: 350,
      messages: [
        {
          role: "system",
          content:
            'Generate one short trivia question for a Filipino traveler about a place. Use only the provided story/cultural context. Return JSON exactly: {"question": string, "choices": [string,string,string,string], "correctIndex": number 0-3, "explanation": string}. The question should reward attentive reading, not just trivia. Wrong choices must be plausible. Explanation: 1-2 sentences.',
        },
        {
          role: "user",
          content: `Place: ${destination.name} (${destination.locationLabel})
Story: ${destination.story}
Cultural meaning: ${destination.culturalMeaning}
Why it matters: ${destination.whyItMatters}`,
        },
      ],
    }),
    signal,
  });

  if (!res.ok) {
    const err = await res.text().catch(() => "");
    throw new Error(`Groq trivia ${res.status}: ${err.slice(0, 200)}`);
  }
  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("No trivia content returned");
  const parsed = JSON.parse(content);
  if (
    typeof parsed.question !== "string" ||
    !Array.isArray(parsed.choices) ||
    parsed.choices.length !== 4 ||
    typeof parsed.correctIndex !== "number" ||
    parsed.correctIndex < 0 ||
    parsed.correctIndex > 3
  ) {
    throw new Error("Malformed trivia response");
  }
  return parsed as TriviaQuestion;
}
