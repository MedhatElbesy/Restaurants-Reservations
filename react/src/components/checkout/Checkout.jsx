import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import NavigationBar from "./NavigationBar";
import RestaurantDetails from "./RestaurantDetails";
import TableDetails from "./TableDetails";
import Payment from "./Payment";
import Done from "./Done";
import "./Checkout.css";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { reservationData } = location.state;
  const { restaurant } = useSelector((state) => state.restaurant);
  const branch = restaurant.locations.find(
    (branch) => branch.id == reservationData.branchId
  );
  const table = branch.tables.find(
    (table) => table.id == reservationData.tableId
  );

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
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
          formData={formData}
          setFormData={setFormData}
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

  const handlePlaceOrder = (data) => {
    console.log("Order placed with data:", {
      ...data,
      ...reservationData,
      ...formData,
    });
    nextStep();
  };

  return (
    <section className="checkout m-5">
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
