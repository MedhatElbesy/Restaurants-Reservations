import { useState } from "react";
import { useBranch } from "../branches/BranchContext";
import { useSelector } from "react-redux";
import MapContainer from "../../Map/Map";
import CustomCalendar from "./Calender";
import TimeAndAdditional from "./Time";
import ReservationForm from "./ReservationForm";
import "./Reservation.css";

const Reservation = () => {
  const { branch } = useBranch();
  const { restaurant } = useSelector((state) => state.restaurant);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [selectedTimeId, setSelectedTimeId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date()); // State for selected date

  const steps = [
    {
      component: <CustomCalendar onSelectDate={setSelectedDate} />,
      label: "Please Select a date",
    },
    {
      component: <TimeAndAdditional onSelectTime={setSelectedTimeId} />,
      label: "Select Time and Additional",
    },
    {
      component: (
        <ReservationForm formData={formData} setFormData={setFormData} />
      ),
      label: "Please fill with your details",
    },
  ];

  const handleNext = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", {
      ...formData,
      selectedTimeId,
      selectedDate,
    });
    // Handle form submission (e.g., send data to server)
  };

  return (
    <section
      className="reservation d-flex justify-content-between p-3"
      style={{ backgroundColor: "#edededf0" }}
    >
      <div className="col-5">
        <MapContainer
          latitude={branch.latitude}
          longitude={branch.longitude}
          popup={restaurant.name}
        />
      </div>
      <div className="col-7 px-4">
        <div>
          <h4 className="mb-0">Reserve a table</h4>
          <p>or Call us at {branch.mobile_number}</p>
        </div>
        <div className="p-3" style={{ backgroundColor: "#f4f4f4" }}>
          <div className="pb-3 border-bottom">
            <div className="counter mb-3">
              {`${currentStep + 1}/${steps.length} ${steps[currentStep].label}`}
            </div>
            {steps[currentStep].component}
          </div>
          <div className="navigations pt-3 ">
            {currentStep != 0 && (
              <button onClick={handlePrevious} disabled={currentStep === 0}>
                Prev
              </button>
            )}
            {currentStep < steps.length - 1 ? (
              <button onClick={handleNext}>Next</button>
            ) : (
              <button onClick={handleFormSubmit}>Submit</button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
