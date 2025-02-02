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
          <WrenchIcon
            width={96}
            height={96}
            className="mb-4 dark:fill-gray-50"
          />
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-4xl font-black">En construction</h1>
            <p className="text-lg text-center">
              Cette fonctionnalité sera bientôt disponible en démo.
            </p>
          </div>
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
