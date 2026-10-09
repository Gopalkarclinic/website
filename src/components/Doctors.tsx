"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { doctors } from "@/data/site";

export default function Doctors() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.set(".reveal", { visibility: "visible" });
      gsap.from(".d-head", {
        opacity: 0, y: 40, duration: 1, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: ".d-head", start: "top 82%" },
      });
      gsap.utils.toArray<HTMLElement>(".d-card").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0, y: 70, duration: 1.1, ease: "power3.out", delay: (i % 2) * 0.12,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
        const img = el.querySelector("img");
        if (img) {
          gsap.fromTo(img, { scale: 1.12 }, {
            scale: 1, ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          });
        }
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="doctors" className="relative bg-cream py-[16vh]">
      <div className="mx-auto grid max-w-[90rem] gap-16 px-[5vw] lg:grid-cols-12">
        <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
          <p className="reveal d-head mb-6 flex items-center gap-3 text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-crimson">
            <span className="h-px w-10 bg-crimson" /> The people
          </p>
          <h2 className="reveal d-head text-[clamp(2.4rem,5vw,4.6rem)] font-light leading-[1.02] tracking-[-0.02em] text-forest">
            A family of doctors, <em className="text-crimson">one</em> way of caring.
          </h2>
          <p className="reveal d-head mt-8 max-w-md text-lg leading-relaxed text-forest/75">
            Dr Vinaykumar Gopalkar began as a classical homoeopath and built a hospital and research centre in Kolhapur.
            Today the family team looks after patients across Kolhapur, Pune, Nipani and Mumbai.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-14 lg:col-span-7 lg:gap-x-10">
          {doctors.map((d, i) => (
            <article key={d.id} className={`d-card ${i % 2 ? "mt-14 lg:mt-24" : ""}`}>
              <div className="aspect-[7/9] max-w-[350px] overflow-hidden bg-forest/5">
                <img src={d.photo} alt={d.name} width={350} height={449} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <h3 className="mt-5 text-[1.45rem] font-normal leading-tight text-forest">{d.name}</h3>
              <p className="mt-1 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-crimson">{d.role}</p>
              <p className="mt-3 max-w-[22rem] text-[0.95rem] leading-relaxed text-forest/70">{d.line}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
