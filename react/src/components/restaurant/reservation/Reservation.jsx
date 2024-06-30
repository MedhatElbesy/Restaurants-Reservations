import CustomCalendar from "./Calender";
import MapContainer from "../../Map/Map";
import { useBranch } from "../branches/BranchContext";
import { useSelector } from "react-redux";

const Reservation = () => {
  const { branch } = useBranch();
  const { restaurant } = useSelector((state) => state.restaurant);
  return (
    <section className="reservation d-flex justify-content-between">
      <div className="col-5">
        <MapContainer
          latitude={branch.latitude}
          longitude={branch.longitude}
          popup={restaurant.name}
        />
      </div>
      <div className="col-7 p-5 pt-0">
        <div>
          <h4>Reserve a table</h4>
          <p className="mb-0">or Call us at {branch.mobile_number}</p>
        </div>
        <div className="p-3">
          <div>
            <div className="counter mb-3">1/3 Please Select a date</div>
            <CustomCalendar />
          </div>
          <div>
            <button>Next</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
