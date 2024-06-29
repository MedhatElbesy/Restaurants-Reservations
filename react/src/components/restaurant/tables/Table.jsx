import { useState } from "react";
import { Image } from "react-bootstrap";
import { TableDetails } from "./TableDetails";

export function Table({ table }) {
  const [showTable, setShowTable] = useState(false);

  return (
    <article className="d-flex flex-wrap justify-content-center my-5">
        <figure className="table-cover col-12" onClick={() => setShowTable(true)}>
          <Image
            src={table.cover}
            rounded
            fluid
            style={{ maxHeight: "100%", objectFit: "cover", width: "100%" }}
          />
        </figure>
        {showTable && (
          <div className="table-details">
            <div className="text-danger close" onClick={() => setShowTable(false)}>X</div>
            <TableDetails table={table} />
          </div>
        )}
    </article>
  );
}
