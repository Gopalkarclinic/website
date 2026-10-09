"use client";

import { useState } from "react";
import { clinics, site } from "@/data/site";

// Phase 1: the request opens WhatsApp with the details filled in.
// Phase 2 (backend): the same form will save to the clinic's own dashboard before opening WhatsApp.
export default function Booking() {
  const [err, setErr] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const phone = String(f.get("phone") || "").replace(/\D/g, "");
    if (name.length < 2) return setErr("Please enter your name.");
    if (phone.length < 10) return setErr("Please enter a valid 10-digit phone number.");
    setErr("");
    const lines = [
      "Hello Dr Gopalkar's Homoeopathy, I would like to book an appointment.",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Clinic: ${f.get("clinic")}`,
      f.get("date") ? `Preferred date: ${f.get("date")}` : "",
      f.get("concern") ? `Health concern: ${String(f.get("concern")).trim()}` : "",
    ].filter(Boolean);
    window.open(`https://api.whatsapp.com/send?phone=${site.whatsapp}&text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
  };

  return (
    <section id="book" className="relative bg-paper py-[16vh]">
      <div className="mx-auto grid max-w-[90rem] gap-16 px-[5vw] lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="mb-6 flex items-center gap-3 text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-crimson">
            <span className="h-px w-10 bg-crimson" /> Book a visit
          </p>
          <h2 className="text-[clamp(2.4rem,5vw,4.6rem)] font-light leading-[1.02] tracking-[-0.02em] text-forest">
            Tell us a little. We will <em className="text-crimson">call you back.</em>
          </h2>
          <ul className="mt-10 space-y-5 text-forest/80">
            <li><span className="block text-xs uppercase tracking-[0.18em] text-forest/45">Call</span>
              <a className="font-display text-2xl hover:text-crimson" href={`tel:+${site.phoneRaw}`}>{site.phone}</a></li>
            <li><span className="block text-xs uppercase tracking-[0.18em] text-forest/45">WhatsApp</span>
              <a className="font-display text-2xl hover:text-crimson" href={`https://api.whatsapp.com/send?phone=${site.whatsapp}`} target="_blank" rel="noopener noreferrer">{site.whatsappDisplay}</a></li>
            <li><span className="block text-xs uppercase tracking-[0.18em] text-forest/45">Hours</span>{site.hours}</li>
            <li><span className="block text-xs uppercase tracking-[0.18em] text-forest/45">Far away?</span>We courier medicines across India and abroad.</li>
          </ul>
        </div>

        <form onSubmit={onSubmit} className="lg:col-span-7 lg:pl-10" noValidate>
          <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
            <label className="block text-xs uppercase tracking-[0.16em] text-forest/55">Your name
              <input name="name" autoComplete="name" className="field mt-1 normal-case tracking-normal text-forest" />
            </label>
            <label className="block text-xs uppercase tracking-[0.16em] text-forest/55">Phone number
              <input name="phone" type="tel" inputMode="numeric" autoComplete="tel" className="field mt-1 normal-case tracking-normal text-forest" />
            </label>
            <label className="block text-xs uppercase tracking-[0.16em] text-forest/55">Which clinic?
              <select name="clinic" className="field mt-1 normal-case tracking-normal text-forest">
                {clinics.map((c) => <option key={c.id} value={c.city}>{c.city}</option>)}
              </select>
            </label>
            <label className="block text-xs uppercase tracking-[0.16em] text-forest/55">Preferred date
              <input name="date" type="date" className="field mt-1 normal-case tracking-normal text-forest" />
            </label>
            <label className="block text-xs uppercase tracking-[0.16em] text-forest/55 md:col-span-2">What is troubling you? (optional)
              <textarea name="concern" rows={3} className="field mt-1 resize-none normal-case tracking-normal text-forest" />
            </label>
          </div>

          {err && <p role="alert" className="mt-6 text-sm font-medium text-crimson">{err}</p>}

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <button type="submit" className="btn btn-primary">Send on WhatsApp</button>
            <p className="max-w-xs text-xs leading-relaxed text-forest/50">
              Your details go only to the clinic. For an emergency, please call your nearest hospital.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
