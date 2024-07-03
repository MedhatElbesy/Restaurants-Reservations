export const handelCheckoutData = (reservationData, paymentData) => {
  const checkoutData = new FormData();

  checkoutData.append("total_price", paymentData.total_price);
  checkoutData.append("notes", reservationData.userData.notes);
  checkoutData.append(
    "terms_and_conditions",
    reservationData.userData.terms_and_conditions ? 1 : 0
  );
  checkoutData.append("table_id", reservationData.tableId);
  checkoutData.append(
    "table_availability_id",
    reservationData.selectedData.availabilityId
  );
  checkoutData.append(
    "reservation_date",
    reservationData.reservationDate.toLocaleDateString("en-CA")
  );
  checkoutData.append("amount", paymentData.total_price);
  checkoutData.append(
    "number_of_extra_chairs",
    reservationData.selectedData.extraSeats
  );
  checkoutData.append(
    "number_of_extra_childs_chairs",
    reservationData.selectedData.childSeats
  );
  checkoutData.append("payment_method", paymentData.gateway.type);
  checkoutData.append("gateway_id", paymentData.gateway.id);
  // checkoutData.append("transaction_image", paymentData.paymentProof);
  checkoutData.append(
    "transaction_phone_number",
    paymentData.transaction_phone_number
  );
  checkoutData.append("customer_name", reservationData.userData.name);
  checkoutData.append("customer_email", reservationData.userData.email);
  checkoutData.append("customer_phone", reservationData.userData.telephone);

  return checkoutData;
};
