import { formatPrice } from "../../helpers/utils";

const PaymentDetails = ({ table, selectedData, amount }) => {
  function price(price) {
    return formatPrice(price, "EG");
  }
  return (
    <>
      <p className="head">Total: {price(amount.total)}</p>
      <div className="d-flex flex-wrap justify-content-center">
        <div className="details p-5 p-md-4 col-12 col-md-6">
          <div className="table-price pb-3">
            <p>
              <span>Table No.{table.id}</span>
              <span>{price(table.price)}</span>
            </p>
          </div>
          <div className="extra-chair-price">
            <p className="extra-chair">
              <span>Extra Seats</span>
              <span>
                {selectedData.extraSeats > 0
                  ? price(amount.extraChairTotal)
                  : "0"}
              </span>
            </p>
            <p className="extra-chair-quantity">
              {selectedData.extraSeats > 0 && (
                <>
                  <span>Qty. {selectedData.extraSeats}</span>
                  <span>{price(table.extra_chair_price)}/each</span>
                </>
              )}
            </p>
          </div>
          <div className="child-chair-price">
            <p className="child-chair">
              <span>Child Seats</span>
              <span>
                {selectedData.childSeats > 0
                  ? price(amount.extraChildTotal)
                  : "0"}
              </span>
            </p>
            <p className="child-chair-quantity">
              {selectedData.childSeats > 0 && (
                <>
                  <span>Qty. {selectedData.childSeats}</span>
                  <span>{price(table.extra_child_chair_price)}/each</span>
                </>
              )}
            </p>
          </div>
        </div>
        <div className="reciet pb-3 p-md-4 col-7 col-md-5">
          <div className="subtotal">
            <p>
              <span>Subtotal</span>
              <span>{price(amount.subTotal)}</span>
            </p>
          </div>
          <div className="tax">
            <p className="text-color">
              <span>Tax</span>
              <span>{price(amount.tax)}+</span>
            </p>
          </div>
          <div className="discount">
            <p className="text-color">
              <span>Discount</span>
              <span>{price(amount.discount)}-</span>
            </p>
          </div>
          <div className="total">
            <p>
              <span>Total</span>
              <span>{price(amount.total)}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDetails;
