export default function Items({ item }) {
  return (
    <div
      className={`${
        item.status === "unavailable" ? "unavailable" : "item"
      } d-flex flex-wrap justify-content-between col-9 col-md-5 mb-4 p-2`}
    >
      <div className="item-data w-75">
        <p className="name text-sec mb-2">{item.name}</p>
        <p className="description text-color m-0">{item.description}</p>
      </div>
      <p className="price text-sec">{item.price}</p>
    </div>
  );
}
