import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata: Metadata = {
  title: "GymLand — Tu universo Fitness",
  description: "Gimnasio unisex premium. Scrollytelling experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${oswald.variable} bg-[#050505] selection:bg-[#E3FF00] selection:text-black font-sans overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
