import { useSelector } from "react-redux";
import BranchTables from "./BranchTables";
import Loader from "../../../layouts/loader/loader";
import "./BranchTables.css";

function Tables() {
  const { restaurant } = useSelector((state) => state.restaurant);
  const branches = restaurant.locations;
  console.log(branches);

  if (!branches) {
    return <Loader />;
  }

    const branchesWithTables = branches.filter(
      (branch) => branch.tables.length > 0
    );


  return (
    <div className="w-100 m-auto full">
      {branchesWithTables.length > 0 ? (
        branchesWithTables.map((branch) => (
          <div key={branch.id} className="branch-container my-5 text-center">
            <h2 className="text-sec mb-5 fs-1">{branch.city.name} Branch</h2>
            <BranchTables branch={branch} restaurantId={restaurant.id} />
          </div>
        ))
      ) : (
        <p className="text-center fw-bold fs-4 text-color">{`${restaurant.name} Has No Tables Available`}</p>
      )}
    </div>
  );
}

export default Tables;
