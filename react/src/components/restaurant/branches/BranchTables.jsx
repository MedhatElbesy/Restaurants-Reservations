import { useDispatch, useSelector } from "react-redux";
import { useBranch } from "./BranchContext";
import { useEffect, useMemo, useRef } from "react";
import { fetchRestaurantTablesAsync } from "../../../slices/restaurant/table/restaurantTablesSlice";
import Loader from "../../../layouts/loader/loader";
import BeehiveGallery from "./TableBeehive";

export function BranchTables({ onShowTables }) {
  const { branch } = useBranch();
  const dispatch = useDispatch();
  const { tables, status: tableStatus } = useSelector((state) => state.restaurantTables);

  const prevBranchId = useRef(null);
  useEffect(() => {
    if (branch.id && branch.id !== prevBranchId.current) {
      dispatch(fetchRestaurantTablesAsync(branch.id)).unwrap();
      prevBranchId.current = branch.id;
    }
  }, [dispatch, branch.id]);

  const availableTables = useMemo(() => {
    return tables.filter((table) => table.status === "available");
  }, [tables]);

  let allImages = tables.reduce((allImages, table) => {
    return [...allImages, ...table.images.map((image) => image.image)];
  }, []);
  allImages = allImages.slice(0, 9);

  if (tableStatus === "loading") {
    return <Loader />;
  }

  return (
    <article className="mx-0 d-flex flex-wrap justify-content-center text-center text-lg-start justify-content-lg-between pb-5 border-bottom">
      <div
        className={`col-md-7 ${
          allImages.length > 0 ? "col-lg-6 mb-5" : "col-lg-12"
        }  mb-lg-0 d-flex flex-column align-items-center justify-content-center`}
      >
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
      </div>{" "}
      {allImages.length > 0 && (
        <div className="beehive-gallery col-12 col-lg-6">
          <BeehiveGallery className="" images={allImages} />
        </div>
      )}
    </article>
  );
}
