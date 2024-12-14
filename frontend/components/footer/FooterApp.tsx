interface FooterAppProps {
  t?: string;
}

const FooterApp: React.FC<FooterAppProps> = () => {
  return (
    <footer className="flex items-center bg-gray-200 h-8 px-4">
      <span className="text-primary-100 text-sm font-semibold">Heracles - 2024</span>
    </footer>
  );
};

export default FooterApp;