import type { Metadata } from "next";

// Components
import NavbarComponent from "@/app/components/navbar/NavbarComponent";
import FooterApp from "@/app/components/footer/FooterApp";

export const metadata: Metadata = {
  title: "Heracles | Simulation",
  description:
    "Faite une simulation de vos besoins et obtenez une estimation de vos coûts en quelques clics",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <div className="flex flex-col h-screen min-h-[550px] min-w-[450px]">
          <NavbarComponent />
          {children}
          <FooterApp />
        </div>
  );
}
