"use client";

import { useState } from "react";
import { clinics, site } from "@/data/site";

export default function Clinics() {
  const [active, setActive] = useState(0);
  const c = clinics[active];
  const mapHref =
    c.mapUrl ??
    (c.confirmed
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Dr Gopalkar's Homoeopathy ${c.address.join(", ")}`)}`
      : undefined);

  return (
    <section id="clinics" className="relative bg-cream py-[16vh]">
      <div className="mx-auto max-w-[90rem] px-[5vw]">
        <p className="mb-6 flex items-center gap-3 text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-crimson">
          <span className="h-px w-10 bg-crimson" /> Find us
        </p>
        <h2 className="max-w-3xl text-[clamp(2.4rem,5vw,4.6rem)] font-light leading-[1.02] tracking-[-0.02em] text-forest">
          Four cities. <em className="text-crimson">One</em> phone number to start.
        </h2>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6" role="tablist" aria-label="Clinic cities">
            {clinics.map((cl, i) => (
              <button
                key={cl.id}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`group flex w-full items-baseline gap-5 border-t border-forest/15 py-4 text-left transition-all last:border-b ${
                  i === active ? "text-forest" : "text-forest/30 hover:text-forest/70"
                }`}
              >
                <span className="font-display text-sm tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-[clamp(2.4rem,6vw,5.4rem)] font-light leading-none tracking-[-0.02em]">{cl.city}</span>
                <span className={`ml-auto text-xl transition-transform ${i === active ? "translate-x-0 text-crimson" : "-translate-x-2 opacity-0 group-hover:opacity-60"}`}>→</span>
              </button>
            ))}
          </div>

          <div key={c.id} className="lg:col-span-6 lg:pl-10" style={{ animation: "fadeUp .6s ease both" }}>
            <div className="border border-forest/15 bg-paper p-8 md:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-crimson">
                {c.city}, {c.region}
              </p>
              <address className="mt-5 font-display text-[1.7rem] font-light not-italic leading-snug text-forest">
                {c.address.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
              </address>
              {c.note && <p className="mt-4 text-sm text-forest/60">{c.note}</p>}

              <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-forest/10 pt-6 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-[0.16em] text-forest/45">Open</dt>
                  <dd className="mt-1 text-forest">{c.confirmed ? site.hours : "Timings shared on call"}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.16em] text-forest/45">Call</dt>
                  <dd className="mt-1 text-forest"><a href={`tel:+${site.phoneRaw}`} className="hover:text-crimson">{site.phone}</a></dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                {mapHref && (
                  <a href={mapHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary !py-3 text-sm">Get directions</a>
                )}
                <a href="#book" className="btn btn-ghost !py-3 text-sm text-forest">Book at {c.city}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}`}</style>
    </section>
  );
}
