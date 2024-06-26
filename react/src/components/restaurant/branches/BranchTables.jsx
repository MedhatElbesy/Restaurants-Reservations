import { useParams, NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

export function BranchTables({ branch }) {
  const { restaurantId } = useParams();

  return (
    <article className=" py-5 border-bottom">
      <div className="opening mx-0 d-flex justify-content-between">
        <div className="image col-6">
          <img
            src="https://elegencia-react-ejev.vercel.app/assets/img/about/about_open_hour.jpg"
            height="400px"
            width="100%"
          />
        </div>
        <div className="col-5">
          <h3 className="text-center fs-1 text-sec mb-3 p-3">
            Avialable Tables
          </h3>
          <p className="text-color">
            Reserve a table for your dining experience at our restaurant and
            enjoy a delightful meal in an elegant and cozy atmosphere
          </p>
          <p className="text-main fs-4">
            <span className="text-sec fs-2">{branch.number_of_tables}</span>{" "}
            Avilable Tables
          </p>
          <div>
            <NavLink to={`/restaurant/${restaurantId}/tables`}>
              <button className="reserver-button px-3 py-2 fs-6 mt-3">
                Reserve Table Now
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </article>
  );
}
