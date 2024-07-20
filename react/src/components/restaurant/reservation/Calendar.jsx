import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";
import { useEffect } from "react";

const CustomCalendar = ({ reservationDate, setReservationDate, branch }) => {
  useEffect(() => {
    const savedDate = sessionStorage.getItem("reservationDate");
    if (savedDate) {
      setReservationDate(new Date(savedDate));
    }
  }, [setReservationDate]);

  useEffect(() => {
    if (reservationDate) {
      sessionStorage.setItem("reservationDate", reservationDate.toISOString());
    } else {
      sessionStorage.removeItem("reservationDate");
    }
  }, [reservationDate]);

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

  const handleDateClick = (date) => {
    if (reservationDate && reservationDate.getTime() === date.getTime()) {
      setReservationDate(null);
    } else {
      setReservationDate(date);
    }
  };

  return (
    <div>
      <Calendar
        onClickDay={handleDateClick}
        value={reservationDate}
        tileDisabled={tileDisabled}
      />
    </div>
  );
};

export default CustomCalendar;
