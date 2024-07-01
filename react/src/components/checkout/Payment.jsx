const Payment = ({ table, details }) => {
  const { selectedData, selectedDate } = details;
  return (
    <article className="payment">
      <div className="table-payment-details">
        <div className="details">
          <div className="table-price d-flex justify-content-between">
            <p>Table No.{table.id}</p>
            <p>{table.price}</p>
          </div>
          <div className="extra-chair-price">
            <p className="extra-chair">
              <span>Extra Seats</span>
              <span>{selectedData.extraSeats * 2}</span>
            </p>
            <p className="extra-chair-quantity">
              <span>{selectedData.extraSeats}</span>
              <span>{selectedData.extraSeats}/each</span>
            </p>
          </div>
          <div className="child-chair-price">
            <p className="child-chair">
              <span>Child Seats</span>
              <span>{selectedData.childSeats * 5}</span>
            </p>
            <p className="child-chair-quantity">
              <span>{selectedData.childSeats}</span>
              <span>{selectedData.childSeats}/each</span>
            </p>
          </div>
        </div>
        <div className="reciet">
          <div className="subtotal">
            <p>
              <span>Subtotal</span>
              <span>$500</span>
            </p>
          </div>
          <div className="discount">
            <p>
              <span>Discount</span>
              <span>-$50</span>
            </p>
          </div>
          <div className="total">
            <p>
              <span>Total</span>
              <span>$450</span>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Payment;
