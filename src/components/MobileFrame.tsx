import { useEffect, useState } from "react";

const BREAKPOINT = 768;

export default function MobileFrame({ children }: { children: React.ReactNode }) {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= BREAKPOINT : false,
  );

  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${BREAKPOINT}px)`);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  if (!isDesktop) {
    return <div className="h-full w-full">{children}</div>;
  }

  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });

  return (
    <div className="flex h-full w-full items-center justify-center overflow-auto bg-gradient-to-br from-[#2a1f17] via-[#1c1917] to-[#2a1f17] p-6">
      <div className="flex flex-col items-center gap-4">
        <div className="text-center">
          <p className="font-serif text-2xl font-semibold text-cream">AnoTara</p>
          <p className="text-xs text-cream/60">Philippine stories on the map</p>
        </div>

        <div
          className="relative shrink-0 rounded-[2.75rem] bg-[#0a0908] p-[10px] shadow-[0_30px_80px_-10px_rgba(0,0,0,0.6),0_0_0_2px_rgba(255,255,255,0.04)_inset]"
          style={{ width: 412, height: 850 }}
        >
          <div className="absolute inset-[10px] rounded-[2.25rem] ring-1 ring-white/5" />
          <div className="relative h-full w-full overflow-hidden rounded-[2.25rem] bg-cream">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-[1000] flex items-center justify-between px-7 pt-2 text-[11px] font-semibold text-ink/90">
              <span>{time}</span>
              <div className="absolute left-1/2 top-1.5 h-6 w-28 -translate-x-1/2 rounded-full bg-[#0a0908]" />
              <div className="flex items-center gap-1">
                <span>􀙇</span>
                <span>􀛨</span>
                <span>􀛪</span>
              </div>
            </div>
            <div className="absolute inset-0 pt-7">{children}</div>
            <div className="pointer-events-none absolute inset-x-0 bottom-1.5 z-[1000] flex justify-center">
              <div className="h-1 w-32 rounded-full bg-ink/80" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
