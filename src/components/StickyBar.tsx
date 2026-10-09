import { site } from "@/data/site";

// Always-visible call / WhatsApp / book bar on phones, where most patients arrive.
export default function StickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-forest/10 bg-cream/95 backdrop-blur-md md:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <a href={`tel:+${site.phoneRaw}`} className="py-3.5 text-center text-sm font-semibold text-forest">Call</a>
      <a
        href={`https://api.whatsapp.com/send?phone=${site.whatsapp}&text=${encodeURIComponent("Hello, I would like to book an appointment.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="border-x border-forest/10 py-3.5 text-center text-sm font-semibold text-forest"
      >
        WhatsApp
      </a>
      <a href="#book" className="bg-crimson py-3.5 text-center text-sm font-semibold text-cream">Book</a>
    </div>
  );
}
