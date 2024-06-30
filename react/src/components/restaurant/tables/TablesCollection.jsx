import { Table } from "./Table";
import "./Tables.css";

const TablesCollection = ({ tables }) => {
  return (
    <section>
      <h3 className="tables-caption">Check out our collection of tables</h3>
      <article className="branch-tables d-flex flex-wrap justify-content-around my-5">
        {tables.length > 0 ? (
          tables.map((table) => {
            return <Table key={table.id} table={table} />;
          })
        ) : (
          <p>No tables avilable</p>
        )}
      </article>
    </section>
  );
};

export default TablesCollection;
