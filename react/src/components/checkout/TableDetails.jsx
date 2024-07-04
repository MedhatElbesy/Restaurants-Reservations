import { useSelector } from "react-redux";
const TableDetials = ({ table, details }) => {
  const { tableAvailability } = useSelector((state) => state.tableAvailability);
  const { selectedData, reservationDate } = details;
  const time = tableAvailability.find(
    (available) => available.id == selectedData.availabilityId
  );

  const date = reservationDate.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <article className="table-checkout-details my-5 w-75 m-auto">
      <div className="details">
        <p>
          <span>Table No. : </span> {table.id}
        </p>
        <p>
          <span>Seats : </span> {table.max_number_of_persons} Seat
          {table.max_number_of_persons > 1 && "s"}.
        </p>
        <p>
          <span>Extra Seats : </span> {selectedData.extraSeats} Seat
          {selectedData.extraSeats > 1 && "s"}.
        </p>
        <p>
          <span>Kiddy Seats : </span>
          {selectedData.childSeats} Kiddy Seat
          {selectedData.childSeats > 1 && "s"}.
        </p>
        <p>
          <span>Reservation Date : </span>
          {date}
        </p>
        <p>
          <span>Reservation Time : </span>
          {time.start_time} - {time.end_time}
        </p>
      </div>
    </article>
  );
};

export default TableDetials;
