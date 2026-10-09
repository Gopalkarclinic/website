"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { site } from "@/data/site";

// The opening: emerald ink dissolves into warm light, and the headline appears as it clears.
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const v = video.current;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: reduce ? 0 : 1.3 });
      tl.set(".reveal", { visibility: "visible" })
        .from(".h-line > span", { yPercent: 115, duration: 1.15, ease: "power4.out", stagger: 0.13 })
        .from(".h-fade", { opacity: 0, y: 20, duration: 0.9, ease: "power2.out", stagger: 0.1 }, "-=0.7");
      if (reduce) tl.progress(1);
    }, root);

    if (v && !reduce) {
      v.play().catch(() => {
        // autoplay blocked (data saver etc.): the last frame is shown instead
        v.currentTime = v.duration || 0;
      });
    }
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-cream">
      <video
        ref={video}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        playsInline
        preload="auto"
        poster="/media/hero/ink-first.webp"
        aria-hidden="true"
      >
        <source src="/media/hero/ink-720.mp4" type="video/mp4" media="(max-width: 768px)" />
        <source src="/media/hero/ink-1080.mp4" type="video/mp4" />
      </video>
      {/* soft cream wash on the left so text stays readable once the ink has cleared */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cream/75 via-cream/25 to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-[90rem] flex-col justify-end px-[5vw] pb-[9svh] pt-28">
        <p className="reveal h-fade mb-6 flex items-center gap-3 text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-crimson">
          <span className="h-px w-10 bg-crimson" /> Classical homoeopathy for {site.years} years
        </p>

        <h1 className="max-w-[16ch] text-[clamp(2.9rem,8.2vw,7.6rem)] font-light leading-[0.98] tracking-[-0.025em] text-forest">
          <span className="mask reveal h-line"><span>Healing that</span></span>
          <span className="mask reveal h-line"><span>begins in <em className="font-normal text-crimson">nature.</em></span></span>
        </h1>

        <p className="reveal h-fade mt-8 max-w-[34rem] text-lg leading-relaxed text-forest/80">
          Four doctors, four cities, one belief: the right medicine is chosen for the whole person, not only for the
          problem.
        </p>

        <div className="reveal h-fade mt-10 flex flex-wrap items-center gap-4">
          <a href="#book" className="btn btn-primary">Book an appointment</a>
          <a
            href={`https://api.whatsapp.com/send?phone=${site.whatsapp}&text=${encodeURIComponent("Hello, I would like to book an appointment.")}`}
            className="btn btn-ghost text-forest"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat on WhatsApp
          </a>
        </div>

        <dl className="reveal h-fade mt-14 hidden max-w-3xl grid-cols-4 gap-8 border-t border-forest/15 pt-6 md:grid">
          {[
            [site.years, "years of practice"],
            ["4", "clinics in 4 cities"],
            ["1000+", "patients every year"],
            ["India & abroad", "medicine courier"],
          ].map(([n, l]) => (
            <div key={l}>
              <dt className="font-display text-2xl text-forest">{n}</dt>
              <dd className="mt-1 text-[0.8rem] leading-snug text-forest/65">{l}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="absolute bottom-6 right-[5vw] z-10 hidden items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-forest/60 md:flex">
        Scroll <span className="relative h-10 w-px overflow-hidden bg-forest/20"><span className="absolute inset-x-0 top-0 h-1/2 animate-[cue_1.8s_ease-in-out_infinite] bg-crimson" /></span>
      </div>
      <style>{`@keyframes cue{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`}</style>
    </section>
  );
}
