import { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import CustomCalendar from "./Calendar";
import TimeAndAdditional from "./TimeAndAdditional";
import ReservationForm from "./ReservationForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import Loader from "../../../layouts/loader/loader";
import { getTableAvailability } from "../../../slices/restaurant/table/availabilitySlice";
import "./Reservation.css";
import Details from "./Details";

const Reservation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tableId } = useParams();
  const branch = JSON.parse(sessionStorage.getItem("branch"));
  const table = JSON.parse(sessionStorage.getItem("table"));
  const { restaurant } =
    useSelector((state) => state.restaurant) ||
    JSON.parse(sessionStorage.getItem("restaurant"));
  const { tableAvailability, status: tableAvailabilityStatus } = useSelector(
    (state) => state.tableAvailability
  );
  sessionStorage.setItem(
    "tableAvailability",
    JSON.stringify(tableAvailability)
  );

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
  const [reservationDate, setReservationDate] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const stepsComp = [
    {
      component: (
        <CustomCalendar
          reservationDate={reservationDate}
          setReservationDate={setReservationDate}
          branch={branch}
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
    if (step === 0 && !reservationDate) {
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

  const onSubmit = (userData) => {
    setFormData(userData);
    const reservationDetails = {
      userData,
      selectedData,
      reservationDate,
      branch: branch,
      table: table,
    };
    navigate(`/reservation/checkout`, {
      state: { reservationDetails },
    });
  };

  const showError = (message) => {
    Swal.fire({
      text: message,
    });
  };

  return (
    <>
      {tableAvailabilityStatus === "loading" && <Loader size={45} />}
      {tableAvailabilityStatus == "succeeded" &&
        tableAvailability.length == 0 && (
          <p className="text-center fw-bold fs-4 text-color full mt-5">
            We Are Sorry, All Table Appointments Are Reserved
          </p>
        )}
      {tableAvailabilityStatus == "succeeded" &&
        tableAvailability.length > 0 && (
          <section
            className="reservation pt-5 d-flex flex-wrap justify-content-center"
          >
            <FontAwesomeIcon
              onClick={() => navigate(`/restaurant/${restaurant.id}/branches`)}
              className="back"
              icon={faArrowLeft}
            />{" "}
            {/* Details */}
            <div className="resrvation-details d-flex flex-column justify-content-center col-12 col-sm-11 py-lg-4 mt-4 mt-lg-0 p-4 col-lg-4 order-1 order-lg-0">
              <Details restaurant={restaurant} branch={branch} table={table} />
            </div>
            {/* Reservation Details */}
            <div className="col-12 col-sm-11 col-lg-8 px-lg-4 mt-4 mt-lg-0 p-4">
              <div>
                <h4 className="mb-0 fs-1">
                  Reserve Table{" "}
                  <strong className="text-color">No.{table.id}</strong>
                </h4>
                <p>
                  or Call us at{" "}
                  <strong className="text-color">{branch.mobile_number}</strong>
                </p>
              </div>
              <div className="p-3 rounded-4" style={{ backgroundColor: "#f4f4f4" }}>
                <div className="head pb-4">
                  <div className="counter mb-3">
                    <span>{`${step + 1}/${stepsComp.length}`}</span>{" "}
                    {stepsComp[step].label}
                  </div>
                  {stepsComp[step].component}
                </div>

                {/* Navigations */}
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
        )}
    </>
  );
};

export default Reservation;
