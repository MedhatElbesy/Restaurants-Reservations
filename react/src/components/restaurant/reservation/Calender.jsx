import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calender.css";

const CustomCalendar = ({ reservationDate, setreservationDate, branch }) => {
  const tileDisabled = ({ date, view }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (view === "month" && date < today) {
      return true;
    }

    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
    if (branch.closed_days.includes(dayOfWeek)) {
      return true;
    }

    return false;
  };

  const handleDateChange = (newDate) => {
    setreservationDate(newDate);
  };

  return (
    <div>
      <Calendar
        onChange={handleDateChange}
        value={reservationDate}
        tileDisabled={tileDisabled}
      />
    </div>
  );
};

export default CustomCalendar;
