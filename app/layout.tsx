import type { Metadata } from "next";
import { Geist, Geist_Mono, Pinyon_Script, Prata } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const pinyonScript = Pinyon_Script({
  variable: "--font-pinyonScript",
  weight: ["400"],
  subsets: ["latin"],
});

const prata = Prata({
  variable: "--font-prata",
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thiệp mời cưới Ngọc Anh và Mai Phương",
  description: "Thiệp mời cưới Ngọc Anh và Mai Phương",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${pinyonScript.variable} ${prata.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
