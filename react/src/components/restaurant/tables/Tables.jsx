
const Tables = ({ tables }) => {
  return (
    <section>
      {tables.length > 0 ? (
        tables.map((table) => <p>{table.price}</p>)
      ) : (
        <p>No tables</p>
      )}
    </section>
  );
};

export default Tables;
