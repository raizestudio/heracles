import FooterLanding from "./FooterLanding";

interface FooterComponentProps {
  t?: string;
}

const FooterComponent: React.FC<FooterComponentProps> = () => {
  return (
    <footer className="">
      <FooterLanding />
    </footer>
  );
};

export default FooterComponent;