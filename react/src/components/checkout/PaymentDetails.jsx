const PaymentDetails = ({ table, selectedData, amount }) => {
  return (
    <>
      <p className="head">Total: {amount.total}</p>
      <div className="d-flex flex-wrap justify-content-center">
        <div className="details p-5 p-md-4 col-12 col-md-7">
          <div className="table-price pb-3">
            <p>
              <span>Table No.{table.id}</span>
              <span>{table.price}</span>
            </p>
          </div>
          <div className="extra-chair-price">
            <p className="extra-chair">
              <span>Extra Seats</span>
              <span>{amount.extraChairTotal}</span>
            </p>
            <p className="extra-chair-quantity">
              <span>Qty. {selectedData.extraSeats}</span>
              <span>{table.extra_chair_price}/each</span>
            </p>
          </div>
          <div className="child-chair-price">
            <p className="child-chair">
              <span>Child Seats</span>
              <span>{amount.extraChildTotal}</span>
            </p>
            <p className="child-chair-quantity">
              <span>Qty. {selectedData.childSeats}</span>
              <span>{table.extra_child_chair_price}/each</span>
            </p>
          </div>
        </div>
        <div className="reciet pb-3 p-md-4 col-7 col-md-5">
          <div className="subtotal">
            <p>
              <span>Subtotal</span>
              <span>{amount.subTotal}</span>
            </p>
          </div>
          <div className="discount">
            <p>
              <span>Discount</span>
              <span>-{amount.discount}</span>
            </p>
          </div>
          <div className="total">
            <p>
              <span>Total</span>
              <span>{amount.total}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDetails;
