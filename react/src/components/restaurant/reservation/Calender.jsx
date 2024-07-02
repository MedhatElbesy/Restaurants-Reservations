import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calender.css";

const CustomCalendar = ({ selectedDate, setSelectedDate }) => {
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  return (
    <div>
      <Calendar onChange={handleDateChange} value={selectedDate} />
    </div>
  );
};

export default CustomCalendar;
