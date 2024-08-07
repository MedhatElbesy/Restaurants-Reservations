import { useState } from "react";
import { Image } from "react-bootstrap";
import { TableDetails } from "./TableDetails";

export function Table({ table }) {
  const [showTable, setShowTable] = useState(false);

  function handelCloseTable(show) {
    setShowTable(() => show);
  }

  return (
    <div className="branch-table col-10 col-sm-7 col-md-5 col-lg-4 px-lg-3 px-xl-4 py-4">
      <figure className="table-cover">
        <span className="table-id text-danger">#{table.id}</span>
        <Image src={table.cover} fluid />
        <figcaption>
          {table.description} <span onClick={() => setShowTable(true)} className="d-block">show table</span>
        </figcaption>
      </figure>
      {showTable && <TableDetails table={table} onClose={handelCloseTable} />}
    </div>
  );
}
