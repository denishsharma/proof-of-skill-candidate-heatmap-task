import "@/assets/styles/global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Candidate Heatmap - Proof Of Skill",
  description: "Create a page that displays a heatmap of the candidates' skills",
};

type RootLayoutProps = Readonly<{
  children: ReactNode
}>

export default function RootLayout(props: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${interSans.variable} antialiased`}
      >
        {props.children}
      </body>
    </html>
  );
}
