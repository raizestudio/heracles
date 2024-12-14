import type { Metadata } from "next";

// Components
import NavbarComponent from "@/components/navbar/NavbarComponent";
import FooterApp from "@/components/footer/FooterApp";

export const metadata: Metadata = {
  title: "Heracles",
  description: "Generated by create next app",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <NavbarComponent />
      {children}
      <FooterApp />
    </div>
  );
}
