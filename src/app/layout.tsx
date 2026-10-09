import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/manrope";
import "./globals.css";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Dr Gopalkar's Homoeopathy | Homoeopathic doctors in Kolhapur, Pune, Nipani & Mumbai",
    template: "%s | Dr Gopalkar's Homoeopathy",
  },
  description:
    "Classical homoeopathic care for over 36 years. Meet Dr Vinaykumar Gopalkar and team, and book a visit at our clinics in Kolhapur, Pune, Nipani and Mumbai.",
  keywords: [
    "homoeopathy doctor Kolhapur",
    "homoeopathic clinic Pune",
    "homoeopathy Nipani",
    "homoeopathy Mumbai",
    "Dr Gopalkar",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Dr Gopalkar's Homoeopathy",
    description: "Healing that begins in nature. Classical homoeopathy for over 36 years, in four cities.",
    images: [{ url: "/media/hero/ink-last.webp", width: 1920, height: 1080 }],
    locale: "en_IN",
  },
  alternates: { canonical: "/" },
  icons: { icon: "/images/brand/logo.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f1e7",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body>
        <noscript>
          <style>{`.reveal{visibility:visible!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
