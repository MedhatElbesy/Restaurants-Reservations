import { useSelector } from "react-redux";
import MapContainer from "./Map";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhone,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

export function BranchAddress({ branch }) {
  const { restaurant } = useSelector((state) => state.restaurant);

  return (
    <article className="address mx-0 d-flex py-5 border-bottom">
      <div className="col-7">
        <MapContainer
          latitude={branch.latitude}
          longitude={branch.longitude}
          popup={restaurant.name}
        />
      </div>
      <div className="content mx-3 col-5">
        <h3 className="text-center fs-1 text-sec mb-3 p-3">Branch Address</h3>
        <div className="text-main">
          <div className="location">
            <p className="fs-4 mb-0">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              {branch.address}
            </p>
            <pre className="fs-4">
              {"        "}
              {branch.city.name}, {branch.governorate.name},{" "}
              {branch.country.name}.
            </pre>
          </div>
          <div className="phone text-center">
            <h4 className="text-color mb-3">You can call us on:</h4>
            <a href={`tel:${branch.mobile_number}`}>
              <FontAwesomeIcon icon={faPhone} /> {branch.mobile_number}
            </a>
            <a href={`tel:${branch.mobile_number}`}>
              <FontAwesomeIcon icon={faHome} /> {branch.phone_number}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
