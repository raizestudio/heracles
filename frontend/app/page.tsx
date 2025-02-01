import Link from "next/link";

// Components
import NavbarComponent from "@/app/components/navbar/NavbarComponent";
import FooterLanding from "@/app/components/footer/FooterLanding";
// import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"

export default function Home() {
  return (
    <>
      <NavbarComponent />
      
      <div className="w-screen h-[calc(100vh-3rem)] flex flex-col justify-center items-center grow ">
        <div className="flex flex-col justify-center items-center gap-10">
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="text-primary-100 font-black text-5xl">Heracles</h1>
            <span className="text-gray-700 dark:text-gray-200 font-semibold">
              Trouvez un expert pour votre diagnostic en quelques secondes.
            </span>
          </div>
          <Link href="/simulation" className={buttonVariants({ variant: "outline", size: "lg" })}>Faire une simulation</Link>
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
