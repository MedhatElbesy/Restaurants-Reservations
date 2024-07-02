import { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { useDispatch, useSelector } from "react-redux";
import { useBranch } from "../branches/BranchContext";
import Swal from "sweetalert2";
import MapContainer from "../../Map/Map";
import CustomCalendar from "./Calender";
import TimeAndAdditional from "./Time";
import ReservationForm from "./ReservationForm";
import { useForm } from "react-hook-form";
import { getTableAvailability } from "../../../slices/restaurant/table/availabilitySlice";
import "./Reservation.css";

const Reservation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tableId } = useParams();
  const { branch } = useBranch();
  const table = branch.tables.find((table) => table.id == tableId);
  const { restaurant } = useSelector((state) => state.restaurant);

  useEffect(() => {
    dispatch(getTableAvailability(tableId));
  }, [dispatch, tableId]);

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [selectedData, setSelectedData] = useState({
    availabilityId: null,
    extraSeats: null,
    childSeats: null,
  });
  const [selectedDate, setSelectedDate] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const stepsComp = [
    {
      component: (
        <CustomCalendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      ),
      label: "Select a date",
    },
    {
      component: (
        <TimeAndAdditional
          table={table}
          selectedData={selectedData}
          setSelectedData={setSelectedData}
        />
      ),
      label: "Select Time and Additional",
    },
    {
      component: (
        <ReservationForm
          formData={formData}
          setFormData={setFormData}
          register={register}
          errors={errors}
        />
      ),
      label: "Fill in your details",
    },
  ];

  const handleNext = () => {
    if (step === 0 && !selectedDate) {
      showError("You must select a date.");
      return;
    }
    if (step === 1 && !selectedData.availabilityId) {
      showError("You must select a time.");
      return;
    }
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const onSubmit = (data) => {
    setFormData(data);
    const reservationData = {
      formData: data,
      selectedData: selectedData,
      selectedDate: selectedDate,
      branchId: branch.id,
      tableId: table.id,
    };
    navigate(`/reservation/checkout`, {
      state: { reservationData },
    });
  };

  const showError = (message) => {
    Swal.fire({
      text: message,
    });
  };

  return (
    <section
      className="reservation d-flex justify-content-between p-4"
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
          <div className="head pb-4">
            <div className="counter mb-3">
              <span>{`${step + 1}/${stepsComp.length}`}</span>{" "}
              {stepsComp[step].label}
            </div>
            {stepsComp[step].component}
          </div>
          <div className="navigations pt-4">
            {step !== 0 && (
              <button onClick={handlePrevious} disabled={step === 0}>
                Prev
              </button>
            )}
            {step < stepsComp.length - 1 ? (
              <button onClick={handleNext}>Next</button>
            ) : (
              <button onClick={handleSubmit(onSubmit)}>Check Out</button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
