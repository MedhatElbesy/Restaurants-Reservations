import { openingDays } from "../../../utils";
import { useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

export function BranchOpening({ branch }) {
  const { restaurant } = useSelector((state) => state.restaurant);
  const { restaurantId } = useParams();
  const { fromTo, open, close } = openingDays(branch.closed_days, branch.opening_time, branch.closed_time);

  return (
    <article className=" py-5 border-bottom">
      <div className="opening mx-0 d-flex justify-content-between">
        <div className="col-5 d-flex flex-column justify-content-between">
          <h3 className="text-center fs-1 text-sec mb-3 p-3">
            Branch Opening Hours
          </h3>
          <p className="text-color">{restaurant.description}</p>
          <div className="days">
            <p className="text-main mb-0 fs-3">
              {`${fromTo[0]} - ${fromTo[1]}`}:
            </p>
            <p className="text-main">
              <FontAwesomeIcon icon={faClock} />
              {` ${open} - ${close}`}
            </p>
          </div>
          <div>
            <NavLink to={`/restaurant/${restaurantId}/menu`}>
              <button className="reserver-button px-3 py-2 fs-6 mt-3">
                Check Menu
              </button>
            </NavLink>
          </div>
        </div>
        <div className="image col-6">
          <img
            src="https://elegencia-react-ejev.vercel.app/assets/img/about/about_bg.jpg"
            height="350px"
            width="100%"
          />
        </div>
      </div>
    </article>
  );
}
