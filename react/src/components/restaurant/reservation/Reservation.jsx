import { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { useDispatch, useSelector } from "react-redux";
import { useBranch } from "../branches/BranchContext";
import Swal from "sweetalert2";
import MapContainer from "../../Map/Map";
import CustomCalendar from "./Calendar";
import TimeAndAdditional from "./TimeAndAdditional";
import ReservationForm from "./ReservationForm";
import { useForm } from "react-hook-form";
import Loader from "../../../layouts/loader/loader";
import { getTableAvailability } from "../../../slices/restaurant/table/availabilitySlice";
import "./Reservation.css";

const Reservation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tableId } = useParams();
  const { branch } = useBranch();
  const { tables } = useSelector((state) => state.restaurantTables);
  const table = tables.find((table) => table.id == tableId);
  const { restaurant } = useSelector((state) => state.restaurant);
  const { tableAvailability, status: tableAvailabilityStatus } = useSelector(
    (state) => state.tableAvailability
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
    const reservationData = {
      userData,
      selectedData,
      reservationDate,
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
            className="reservation d-flex flex-wrap justify-content-center"
            style={{ backgroundColor: "#edededf0" }}
          >
            {/* Map */}
            <div className="map col-12 col-sm-12 col-lg-4 order-1 order-lg-0">
              <MapContainer
                latitude={branch.latitude}
                longitude={branch.longitude}
                popup={restaurant.name}
              />
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
              <div className="p-3" style={{ backgroundColor: "#f4f4f4" }}>
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
