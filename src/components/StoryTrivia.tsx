import { useState } from "react";
import { Brain, Check, Sparkles, X } from "lucide-react";
import type { Destination } from "../types/destination";
import { generateTrivia, type TriviaQuestion } from "../lib/groqTrivia";

export default function StoryTrivia({ destination }: { destination: Destination }) {
  const [state, setState] = useState<
    | { kind: "idle" }
    | { kind: "loading" }
    | { kind: "ready"; q: TriviaQuestion; picked: number | null }
    | { kind: "error"; message: string }
  >({ kind: "idle" });

  const start = async () => {
    setState({ kind: "loading" });
    try {
      const q = await generateTrivia(destination);
      setState({ kind: "ready", q, picked: null });
    } catch (e) {
      setState({ kind: "error", message: (e as Error).message });
    }
  };

  if (state.kind === "idle") {
    return (
      <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-heritage to-ink p-5 text-cream">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/15">
            <Brain className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-cream/60">
              Test yourself · Subok mo
            </p>
            <p className="font-serif text-base font-semibold">
              How well did you read the story?
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={start}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-2.5 text-sm font-semibold text-white"
        >
          <Sparkles className="h-4 w-4" />
          Start AI quiz
        </button>
      </section>
    );
  }

  if (state.kind === "loading") {
    return (
      <section className="rounded-2xl bg-heritage p-5 text-cream">
        <div className="flex items-center gap-2 text-sm">
          <Sparkles className="h-4 w-4 animate-pulse" />
          Generating your quiz…
        </div>
      </section>
    );
  }

  if (state.kind === "error") {
    return (
      <section className="rounded-2xl bg-brick/10 p-4 text-sm text-brick">
        Quiz failed: {state.message}
      </section>
    );
  }

  const { q, picked } = state;
  const answered = picked !== null;

  return (
    <section className="overflow-hidden rounded-2xl bg-heritage p-5 text-cream">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-cream/60">
        AI quiz · Subok mo
      </p>
      <p className="mt-1.5 font-serif text-[16px] leading-snug">{q.question}</p>
      <div className="mt-3 space-y-2">
        {q.choices.map((choice, i) => {
          const isCorrect = i === q.correctIndex;
          const isPicked = picked === i;
          let cls = "bg-cream/8 ring-1 ring-cream/15 text-cream/90";
          if (answered && isCorrect) cls = "bg-success/25 ring-2 ring-success text-cream";
          else if (answered && isPicked) cls = "bg-brick/25 ring-2 ring-brick text-cream";
          return (
            <button
              key={i}
              type="button"
              disabled={answered}
              onClick={() => setState({ kind: "ready", q, picked: i })}
              className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition ${cls}`}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cream/15 text-[10px] font-bold">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1 leading-snug">{choice}</span>
              {answered && isCorrect && <Check className="h-4 w-4 text-success" />}
              {answered && isPicked && !isCorrect && <X className="h-4 w-4 text-brick" />}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="mt-3 rounded-xl bg-cream/8 p-3 text-[13px] leading-snug text-cream/95">
          <span className="font-semibold">
            {picked === q.correctIndex ? "Tama! · Correct" : "Sayang · Close, but"}{" "}
          </span>
          {q.explanation}
        </div>
      )}
      {answered && (
        <button
          type="button"
          onClick={start}
          className="mt-3 w-full rounded-xl bg-cream/10 py-2 text-xs font-semibold text-cream"
        >
          Try another question
        </button>
      )}
    </section>
  );
}
