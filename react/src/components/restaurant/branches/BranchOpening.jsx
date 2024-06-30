import { openingDays } from "../../../utils";
import { useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useBranch } from "./BranchContext"; // Import the useBranch hook

export const BranchOpening = () => {
  const { restaurant } = useSelector((state) => state.restaurant);
  const { restaurantId } = useParams();
  const { branch } = useBranch();

  const { fromTo, open, close, isClosed } = openingDays(
    branch.closed_days,
    branch.opening_time,
    branch.closed_time
  );

  return (
    <article className="opening mx-0 d-flex justify-content-between py-5 border-bottom">
      <div className="col-5 d-flex flex-column justify-content-between">
        <h3 className="text-center fs-1 text-sec mb-3 p-3">Opening Hours</h3>
        <p className="text-color">{restaurant.description}</p>
        <div className="days">
          <p className="text-main mb-2 fs-3">
            {`${fromTo[0]} - ${fromTo[1]}`}:
          </p>
          <p className="text-main">
            <FontAwesomeIcon icon={faClock} />
            {` ${open} - ${close}`}
          </p>
          {isClosed ? (
            <p className="text-danger fw-bold">
              Closed Now,{" "}
              <span className="text-color fw-light">opens at {`${open}`}</span>
            </p>
          ) : (
            <p className="text-success fw-bold">Open Now</p>
          )}
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
        <Image
          src="https://elegencia-react-ejev.vercel.app/assets/img/about/about_bg.jpg"
          style={{ height: "350px", width: "100%" }}
          thumbnail
        />
      </div>
    </article>
  );
};
