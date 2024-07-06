import { useSelector } from "react-redux";
import BranchTables from "./BranchTables";
import Loader from "../../../layouts/loader/loader";
import "./BranchTables.css"

function Tables() {
  const { restaurant } = useSelector((state) => state.restaurant);
  const branches = restaurant.locations;
  console.log(branches)
  if(!branches) {
    return <Loader />
  }
  return (
    <div className="w-100 m-auto">
      {branches.length > 0 && (
        branches.map((branch) => {
          const hasImages = branch.tables.some(
            (table) => table.images.length > 0
          );
          return (
            hasImages && (
              <div key={branch.id} className="branch-container my-5 text-center">
                <h2 className="text-sec mb-5 fs-1">{branch.city.name} Branch</h2>
                <BranchTables branch={branch} restaurantId={restaurant.id} />
              </div>
            )
          );
        })
      )}
    </div>
  );
}

export default Tables;
