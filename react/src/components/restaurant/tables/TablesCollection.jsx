import { Table } from "./Table";
import "./Tables.css"

const TablesCollection = ({ tables }) => {
  return (
    <section>
      <h3 className="tables-caption">Check out our collection of tables</h3>
      {tables.length > 0 ? (
        tables.map((table) => <Table key={table.id} table={table}/>)
      ) : (
        <p>No tables avilable</p>
      )}
    </section>
  );
};

export default TablesCollection;
