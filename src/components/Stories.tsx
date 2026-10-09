"use client";

import { useState } from "react";
import { stories } from "@/data/site";

export default function Stories() {
  const [i, setI] = useState(0);
  const s = stories[i];

  return (
    <section id="stories" className="relative bg-forest py-[16vh] text-cream">
      <div className="mx-auto grid max-w-[90rem] gap-14 px-[5vw] lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="mb-6 flex items-center gap-3 text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-cream/70">
            <span className="h-px w-10 bg-cream/60" /> Patient stories
          </p>
          <h2 className="text-[clamp(2.2rem,4.2vw,4rem)] font-light leading-[1.04] tracking-[-0.02em]">
            In their <em className="text-[#e7a8ac]">own</em> words.
          </h2>
          <ul className="mt-10 divide-y divide-cream/15 border-y border-cream/15" role="tablist" aria-label="Patient stories">
            {stories.map((st, k) => (
              <li key={st.name}>
                <button
                  role="tab"
                  aria-selected={k === i}
                  onClick={() => setI(k)}
                  className={`flex w-full items-baseline justify-between gap-4 py-5 text-left transition-colors ${
                    k === i ? "text-cream" : "text-cream/45 hover:text-cream/80"
                  }`}
                >
                  <span className="font-display text-xl">{st.name}</span>
                  <span className="text-xs uppercase tracking-[0.14em]">{st.topic}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <figure key={s.name} className="relative lg:col-span-8 lg:pl-12" style={{ animation: "fadeUp .7s ease both" }}>
          <span aria-hidden="true" className="absolute -top-10 left-0 font-display text-[9rem] leading-none text-crimson/80 lg:left-4">“</span>
          <blockquote className="pt-16 font-display text-[clamp(1.5rem,2.9vw,2.6rem)] font-light leading-[1.3] tracking-[-0.01em]">
            {s.quote}
          </blockquote>
          <figcaption className="mt-8 text-sm uppercase tracking-[0.18em] text-cream/65">
            {s.name} · {s.topic}
          </figcaption>
          <p className="mt-10 max-w-xl text-xs leading-relaxed text-cream/45">
            These are personal experiences. Results differ from person to person and this is not medical advice.
          </p>
        </figure>
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}`}</style>
    </section>
  );
}
