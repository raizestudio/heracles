import NavbarComponent from "@/components/navbar/NavbarComponent";
import FooterComponent from "@/components/footer/FooterComponent";

export default function Home() {
  return (
    <>
      <NavbarComponent />
      <div className="w-screen h-[calc(100vh-3rem)] flex flex-col justify-center items-center grow bg-gray-100">
        <h1 className="font-black text-2xl">Heracles</h1>
        <span className="text-sm">L&apos;autre mais en mieux</span>
      </div>
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <h1>Home</h1>
        <p>
          Heracles is a web application that allows you to manage your tasks.
        </p>
      </div>
      <FooterComponent />
    </>
  );
}
