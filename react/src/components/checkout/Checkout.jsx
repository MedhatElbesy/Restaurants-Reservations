import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { handelCheckoutData } from "../../helpers/checkoutData";
import { checkoutResevation } from "../../slices/checkout/checkoutSlice";
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
  const { reservationData } = location.state;
  const { restaurant } = useSelector((state) => state.restaurant);
  const branch = restaurant.locations.find(
    (branch) => branch.id == reservationData.branchId
  );
  const table = branch.tables.find(
    (table) => table.id == reservationData.tableId
  );

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
    const checkoutData = handelCheckoutData(reservationData, paymentData);
    for (let pair of checkoutData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    try {
      const response = await dispatch(
        checkoutResevation(checkoutData)
      ).unwrap();
      console.log(response);
      nextStep();
    } catch (error) {
      console.error("Error placing order:", error.data.errors);
    }
  };

  return (
    <section className="checkout p-sm-5 p-3 m-lg-5">
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
