import { formatTime } from "../../helpers/utils";

const TableDetials = ({ table, details }) => {
  const tableAvailability = JSON.parse(
    sessionStorage.getItem("tableAvailability")
  );
  const { selectedData, reservationDate } = details;
  const time = tableAvailability.find(
    (available) => available.id == selectedData.availabilityId
  );
  console.log(tableAvailability);

  const date = new Date(reservationDate).toLocaleDateString("en-US", {
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
          {table.max_number_of_persons > 1 ? "s" : ""}
        </p>
        <p>
          <span>Extra Seats : </span>{" "}
          {selectedData.extraSeats > 0
            ? `${selectedData.extraSeats} Seat${
                selectedData.extraSeats > 1 ? "s" : ""
              }`
            : `No Extra Seats.`}
        </p>
        <p>
          <span>Kiddy Seats : </span>{" "}
          {selectedData.childSeats > 0
            ? `${selectedData.childSeats} Seat${
                selectedData.childSeats > 1 ? "s" : ""
              }`
            : `No Kiddy Seats.`}
        </p>
        <p>
          <span>Reservation Date : </span>
          {date}
        </p>
        <p>
          <span>Reservation Time : </span>
          {`${formatTime(time.start_time)} - ${formatTime(time.end_time)}`}
        </p>
      </div>
    </article>
  );
};

export default TableDetials;
