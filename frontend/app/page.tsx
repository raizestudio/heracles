import Link from "next/link";

import NavbarComponent from "@/app/components/navbar/NavbarComponent";
import FooterLanding from "@/app/components/footer/FooterLanding";

export default function Home() {
  return (
    <>
      <NavbarComponent />
      <div className="w-screen h-[calc(100vh-3rem)] flex flex-col justify-center items-center grow bg-gray-100">
        <div className="flex flex-col justify-center items-center gap-10">
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="text-primary-100 font-black text-5xl">Heracles</h1>
            <span className="text-gray-700 font-semibold">
              Trouvez un expert pour votre diagnostic en quelques secondes.
            </span>
          </div>
          <Link className="bg-gray-50 rounded p-3 shadow-sm hover:shadow" href="/simulation">
            <span className="text-sm text-gray-800">Faire une simulation</span>
          </Link>
        </div>
      </div>
      {/* <div className="w-screen h-screen flex flex-col justify-center items-center">
        <h1>Home</h1>
        <p>
          Heracles is a web application that allows you to manage your tasks.
        </p>
      </div> */}
      <FooterLanding />
    </>
  );
}
