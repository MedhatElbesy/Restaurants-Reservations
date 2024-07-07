import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkoutAmount } from "../../helpers/utils";
import CashGateways from "./gateways/CashGateways";
import PayPal from "./gateways/PayPal";
import PaymentDetails from "./PaymentDetails";
import { getGateways } from "../../slices/checkout/gatewaysSlice";
import Loader from '../../layouts/loader/loader';


const Payment = ({
  table,
  details,
  branch,
  paymentData,
  setPaymentData,
  register,
  errors,
}) => {
  const dispatch = useDispatch();
  const { gateways, state: gatewayState } = useSelector((state) => state.gateways);
  const { selectedData } = details;
  const amount = checkoutAmount(table, selectedData);
  const [selectedGatewayId, setSelectedGatewayId] = useState(null);

  useEffect(() => {
    dispatch(getGateways());
  }, [dispatch]);

  useEffect(() => {
    if (gateways) {
      setSelectedGatewayId(gateways[0].id);
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
          branch={branch}
        />
      </div>
      <div className="gateways m-auto col-11 mt-5">
        <p className="head mb-5 text-center">Confirm Reservation</p>
        <div className="gateway-images d-flex justify-content-center">
          {gateways &&
            gateways.map((gateway) => {
              if (gateway.type != "credit_card") {
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
        {gatewayState == "loading" && <Loader />}
        {gateways &&
          gateways.map((gateway) => {
            if (gateway.type === "cash") {
              return (
                selectedGatewayId === gateway.id && (
                  <div key={gateway.id} className="selected-gateway">
                    <CashGateways
                      amount={amount}
                      branch={branch}
                      paymentData={paymentData}
                      setPaymentData={setPaymentData}
                      register={register}
                      errors={errors}
                      gateway={gateway}
                    />
                  </div>
                )
              );
            }
            if (gateway.type === "paypal") {
              return (
                selectedGatewayId === gateway.id && (
                  <div key={gateway.id} className="selected-gateway">
                    <PayPal
                      amount={amount}
                      branch={branch}
                      paymentData={paymentData}
                      setPaymentData={setPaymentData}
                      gateway={gateway}
                    />
                  </div>
                )
              );
            }
            return null;
          })}
      </div>
    </article>
  );
};

export default Payment;
