import { useDispatch, useSelector } from "react-redux";
import { useBranch } from "./BranchContext";
import Image from "react-bootstrap/Image";
import { useEffect, useMemo } from "react";
import { fetchRestaurantTablesAsync } from "../../../slices/restaurant/table/restaurantTablesSlice";
import Loader from "../../../layouts/loader/loader";

export function BranchTables({ onShowTables }) {
  const { branch } = useBranch();
  const dispatch = useDispatch();
  const { tables, status } = useSelector((state) => state.restaurantTables);
  
  useEffect(() => {
    dispatch(fetchRestaurantTablesAsync(branch.id)).unwrap();
  },[dispatch, branch.id]);

  const availableTables = useMemo(() => {
    return tables.filter((table) => table.status === "available");
  }, [tables]);

  if(status === "loading") {
    return <Loader />
  }

  return (
    <article className="mx-0 d-flex flex-wrap justify-content-center text-center text-lg-start justify-content-lg-between pb-5 border-bottom">
      <div className="d-none d-lg-block col-6">
        <Image
          src="https://elegencia-react-ejev.vercel.app/assets/img/about/about_open_hour.jpg"
          style={{ height: "350px", width: "100%" }}
          thumbnail
        />
      </div>
      <div className="col-md-7 col-lg-5 d-flex flex-column justify-content-between">
        <h3 className="text-center text-sec mb-3 p-3">Avialable Tables</h3>
        <p className="text-color">
          Reserve a table for your dining experience at our restaurant and enjoy
          a delightful meal in an elegant and cozy atmosphere
        </p>
        <p className="text-main fs-4">
          <span className="text-sec fs-2">{availableTables.length}</span>{" "}
          Avilable Tables
        </p>
        <div>
          <button
            onClick={() => onShowTables(tables)}
            className={`reserver-button btn-menu px-3 py-2 fs-6 mt-3 ${
              availableTables.length == 0 ? "disabled" : ""
            }`}
            disabled={availableTables.length == 0}
          >
            Reserve Table Now
          </button>
        </div>
      </div>
    </article>
  );
}
