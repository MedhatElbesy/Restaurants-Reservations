import { useParams, useNavigate } from "react-router-dom";
import { TableGallery } from "./TableGallery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChair, faUsers, faChild } from "@fortawesome/free-solid-svg-icons";

export function TableDetails({ table, onClose }) {
  const navigate = useNavigate();
  const { restaurantId } = useParams();
  const handelReserveTable = () => {
    sessionStorage.removeItem("reservationDate");
    sessionStorage.removeItem("formData");
    sessionStorage.removeItem("selectedData");
    sessionStorage.setItem("table", JSON.stringify(table));
    navigate(`/restaurant/${restaurantId}/reservation/${table.id}`);
  };
  return (
    <div className="table-details">
      <div className="close" onClick={() => onClose(false)}>
        X
      </div>
      <h3 className="pb-4 text-center mt-4 sec-font fs-1 text-sec">
        {table.description}
      </h3>
      <article className="d-flex flex-column flex-lg-row mt-5 align-items-center justify-content-lg-between">
        <div className="details mt-4 mb-5 col-lg-4">
          <p>
            <span>
              <FontAwesomeIcon icon={faUsers} />
              Seats :
            </span>{" "}
            up to {table.max_number_of_persons} guests.
          </p>
          <p title="(extra charge)">
            <span>
              <FontAwesomeIcon icon={faChair} />
              Extra Seats :
            </span>{" "}
            up to {table.extra_number_of_chairs} seat
            {table.extra_number_of_chairs > 1 && "s"}.{" "}
          </p>
          {table.extra_number_of_childs_chairs > 0 && (
            <p title="(extra charge)">
              <span>
                <FontAwesomeIcon icon={faChild} />
                Kiddy Seats :
              </span>{" "}
              {table.extra_number_of_childs_chairs} available.{" "}
            </p>
          )}
        </div>
        {table.images.length > 0 && <TableGallery gallery={table.images} />}
      </article>
      <div className="text-center mb-4">
        <button onClick={handelReserveTable} className="reserve-table">
          Reserve Now
        </button>
      </div>
    </div>
  );
}
