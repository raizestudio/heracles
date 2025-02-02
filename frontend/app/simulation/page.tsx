import Link from "next/link";

// Components
import { buttonVariants } from "@/components/ui/button";

// Icons
import WrenchIcon from "@/app/components/icons/WrenchIcon";

const SimulationPage = () => {
  return (
    <div className="flex grow">
      {process.env.DEMO?.toLocaleLowerCase() === "true" ? (
        <div className="flex flex-col justify-center items-center grow mx-16 my-4 rounded">
          <WrenchIcon width={64} height={64} fill="#000" className="mb-4" />
          <h1 className="text-2xl font-bold">En construction</h1>
          <p className="text-lg text-center">
            Cette page est en cours de développement, merci de revenir plus
            tard.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center grow mx-16 my-4">
          <div className="flex gap-4">
            <Link
              href="/simulation/patron"
              className={buttonVariants({ variant: "outline" })}
            >
              Je suis un usager
            </Link>
            <Link
              href="/simulation/operator"
              className={buttonVariants({ variant: "outline" })}
            >
              Je suis un expert
            </Link>
            <Link
              href="/simulation/agency"
              className={buttonVariants({ variant: "outline" })}
            >
              {"J'ai une agence"}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimulationPage;
