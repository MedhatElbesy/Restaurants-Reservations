import { useSelector } from "react-redux";
import { useBranch } from "./BranchContext";
import MapContainer from "../../Map/Map";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhone,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

export function BranchAddress() {
  const { restaurant } = useSelector((state) => state.restaurant);
  const { branch } = useBranch();
  return (
    <article className="address mx-0 d-flex justify-content-center justify-content-lg-between flex-wrap py-5 border-bottom">
      <div className="col-12 col-lg-6 order-1 order-lg-0 mt-5 mt-lg-0">
        <MapContainer
          latitude={branch.latitude}
          longitude={branch.longitude}
          popup={restaurant.name}
        />
      </div>
      <div className="content mx-3 col-lg-5">
        <h3 className="text-center fs-1 text-sec mb-3 p-3">Branch Address</h3>
        <div className="text-main">
          <div className="location ">
            <p className="fs-4 mb-0">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              {branch.address}
            </p>
            <pre className="fs-4">
              {"   "}
              {branch.city.name}, {branch.governorate.name},{" "}
              {branch.country.name}.
            </pre>
          </div>
          <div className="phone text-center">
            <h4 className="text-color mb-3">You can call us on:</h4>
            <a href={`tel:${branch.mobile_number}`}>
              <FontAwesomeIcon icon={faPhone} /> {branch.mobile_number}
            </a>
            <a href={`tel:${branch.phone_number}`}>
              <FontAwesomeIcon icon={faHome} /> {branch.phone_number}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
