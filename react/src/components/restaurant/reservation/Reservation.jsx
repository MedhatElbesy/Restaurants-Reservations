import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Default styles
import "./Reservation.css"; // Your custom styles


const Reservation = () => {
  const [date, setDate] = useState(new Date());
  console.log(date)

  return (
    <div>
      <Calendar onChange={setDate} value={date} />
    </div>
  );
};

export default Reservation;
