import NavbarComponent from "@/components/navbar/NavbarComponent";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <NavbarComponent />
      <div className="flex flex-col justify-center items-center grow">
        <h1 className="font-black text-2xl">Heracles</h1>
        <span className="text-sm">L&apos;autre mais en mieux</span>
      </div>
    </div>
  );
}
