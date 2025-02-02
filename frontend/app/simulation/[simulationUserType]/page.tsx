import { permanentRedirect } from 'next/navigation'

// Components
import PatronSimulationComponent from "@/app/components/simulation/patron/PatronSimulationComponent";

const SimulationUserTypePage = async ({
  params,
}: {
  params: Promise<{ simulationUserType: string }>;
}) => {
  const userType = (await params).simulationUserType;

  if (userType !== "operator" && userType !== "patron" && userType !== "agency") {
    permanentRedirect("/simulation");
  }

  return (
    <div className="flex grow mx-16 my-4">
      {userType === "operator" && <PatronSimulationComponent />}
      {userType === "patron" && <PatronSimulationComponent />}
      {userType === "agency" && <p>User Type: {userType}</p>}
    </div>
  );
};

export default SimulationUserTypePage;
