"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type Beat = { from: number; to: number; title: string; body: string };

type Props = {
  id: string;
  dir: string; // folder inside /media/frames
  count: number; // number of frames
  index: string; // "01"
  label: string; // "Nature"
  tone: "dark" | "light"; // text colour over the footage
  beats: Beat[];
  length?: number; // pinned scroll length, in viewport heights
};

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

// A pinned, scroll-scrubbed film: the footage is a frame sequence drawn on a canvas,
// so it plays forwards AND backwards exactly in step with the scrollbar, on any phone.
export default function Film({ id, dir, count, index, label, tone, beats, length = 3 }: Props) {
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const beatEls = useRef<(HTMLDivElement | null)[]>([]);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const cv = canvas.current;
    const sec = section.current;
    if (!cv || !sec) return;
    const g = cv.getContext("2d");
    if (!g) return;

    const imgs: (HTMLImageElement | undefined)[] = new Array(count).fill(undefined);
    const src = (i: number) => `/media/frames/${dir}/f${String(i + 1).padStart(3, "0")}.webp`;
    let started = false;
    let alive = true;
    let target = reduced ? 0.55 : 0;
    let cur = target;
    let lastIdx = -1;

    const nearest = (idx: number) => {
      for (let d = 0; d < count; d++) {
        if (imgs[idx - d]) return idx - d;
        if (imgs[idx + d]) return idx + d;
      }
      return -1;
    };

    const draw = () => {
      const idx = nearest(Math.round(cur * (count - 1)));
      if (idx < 0 || idx === lastIdx) return;
      const im = imgs[idx]!;
      lastIdx = idx;
      const cw = cv.width;
      const ch = cv.height;
      const s = Math.max(cw / im.naturalWidth, ch / im.naturalHeight);
      const w = im.naturalWidth * s;
      const h = im.naturalHeight * s;
      g.drawImage(im, (cw - w) / 2, (ch - h) / 2, w, h);
    };

    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      cv.width = Math.round(cv.clientWidth * dpr);
      cv.height = Math.round(cv.clientHeight * dpr);
      lastIdx = -1;
      draw();
    };

    const load = (i: number) =>
      new Promise<void>((resolve) => {
        const im = new Image();
        im.onload = () => {
          imgs[i] = im;
          resolve();
        };
        im.onerror = () => resolve();
        im.src = src(i);
      });

    const start = async () => {
      if (started) return;
      started = true;
      await load(reduced ? Math.round(count * 0.55) : 0);
      draw();
      if (reduced) return;
      const ids = Array.from({ length: count }, (_, i) => i);
      for (let k = 0; k < ids.length && alive; k += 8) {
        await Promise.all(ids.slice(k, k + 8).map((i) => (imgs[i] ? Promise.resolve() : load(i))));
        draw();
      }
    };

    const renderBeats = (p: number) => {
      beats.forEach((b, i) => {
        const el = beatEls.current[i];
        if (!el) return;
        const enter = b.from <= 0 ? 1 : smooth(b.from, b.from + 0.07, p);
        const exit = b.to >= 1 ? 0 : smooth(b.to - 0.07, b.to, p);
        el.style.opacity = String(enter * (1 - exit));
        el.style.transform = `translateY(${(1 - enter) * 28 - exit * 28}px)`;
      });
      if (bar.current) bar.current.style.transform = `scaleY(${p})`;
    };

    fit();
    window.addEventListener("resize", fit);
    const io = new IntersectionObserver(
      (entries) => entries.some((e) => e.isIntersecting) && start(),
      { rootMargin: "120% 0px 120% 0px" }
    );
    io.observe(sec);

    let st: ScrollTrigger | undefined;
    let tick: (() => void) | undefined;
    if (!reduced) {
      st = ScrollTrigger.create({
        trigger: sec,
        start: "top top",
        end: () => `+=${window.innerHeight * length}`,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          target = self.progress;
        },
      });
      tick = () => {
        cur += (target - cur) * 0.14;
        if (Math.abs(target - cur) < 0.0004) cur = target;
        draw();
        renderBeats(cur);
      };
      gsap.ticker.add(tick);
      renderBeats(0);
    }

    return () => {
      alive = false;
      io.disconnect();
      window.removeEventListener("resize", fit);
      if (tick) gsap.ticker.remove(tick);
      st?.kill();
    };
  }, [count, dir, beats, length, reduced]);

  const dark = tone === "dark";
  const text = dark ? "text-cream" : "text-forest";
  const scrim = dark
    ? "bg-gradient-to-r from-[#0b1a11]/85 via-[#0b1a11]/40 to-transparent"
    : "bg-gradient-to-r from-cream/95 via-cream/55 to-transparent";

  if (reduced) {
    return (
      <section ref={section} id={id} className="bg-cream">
        <canvas ref={canvas} className="h-[55svh] w-full" aria-hidden="true" />
        <div className="mx-auto max-w-3xl space-y-12 px-[5vw] py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-crimson">
            {index} · {label}
          </p>
          {beats.map((b) => (
            <div key={b.title}>
              <h2 className="text-4xl font-light leading-tight text-forest">{b.title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-forest/75">{b.body}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={section} id={id} className="relative h-[100svh] w-full overflow-hidden bg-forest">
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <div className={`absolute inset-0 ${scrim}`} />

      <div className={`absolute left-[5vw] top-24 flex items-center gap-4 text-[0.75rem] font-semibold uppercase tracking-[0.24em] ${text} opacity-80`}>
        <span className="font-display text-base tracking-normal">{index}</span>
        <span className="h-px w-10 bg-current" />
        {label}
      </div>

      {beats.map((b, i) => (
        <div
          key={b.title}
          ref={(el) => {
            beatEls.current[i] = el;
          }}
          className={`absolute bottom-[11svh] left-[5vw] max-w-[min(36rem,88vw)] ${text}`}
          style={{ opacity: i === 0 ? 1 : 0 }}
        >
          <h2 className="text-[clamp(2.1rem,5.2vw,4.6rem)] font-light leading-[1.04] tracking-[-0.02em]">{b.title}</h2>
          <p className={`mt-5 max-w-[30rem] text-[1.05rem] leading-relaxed ${dark ? "text-cream/85" : "text-forest/80"}`}>{b.body}</p>
        </div>
      ))}

      <div className="absolute bottom-[11svh] right-[5vw] hidden h-24 w-px overflow-hidden bg-current opacity-30 md:block" style={{ color: dark ? "#f6f1e7" : "#12271b" }}>
        <div ref={bar} className="h-full w-full origin-top bg-crimson" style={{ transform: "scaleY(0)" }} />
      </div>
    </section>
  );
}
