import { TableGallery } from "./TableGallery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChair, faUsers, faChild } from "@fortawesome/free-solid-svg-icons";

export function TableDetails({ table }) {
  return (
    <>
      <h3 className="caption border-bottom pb-4 text-center my-5 sec-font fs-1 text-sec">
        {table.description}
      </h3>
      <div className="details">
        <p className="text-main">
          <FontAwesomeIcon icon={faUsers} />
          fits up to {table.max_number_of_persons} guests
        </p>
        <p>
          <FontAwesomeIcon icon={faChair} />
          {table.extra_number_of_chairs} extra chair
          {table.extra_number_of_chairs > 1 && "s"} can be added
        </p>
        {table.extra_number_of_childs_chairs > 0 && (
          <p>
            <FontAwesomeIcon icon={faChild} />
            {table.extra_number_of_childs_chairs} extra child chair
            {table.extra_number_of_childs_chairs > 1 && "s"} can be added
          </p>
        )}
        <p>Price: {table.price}</p>
        <p>Sale Price: ${table.sale_price}</p>
      </div>
      <div className="gallery d-flex justify-content-center position-absolute">
        {table.images.length > 0 && <TableGallery gallery={table.images} />}
      </div>
    </>
  );
}
