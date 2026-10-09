// Single source of truth for the whole site.
// Everything marked TODO needs to be confirmed with the clinic before launch.
// Source of real data: drgopalkarhomeopathy.com (Oct 2026).

export const site = {
  name: "Dr Gopalkar's Homoeopathy",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.drgopalkarhomeopathy.com",
  phone: "+91 98600 30103",
  phoneRaw: "919860030103",
  whatsapp: "918275001443",
  whatsappDisplay: "+91 82750 01443",
  altPhone: "+91 94232 61543",
  email: "drgopalkarshomoeopathy@gmail.com",
  hours: "Monday to Saturday, 9:00 AM – 9:00 PM",
  years: "36+",
  social: {
    facebook: "https://www.facebook.com/Dr.Gopalkar",
    youtube: "https://www.youtube.com/channel/UCNZVMjCBc_hLPrX2_wEhrrA/videos",
    instagram: "https://www.instagram.com/drgopalkar_homoeopathy24/",
  },
};

export type Clinic = {
  id: string;
  city: string;
  region: string;
  address: string[];
  mapUrl?: string;
  note?: string;
  confirmed: boolean;
};

export const clinics: Clinic[] = [
  {
    id: "kolhapur",
    city: "Kolhapur",
    region: "Maharashtra",
    address: ["1507 Bhupal Towers, 1st Floor", "Ford Corner, Laxmipuri", "Kolhapur, Maharashtra 416002"],
    mapUrl: "https://goo.gl/maps/i8NSFY77dUvfXpPh7",
    note: "Main clinic and research centre",
    confirmed: true,
  },
  {
    id: "pune",
    city: "Pune",
    region: "Maharashtra",
    address: ["D-3/21, 1st Floor, Uttara Building", "Link Road, Narhe", "Pune, Maharashtra 411041"],
    confirmed: true,
  },
  {
    id: "nipani",
    city: "Nipani",
    region: "Karnataka",
    address: ["1442 Shetwal Galli", "Near Prabhat Theater", "Nipani, Karnataka"],
    confirmed: true,
  },
  {
    // TODO: address, timings and doctor for Mumbai are not on the current website. Get them from the clinic.
    id: "mumbai",
    city: "Mumbai",
    region: "Maharashtra",
    address: ["Address will be shared when you book"],
    note: "Call or WhatsApp us to fix a visit",
    confirmed: false,
  },
];

export type Doctor = {
  id: string;
  name: string;
  role: string;
  line: string;
  photo: string;
};

export const doctors: Doctor[] = [
  {
    id: "vinaykumar",
    name: "Dr Vinaykumar Gopalkar",
    role: "Founder · Classical homoeopath",
    line: "36+ years of practice. Graduate of Dhondumama Sathe college, Pune.",
    photo: "/images/doctors/vinaykumar.jpg",
  },
  {
    id: "suniti",
    name: "Dr Suniti Gopalkar",
    role: "Managing Director · Homoeopath",
    line: "Homoeopathic graduate (1991). About 30 years of classical homoeopathy.",
    photo: "/images/doctors/suniti.jpg",
  },
  {
    id: "tillotama",
    name: "Dr Tillotama Gopalkar",
    role: "Homoeopathy · Cosmetology",
    line: "Graduate of Dhondumama Sathe college, Pune (2014). Sees patients in Kolhapur and Pune.",
    photo: "/images/doctors/tillotama.jpg",
  },
  {
    id: "sohan",
    name: "Sohan Gopalkar",
    role: "Managing Director",
    line: "Runs the clinic's operations and patient services.",
    photo: "/images/doctors/sohan.jpg",
  },
];

export type Treatment = {
  id: string;
  title: string;
  blurb: string;
  conditions: string[];
  img: string;
};

// Wording is deliberately "care for / support with" and never "cure".
// Cancer and HIV are left off the public cards on purpose (legal risk). Add only with the doctor's approved wording.
export const treatments: Treatment[] = [
  {
    id: "heart",
    title: "Heart care",
    blurb: "Homoeopathic care for people living with heart problems, alongside regular check-ups.",
    conditions: ["Chest pain", "Heart blockage", "Valve problems", "High and low BP"],
    img: "/images/treatments/heart.webp",
  },
  {
    id: "metabolic",
    title: "Diabetes & blood pressure",
    blurb: "Long-term support for sugar and pressure, planned around your daily routine.",
    conditions: ["Diabetes", "High BP", "Low BP"],
    img: "/images/treatments/metabolic.webp",
  },
  {
    id: "skin",
    title: "Skin care",
    blurb: "Care for stubborn skin problems, with cosmetology guidance from Dr Tillotama.",
    conditions: ["White spots (leucoderma)", "Psoriasis", "Cosmetology"],
    img: "/images/treatments/skin.webp",
  },
  {
    id: "joints",
    title: "Joints & spine",
    blurb: "Support for pain, stiffness and movement, without rushing you towards surgery.",
    conditions: ["Rheumatoid arthritis", "Gout", "Slip disc", "Spondylosis", "Ankylosing spondylitis"],
    img: "/images/treatments/joints.webp",
  },
  {
    id: "womens",
    title: "Women's health & fertility",
    blurb: "Care for hormonal and reproductive health for women, and fertility support for couples.",
    conditions: ["PCOD", "Irregular cycles", "Salpingitis", "Male fertility"],
    img: "/images/treatments/womens.webp",
  },
  {
    id: "digestive",
    title: "Digestive care",
    blurb: "Help for gut problems that keep coming back.",
    conditions: ["Hyper acidity", "Piles", "Ulcerative colitis", "Stomach troubles"],
    img: "/images/treatments/digestive.webp",
  },
  {
    id: "respiratory",
    title: "Ear, nose, throat & chest",
    blurb: "Care for breathing, hearing and throat problems of all ages.",
    conditions: ["Nasal polyps", "Hearing loss", "Pneumonia", "TB care"],
    img: "/images/treatments/respiratory.webp",
  },
  {
    id: "nerve",
    title: "Nerves & brain",
    blurb: "Gentle, long-term support for nerve-related problems.",
    conditions: ["Fits", "Epilepsy", "Convulsions"],
    img: "/images/treatments/nerve.webp",
  },
];

export type Story = {
  name: string;
  topic: string;
  quote: string;
  consent: "pending" | "received";
};

// Translated from the Marathi testimonials on the current website. Outcome claims
// ("cured", "100%", "no operation") are intentionally left out.
// TODO: get written consent from each patient and the doctor's approval before launch.
export const stories: Story[] = [
  {
    name: "Pandurang Patil",
    topic: "Blood pressure, sugar and heart",
    quote:
      "I had BP and sugar problems for 10 years. My heart had two blockages and I was told to have surgery quickly. After I started Dr Gopalkar's homoeopathic treatment, my troubles became much less. Today I can walk 2 km and work on my farm.",
    consent: "pending",
  },
  {
    name: "Jayveer Patil",
    topic: "Rheumatoid arthritis",
    quote:
      "My joint trouble began in 1989. For a long time I was confined to my bed. Then I began Dr Gopalkar's treatment. It is 28 years now and I have had no trouble. I am grateful.",
    consent: "pending",
  },
  {
    name: "Pradip Gaikwad",
    topic: "Ulcerative colitis",
    quote:
      "I passed blood and mucus 15 to 20 times a day, and my weight fell to 30 kg. Six months of other medicines did not help. After I started Dr Gopalkar's treatment, I felt better step by step. Today my weight is 60 kg.",
    consent: "pending",
  },
];
