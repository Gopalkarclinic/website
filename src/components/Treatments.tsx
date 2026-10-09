"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { treatments } from "@/data/site";

// Desktop: the section pins and the panels glide sideways as you scroll down.
// Phone/tablet: a normal swipeable row.
export default function Treatments() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const t = track.current!;
        const dist = () => Math.max(0, t.scrollWidth - window.innerWidth);
        const tween = gsap.to(t, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${dist() * 1.05}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        // gentle parallax inside each image as it travels
        gsap.utils.toArray<HTMLElement>(".t-img").forEach((img) => {
          gsap.fromTo(img, { xPercent: -6 }, {
            xPercent: 6, ease: "none",
            scrollTrigger: { trigger: img, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
          });
        });
      });
    }, root);
    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} id="treatments" className="relative overflow-hidden bg-paper lg:h-[100svh]">
      <div
        ref={track}
        className="flex h-full items-center gap-6 overflow-x-auto px-[5vw] py-24 [scrollbar-width:none] snap-x snap-mandatory scroll-px-[5vw] lg:gap-10 lg:overflow-visible lg:py-0 lg:pr-[10vw] lg:snap-none"
      >
        <div className="shrink-0 snap-start pr-6 lg:w-[30vw] lg:pr-12">
          <p className="mb-6 flex items-center gap-3 text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-crimson">
            <span className="h-px w-10 bg-crimson" /> What we care for
          </p>
          <h2 className="w-[78vw] max-w-[28rem] text-[clamp(2.4rem,4.6vw,4.4rem)] font-light leading-[1.02] tracking-[-0.02em] text-forest lg:w-auto">
            Eight areas of care, <em className="text-crimson">one</em> approach.
          </h2>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-forest/70">
            Homoeopathy works best when it is planned for you. These are the conditions most of our patients come with.
          </p>
          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-forest/45">Swipe or keep scrolling →</p>
        </div>

        {treatments.map((t, i) => (
          <article key={t.id} className="w-[74vw] max-w-[22rem] shrink-0 snap-start lg:w-[25vw] lg:max-w-none lg:min-w-[22rem]">
            <div className="relative aspect-[4/5] overflow-hidden bg-forest/5">
              <img
                src={t.img}
                alt={`${t.title}: still life of natural ingredients`}
                width={900}
                height={1125}
                loading="lazy"
                className="t-img h-full w-[112%] max-w-none object-cover lg:-ml-[6%]"
              />
              <span className="absolute left-4 top-4 font-display text-sm text-forest/70">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-5 text-[1.55rem] font-normal leading-tight text-forest">{t.title}</h3>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-forest/70">{t.blurb}</p>
            <p className="mt-3 text-[0.78rem] leading-relaxed tracking-wide text-crimson/90">{t.conditions.join("  ·  ")}</p>
          </article>
        ))}

        <a
          href="#book"
          className="group flex aspect-[4/5] w-[74vw] max-w-[22rem] shrink-0 snap-start flex-col justify-between bg-forest p-8 text-cream lg:w-[22vw] lg:max-w-none lg:min-w-[19rem]"
        >
          <span className="font-display text-3xl font-light leading-tight">Not sure where your problem fits?</span>
          <span className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em]">
            Talk to us <span className="transition-transform group-hover:translate-x-2">→</span>
          </span>
        </a>
      </div>
    </section>
  );
}
