import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkoutAmount } from "../../utils";
import CashGateways from "./gateways/CashGateways";
import PaymentDetails from "./PaymentDetails";
import { getGateways } from "../../slices/checkout/gatewaysSlice";

const Payment = ({
  table,
  details,
  branch,
  formData,
  setFormData,
  register,
  errors,
}) => {
  const dispatch = useDispatch();
  const { gateways } = useSelector((state) => state.gateways);
  const { selectedData } = details;
  const amount = checkoutAmount(table, selectedData);
  const [selectedGatewayId, setSelectedGatewayId] = useState(null);

  useEffect(() => {
    dispatch(getGateways());
  }, [dispatch]);

  useEffect(() => {
    if(gateways) {
      const selected = gateways.find(
        (gateway) => gateway.type === "cash"
      );
      setSelectedGatewayId(selected.id);
    }
  }, [dispatch, gateways]);

  const handleGatewayClick = (gatewayId) => {
    setSelectedGatewayId(gatewayId);
  };

  return (
    <article className="payment text-color my-5">
      <div className="table-payment-details m-auto col-11">
        <PaymentDetails
          table={table}
          selectedData={selectedData}
          amount={amount}
        />
      </div>
      <div className="gateways m-auto col-11 mt-5">
        <p className="head mb-5 text-center">Confirm Reservation</p>
        <div className="gateway-images d-flex justify-content-center">
          {gateways &&
            gateways.map((gateway) => {
              if (gateway.type === "cash") {
                return (
                  <figure className="mb-5 mx-2" key={gateway.id}>
                    <img
                      src={gateway.photo}
                      alt={gateway.name}
                      onClick={() => handleGatewayClick(gateway.id)}
                      className={`gateway-image ${
                        selectedGatewayId === gateway.id ? "selected" : ""
                      }`}
                    />
                  </figure>
                );
              }
            })}
        </div>
        {gateways &&
          gateways.map((gateway) => {
            if (gateway.type === "cash") {
              return (
                selectedGatewayId === gateway.id && (
                  <div key={gateway.id} className="selected-gateway">
                    <CashGateways
                      amount={amount}
                      branchMobileNumber={branch.mobile_number}
                      formData={formData}
                      setFormData={setFormData}
                      register={register}
                      errors={errors}
                      gateway={gateway}
                    />
                  </div>
                )
              );
            }
            return null; // Add return null to handle other gateway types
          })}
      </div>
    </article>
  );
};

export default Payment;
