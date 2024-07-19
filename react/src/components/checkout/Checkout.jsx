import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { handelCheckoutData } from "../../helpers/checkoutData";
import { checkoutReservation } from "../../slices/checkout/checkoutSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import NavigationBar from "./NavigationBar";
import RestaurantDetails from "./RestaurantDetails";
import TableDetails from "./TableDetails";
import Payment from "./Payment";
import Done from "./Done";

import "./Checkout.css";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { reservationDetails } = location.state;
  sessionStorage.setItem("reservationData", JSON.stringify(reservationDetails));
  const reservationData = JSON.parse(sessionStorage.getItem("reservationData"));
  // const reservationData = reservationDetails;
  const { restaurant } = useSelector((state) => state.restaurant);
  const branch = reservationData.branch;
  const table = reservationData.table;

  const [currentStep, setCurrentStep] = useState(0);
  const [paymentData, setPaymentData] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const steps = [
    {
      name: "Restaurant",
      component: <RestaurantDetails restaurant={restaurant} branch={branch} />,
    },
    {
      name: "Table Details",
      component: <TableDetails table={table} details={reservationData} />,
    },
    {
      name: "Payment",
      component: (
        <Payment
          table={table}
          details={reservationData}
          branch={branch}
          paymentData={paymentData}
          setPaymentData={setPaymentData}
          register={register}
          errors={errors}
        />
      ),
    },
    {
      name: "Done",
      component: <Done />,
    },
  ];

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handlePrevClick = () => {
    if (currentStep === steps.length - 1) {
      navigate("/");
    } else {
      prevStep();
    }
  };

  const handlePlaceOrder = async () => {
    const checkoutData = handelCheckoutData(
      reservationData,
      paymentData,
      restaurant
    );
    try {
      const response = await dispatch(
        checkoutReservation(checkoutData)
      ).unwrap();
      console.log(response);
      if (paymentData.gateway.type === "paypal") {
        const iframe = document.getElementById("paypalIframe");
        iframe.src = response.data;
      }
      // nextStep();
    } catch (error) {
      console.error("Error placing order:", error.data.errors);
    }
  };

  return (
    <section className="checkout p-sm-5 p-3 m-lg-5">
      <FontAwesomeIcon
        onClick={() =>
          navigate(`/restaurant/${restaurant.id}/reservation/${table.id}`)
        }
        className="back"
        icon={faArrowLeft}
      />{" "}
      <div className="head text-center mb-5">
        <h1 className="text-sec">Checkout</h1>
        <p className="text-color">{table.description}</p>
      </div>
      <NavigationBar currentStep={currentStep} steps={steps} />
      {steps[currentStep].component}
      <div className="navigation-buttons">
        {currentStep !== 0 && (
          <button onClick={handlePrevClick}>
            {currentStep === steps.length - 1 ? "Back to Home" : "Prev"}
          </button>
        )}
        {currentStep < steps.length - 2 && (
          <button onClick={nextStep}>Next</button>
        )}
        {currentStep === steps.length - 2 && (
          <button onClick={handleSubmit(handlePlaceOrder)}>Place Order</button>
        )}
      </div>
    </section>
  );
};

export default Checkout;
