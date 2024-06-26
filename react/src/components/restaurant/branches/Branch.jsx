import { useSelector } from "react-redux";
import MapContainer from "./Map";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

export default function Branch({ branch }) {
  const { restaurant } = useSelector((state) => state.restaurant);

  return (
    <article className=" pb-5 border-bottom">
      <div className="address mx-0 d-flex">
        <div className="col-7">
          <MapContainer
            latitude={branch.latitude}
            longitude={branch.longitude}
            popup={restaurant.name}
          />
        </div>
        <div className="content mx-3 col-5">
          <h3 className="text-center fs-1 text-sec mb-3 p-3">Branch Address</h3>
          <p className="text-main fs-4 mb-0 mx-3">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            {`  ${branch.address}`},
          </p>
          <p className="text-main fs-4 mb-2 mx-5">
            {branch.city.name}, {branch.governorate.name}, {branch.country.name}
            .
          </p>
        </div>
      </div>
    </article>
  );
}
