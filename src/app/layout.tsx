import { Nunito } from "next/font/google";
import "./globals.css";
import React from "react";

const font = Nunito({
  subsets: ["cyrillic"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning={true}>
      <head>
        <link data-rh="true" rel="icon" href="/logo.png" />
      </head>
      <body className={font.className}>
        {children}
      </body>
    </html>
  );
}
