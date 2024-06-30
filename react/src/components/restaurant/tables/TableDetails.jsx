import { useParams, NavLink } from "react-router-dom";
import { TableGallery } from "./TableGallery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChair, faUsers, faChild } from "@fortawesome/free-solid-svg-icons";

export function TableDetails({ table, onClose }) {
  const { restaurantId } = useParams();
  console.log(table.id)
  return (
    <div className="table-details">
      <div className="close" onClick={() => onClose(false)}>
        X
      </div>
      <h3 className="pb-4 text-center mt-3 sec-font fs-1 text-sec">
        {table.description}
      </h3>
      <article className="d-flex my-5 justify-content-between">
        <div className="details mt-4 col-4">
          <p>
            <span>
              <FontAwesomeIcon icon={faUsers} />
              Seats :
            </span>{" "}
            up to {table.max_number_of_persons} guests.
          </p>
          <p>
            <span>
              <FontAwesomeIcon icon={faChair} />
              Extra Seats :
            </span>{" "}
            up to {table.extra_number_of_chairs} seat
            {table.extra_number_of_chairs > 1 && "s"}.
          </p>
          {table.extra_number_of_childs_chairs > 0 && (
            <p>
              <span>
                <FontAwesomeIcon icon={faChild} />
                Kiddy Seats :
              </span>{" "}
              {table.extra_number_of_childs_chairs} available.
            </p>
          )}
          <div className="text-center my-4">
            <NavLink to={`/restaurant/${restaurantId}/reservation/${table.id}`}>
              <button className="reserve-table">
                Reserve Now
              </button>
            </NavLink>
          </div>
        </div>
        {table.images.length > 0 && <TableGallery gallery={table.images} />}
      </article>
    </div>
  );
}
