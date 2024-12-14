import type { Metadata } from "next";

// Components
import NavbarComponent from "@/components/navbar/NavbarComponent";
import FooterApp from "@/components/footer/FooterApp";

export const metadata: Metadata = {
  title: "Heracles",
  description: "Generated by create next app",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <NavbarComponent />
      <div className="h-[calc(100vh-5rem)] flex grow">
        {children}
      </div>
      <FooterApp />
    </div>
  );
}