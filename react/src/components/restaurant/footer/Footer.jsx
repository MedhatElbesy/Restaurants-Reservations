import { openingDays } from "../../../helpers/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhone,
  faClock,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import "./Footer.css"


export default function Footer({ restaurant }) {
  // console.log(restaurant)
  const data = restaurant.locations[0];

  const { fromTo } = openingDays(data.closed_days);

  return (
    <div className="footer row text-center">
      <div className="rest-info d-flex flex-wrap justify-content-center pt-4 mb-2">
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
          <p>
            <a href={`mailto: restaurant@gamil.com`} type="email">
              restaurant@gamil.com
            </a>
          </p>
        </div>
      </div>
      <p className="text-light mb-2">
        {restaurant.name} &copy; {new Date().getFullYear()} - All Rights
        Reserved
      </p>
    </div>
  );
}
