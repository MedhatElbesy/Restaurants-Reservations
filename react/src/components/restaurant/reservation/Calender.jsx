import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calender.css";

const CustomCalendar = ({ reservationDate, setreservationDate }) => {
  const handleDateChange = (newDate) => {
    setreservationDate(newDate);
  };

  return (
    <div>
      <Calendar onChange={handleDateChange} value={reservationDate} />
    </div>
  );
};

export default CustomCalendar;
