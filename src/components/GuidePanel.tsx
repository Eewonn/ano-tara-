import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Send, Sparkles, Zap } from "lucide-react";
import type { Destination } from "../types/destination";
import { streamGuide, SUGGESTED_PROMPTS, type GuideMessage } from "../lib/groqGuide";

interface GuidePanelProps {
  destination: Destination;
  onBack: () => void;
}

export default function GuidePanel({ destination, onBack }: GuidePanelProps) {
  const [messages, setMessages] = useState<GuideMessage[]>([
    {
      role: "assistant",
      content: `Tara! I'm your local guide for ${destination.name}. ${destination.guideScript.split(".").slice(0, 2).join(".")}.  Ano gusto mong malaman?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    abortRef.current?.abort();
    setMessages([
      {
        role: "assistant",
        content: `Tara! I'm your local guide for ${destination.name}. ${destination.guideScript.split(".").slice(0, 2).join(".")}.  Ano gusto mong malaman?`,
      },
    ]);
    setError(null);
  }, [destination.id]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const send = async (text: string) => {
    if (!text.trim() || streaming) return;
    setError(null);
    const userMsg: GuideMessage = { role: "user", content: text.trim() };
    setMessages((m) => [...m, userMsg, { role: "assistant", content: "" }]);
    setInput("");
    setStreaming(true);

    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      await streamGuide(
        destination,
        messages,
        text.trim(),
        (chunk) => {
          setMessages((m) => {
            const next = [...m];
            const last = next[next.length - 1];
            if (last?.role === "assistant") {
              next[next.length - 1] = { ...last, content: last.content + chunk };
            }
            return next;
          });
        },
        ctrl.signal,
      );
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      setError((e as Error).message);
      setMessages((m) => m.slice(0, -1));
    } finally {
      setStreaming(false);
    }
  };

  return (
    <div className="flex h-full flex-col -m-5">
      <div className="flex items-center justify-between border-b border-black/5 bg-white px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-semibold text-heritage hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <div className="flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent">
          <Zap className="h-3 w-3" />
          Powered by Groq
        </div>
      </div>

      <div className="border-b border-black/5 bg-gradient-to-br from-accent/8 via-cream-strong to-white px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">
              Tara, your local guide
            </p>
            <p className="font-serif text-base font-semibold text-heritage">
              {destination.name}
            </p>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "rounded-br-md bg-heritage text-white"
                  : "rounded-bl-md bg-white text-ink ring-1 ring-black/[0.05]"
              }`}
            >
              {m.content || (
                <span className="inline-flex gap-1">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted [animation-delay:300ms]" />
                </span>
              )}
            </div>
          </div>
        ))}

        {error && (
          <div className="rounded-xl bg-brick/10 px-3 py-2 text-xs text-brick">
            {error}
          </div>
        )}

        {messages.length === 1 && !streaming && (
          <div className="mt-4">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted">
              Try asking
            </p>
            <div className="flex flex-col gap-2">
              {SUGGESTED_PROMPTS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => send(p)}
                  className="rounded-2xl bg-white px-3.5 py-2.5 text-left text-sm text-heritage ring-1 ring-black/[0.05] transition hover:ring-accent/40"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 border-t border-black/5 bg-white p-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tanong mo, kuya/ate guide…"
          disabled={streaming}
          className="flex-1 rounded-full bg-cream-strong px-4 py-2.5 text-sm text-ink outline-none placeholder:text-muted disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={streaming || !input.trim()}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white shadow-sm transition hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
          aria-label="Send"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
