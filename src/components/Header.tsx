"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#nature", label: "Our approach" },
  { href: "#doctors", label: "Doctors" },
  { href: "#treatments", label: "Care" },
  { href: "#stories", label: "Stories" },
  { href: "#clinics", label: "Clinics" },
];

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid || open ? "bg-cream/85 backdrop-blur-md shadow-[0_1px_0_rgb(18_39_27/0.08)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-[90rem] items-center justify-between px-[5vw]">
        <a href="#top" aria-label="Dr Gopalkar's Homoeopathy, home" className="shrink-0">
          <img src="/images/brand/logo.png" alt="Dr Gopalkar's Homoeopathy" width={250} height={59} className="h-10 w-auto" />
        </a>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Main">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="group relative text-[0.92rem] font-medium text-forest">
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-crimson transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#book" className="btn btn-primary !py-2.5 !px-5 text-sm">
            Book a visit
          </a>
          <button
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`h-px w-6 bg-forest transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-forest transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-px w-6 bg-forest transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-forest/10 bg-cream px-[5vw] pb-6 pt-2 lg:hidden" aria-label="Mobile">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-forest/10 py-4 font-display text-2xl text-forest"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
