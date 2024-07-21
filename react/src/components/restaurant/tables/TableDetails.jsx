import { useParams, useNavigate } from "react-router-dom";
import { TableGallery } from "./TableGallery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChair, faUsers, faChild } from "@fortawesome/free-solid-svg-icons";
import { formatPrice } from "../../../helpers/utils";

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
  console.log(table);
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
          <div className="discount">
            With {formatPrice(table.price - table.sale_price, "EG")} Dsicount
          </div>
          <p>
            <span>
              <FontAwesomeIcon icon={faUsers} />
              Seats :
            </span>{" "}
            up to {table.max_number_of_persons} guests -{" "}
            <span className="item-price">{formatPrice(table.price, "EG")}</span>
          </p>
          <p title="(extra charge)">
            <span>
              <FontAwesomeIcon icon={faChair} />
              Extra Seats :
            </span>{" "}
            up to {table.extra_number_of_chairs} seat
            {table.extra_number_of_chairs > 1 ? "s" : ""} -{" "}
            <span className="item-price">
              {formatPrice(table.extra_chair_price, "EG")}/each
            </span>
          </p>
          {table.extra_number_of_childs_chairs > 0 && (
            <p title="(extra charge)">
              <span>
                <FontAwesomeIcon icon={faChild} />
                Kiddy Seat{table.extra_number_of_childs_chairs > 1 ? "s" : ""} -
                :
              </span>{" "}
              {table.extra_number_of_childs_chairs} available -{" "}
              <span className="item-price">
                {formatPrice(table.extra_child_chair_price, "EG")}/each
              </span>
            </p>
          )}
          <div className="text-center mb-4">
            <button onClick={handelReserveTable} className="reserve-table">
              Reserve Now
            </button>
          </div>
        </div>
        {table.images.length > 0 && <TableGallery gallery={table.images} />}
      </article>
    </div>
  );
}
