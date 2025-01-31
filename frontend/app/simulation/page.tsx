
// Components
import BreadcrumbComponent from "@/app/components/breadcrumb/BreadcrumbComponent";

const SimulationPage = () => {
  return (
    <div className="flex grow">
      {process.env.DEMO === "true" ? (
        <div className="flex flex-col justify-center items-center grow mx-16 my-4 bg-gray-50 rounded shadow">
          <h1 className="text-xl font-bold">En construction</h1>
        </div>
      ) : (
        <div className="flex flex-col grow mx-16 my-4 bg-gray-50 rounded shadow">
          <div className="flex flex-col">
            <BreadcrumbComponent />
          </div>
        </div>
      )}
    </div>
  );
};

export default SimulationPage;
