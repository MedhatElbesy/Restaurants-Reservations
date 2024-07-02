import PaymentDetails from "./PaymentDetails";
import VodafoneCash from "./payment-methods/VodafoneCash";

const Payment = ({ table, details, branch }) => {
  const { selectedData } = details;

  const extraChairTotal =
    Number(selectedData.extraSeats) * Number(table.extra_chair_price);
  const extraChildTotal =
    Number(selectedData.childSeats) * Number(table.extra_child_chair_price);
  const subTotal = Number(table.price) + extraChildTotal + extraChairTotal;
  const discount = Number(table.price) - Number(table.sale_price);
  const total = subTotal - discount;
  const amount = {
    total,
    discount,
    subTotal,
    extraChildTotal,
    extraChairTotal,
  };

  return (
    <article className="payment d-flex justify-content-around text-color my-5">
      <div className="table-payment-details col-5">
        <PaymentDetails
          table={table}
          selectedData={selectedData}
          amount={amount}
        />
      </div>
      <div className="payment-method col-5">
        <p className="head">Payment Method</p>
        <VodafoneCash total={total} branchMobileNumber={branch.mobile_number} />
      </div>
    </article>
  );
};

export default Payment;
