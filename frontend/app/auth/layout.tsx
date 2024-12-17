import type { Metadata } from "next";

// Components
import NavbarComponent from "@/app/components/navbar/NavbarComponent";
import FooterApp from "@/app/components/footer/FooterApp";

export const metadata: Metadata = {
  title: "Heracles | Authentification",
  description: "Connectez-vous à votre compte Heracles",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-[550px] min-w-[450px]">
      <NavbarComponent />
      {children}
      <FooterApp />
    </div>
  );
}
