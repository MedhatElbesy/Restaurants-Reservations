import { useState } from "react";
import { useLocation } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import NavigationBar from "./NavigationBar";
import RestaurantDetails from "./RestaurantDetails";
import TableDetails from "./TableDetails";
import Payment from "./Payment";
import Done from "./Done";
import "./Checkout.css";

const Checkout = () => {
  const location = useLocation();
  const { reservationData } = location.state;
  const { restaurant } = useSelector((state) => state.restaurant);
  const branch = restaurant.locations.find(
    (branch) => branch.id == reservationData.branchId
  );
  const table = branch.tables.find(
    (table) => table.id == reservationData.tableId
  );
  console.log(reservationData);
  console.log(restaurant);
  console.log(branch);
  console.log(table);
  const [currentStep, setCurrentStep] = useState(0);

  // Example data placeholders
  const steps = [
    {
      name: "Restaurant Details",
      component: <RestaurantDetails restaurant={restaurant} branch={branch} />,
    },
    {
      name: "Table Details",
      component: <TableDetails table={table} details={reservationData} />,
    },
    {
      name: "Payment",
      component: <Payment table={table} details={reservationData} />,
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

  return (
    <section className="checkout m-5">
      <div className="head text-center mb-5">
        <h1>Checkout</h1>
        <p>{table.description}</p>
      </div>
      <NavigationBar currentStep={currentStep} steps={steps} />
      {steps[currentStep].component}
      <div className="navigation-buttons">
        {currentStep !== 0 && <button onClick={prevStep}>Prev</button>}
        {currentStep < steps.length - 1 && (
          <button onClick={nextStep}>Next</button>
        )}
      </div>
    </section>
  );
};

export default Checkout;
