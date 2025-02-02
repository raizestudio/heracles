import type { Metadata } from "next";
import localFont from "next/font/local";

// Components
import NavbarComponent from "@/app/components/navbar/NavbarComponent";
import FooterApp from "@/app/components/footer/FooterApp";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
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
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col h-screen min-h-[550px] min-w-[450px]">
          <NavbarComponent />
          {children}
          <FooterApp />
        </div>
      </body>
    </html>
  );
}
