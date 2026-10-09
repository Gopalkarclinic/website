import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Film, { type Beat } from "@/components/Film";
import Doctors from "@/components/Doctors";
import Treatments from "@/components/Treatments";
import Stories from "@/components/Stories";
import Clinics from "@/components/Clinics";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import StickyBar from "@/components/StickyBar";
import { clinics, doctors, site } from "@/data/site";

const natureBeats: Beat[] = [
  {
    from: 0, to: 0.5,
    title: "Every remedy begins in nature.",
    body: "Plants like tulsi and neem have been part of Indian healing for centuries. Homoeopathic medicines are made from natural substances.",
  },
  {
    from: 0.5, to: 1,
    title: "We start by listening.",
    body: "Our doctors look at you, not only your report: your body, your mind, your sleep and your habits.",
  },
];

const individualBeats: Beat[] = [
  {
    from: 0, to: 0.5,
    title: "Two people. Two different medicines.",
    body: "In classical homoeopathy the remedy is chosen for the whole person, so even the same problem can need a different medicine.",
  },
  {
    from: 0.5, to: 1,
    title: "Experience you can lean on.",
    body: `${site.years} years of practice. More than a thousand patients visit every year, in four cities.`,
  },
];

const gentleBeats: Beat[] = [
  {
    from: 0, to: 0.5,
    title: "Small pellets. Made with care.",
    body: "Homoeopathic medicines are given in very small doses, simple to take at home and easy to follow.",
  },
  {
    from: 0.5, to: 1,
    title: "Too far to visit? We come to you.",
    body: "We courier medicines across India and abroad, so your treatment can continue wherever you are.",
  },
];

const jsonLd = [
  ...clinics
    .filter((c) => c.confirmed)
    .map((c) => ({
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      name: `${site.name}, ${c.city}`,
      url: site.url,
      telephone: site.phone,
      email: site.email,
      medicalSpecialty: "Homeopathy",
      address: {
        "@type": "PostalAddress",
        streetAddress: c.address.slice(0, -1).join(", "),
        addressLocality: c.city,
        addressRegion: c.region,
        addressCountry: "IN",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "21:00",
      },
      sameAs: Object.values(site.social),
    })),
  {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctors[0].name,
    medicalSpecialty: "Homeopathy",
    image: `${site.url}${doctors[0].photo}`,
    url: site.url,
  },
];

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main>
        <Hero />
        <Film id="nature" dir="tulsi" count={72} index="01" label="Nature" tone="dark" beats={natureBeats} />
        <Film id="approach" dir="neem" count={69} index="02" label="One person at a time" tone="dark" beats={individualBeats} />
        <Film id="gentle" dir="pellets" count={82} index="03" label="Gentle medicine" tone="light" beats={gentleBeats} length={2.6} />
        <Doctors />
        <Treatments />
        <Stories />
        <Clinics />
        <Booking />
      </main>
      <Footer />
      <StickyBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
