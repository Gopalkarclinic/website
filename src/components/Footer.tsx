import { clinics, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-forest text-cream/80">
      <div className="mx-auto grid max-w-[90rem] gap-14 px-[5vw] py-20 md:grid-cols-12">
        <div className="md:col-span-4">
          <span className="inline-block bg-cream px-4 py-3">
            <img src="/images/brand/logo.png" alt="Dr Gopalkar's Homoeopathy" width={250} height={59} className="h-10 w-auto" />
          </span>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream/60">
            Classical homoeopathy for over {site.years} years. Kolhapur · Pune · Nipani · Mumbai.
          </p>
          <div className="mt-6 flex gap-5 text-sm">
            <a className="hover:text-cream" href={site.social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
            <a className="hover:text-cream" href={site.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a className="hover:text-cream" href={site.social.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:col-span-5">
          {clinics.filter((c) => c.confirmed).map((c) => (
            <div key={c.id}>
              <h3 className="font-display text-lg text-cream">{c.city}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/60">{c.address.join(", ")}</p>
            </div>
          ))}
        </div>

        <div className="md:col-span-3">
          <h3 className="font-display text-lg text-cream">Contact</h3>
          <ul className="mt-2 space-y-1 text-sm text-cream/70">
            <li><a href={`tel:+${site.phoneRaw}`} className="hover:text-cream">{site.phone}</a></li>
            <li><a href={`tel:+919423261543`} className="hover:text-cream">{site.altPhone}</a></li>
            <li><a href={`mailto:${site.email}`} className="break-all hover:text-cream">{site.email}</a></li>
            <li className="pt-2 text-cream/50">{site.hours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <p className="mx-auto max-w-[90rem] px-[5vw] py-6 text-xs leading-relaxed text-cream/40">
          © {new Date().getFullYear()} Dr Gopalkar's Homoeopathy. The information on this website is for general awareness
          and does not replace advice from a qualified doctor. Treatment results differ from person to person.
        </p>
      </div>
    </footer>
  );
}
