import { openingDays } from "../../../helpers/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhone,
  faClock,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";


export default function Footer({ restaurant }) {
  const data = restaurant.locations[0];

  const { fromTo } = openingDays(data.closed_days);

  return (
    <div className="footer row text-center">
      <div className="d-flex flex-wrap rest-info justify-content-center pt-4 mb-2">
        <div className="col-9 col-sm-6 col-md-3">
          <p>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> Address
          </p>
          <p>{data.address}</p>
        </div>
        <div className="col-9 col-sm-6 col-md-3">
          <p>
            <FontAwesomeIcon icon={faPhone} /> Hot Line
          </p>
          <p>{restaurant.hot_line}</p>
        </div>
        <div className="col-9 col-sm-6 col-md-3">
          <p>
            <FontAwesomeIcon icon={faClock} /> Opening Days
          </p>
          <p>{`${fromTo[0]} - ${fromTo[1]}`}</p>
        </div>
        <div className="col-9 col-sm-6 col-md-3">
          <p>
            <FontAwesomeIcon icon={faEnvelope} /> Keep in touch
          </p>
          <p>email@email.com</p>
        </div>
      </div>
      <p className="text-color mb-2">
        {restaurant.name} &copy; {new Date().getFullYear()} - All Rights
        Reserved
      </p>
    </div>
  );
}
