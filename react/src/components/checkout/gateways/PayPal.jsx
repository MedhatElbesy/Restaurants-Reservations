import { useEffect } from "react";
import { formatPrice } from "../../../helpers/utils";

const PayPal = ({
  branch,
  amount,
  paymentData,
  setPaymentData,
  gateway,
}) => {
  useEffect(() => {
    setPaymentData({
      ...paymentData,
      gateway: gateway,
      total_price: amount.total,
    });
  },[])

  return (
    <div className="cash-gateway d-flex flex-wrap justify-content-center">
      <p className="col-12 col-sm-9 col-md-7 mb-2 fs-4">
        Pay Using {gateway.title}
      </p>
      <p className="amount mb-4 fs-4 rounded-3 col-12 col-sm-9 col-md-7 text-center">
        Total Amount: {" "}
        <span className="text-sec">
          {formatPrice(amount.total, branch.country.country_code)}
        </span>{" "}
        <span className="text-sec mt-3 d-block">
          Click Place Order To Complete Payment
        </span>
      </p>
    </div>
  );
};

export default PayPal;
