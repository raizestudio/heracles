interface FooterLandingProps {
  t?: string;
}

const FooterLanding: React.FC<FooterLandingProps> = () => {
  return (
    <footer className="flex bg-gray-50 p-4 shadow">
      <div className="flex flex-col">
        <span className="text-primary-100 text-sm font-semibold">
          Heracles - {new Date().getFullYear()}
        </span>
        <span className="text-xs">Lorem ipsum dolor sit amet.</span>
      </div>
      <div className="grow"></div>
      <div className="flex flex-col">
        <div className="flex gap-2">
          <span className="text-sm">Documentation</span>
          <span className="text-sm">Question fréquentes</span>
          <span className="text-sm">Qui sommes nous</span>
        </div>
        <div className="flex justify-end">
          <span className="text-xs">08f6f739-f9d0-4bc3-ba82-270bca8dfc8b</span>
        </div>
      </div>
    </footer>
  );
};

export default FooterLanding;
