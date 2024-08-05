import type { Metadata } from "next";
import Header from "@/shared/components/shared/header";

export const metadata: Metadata = {
  title: "Next Pizza | Дэшборд",
  description: "Next Pizza | Дэшборд",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
    </>
  );
}
