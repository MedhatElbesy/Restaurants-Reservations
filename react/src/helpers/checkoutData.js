export const handelCheckoutData = (
  reservationData,
  paymentData,
  restaurant
) => {
  const date = new Date(reservationData.reservationDate);
  const checkoutData = new FormData();
  checkoutData.append("total_price", paymentData.total_price);
  checkoutData.append("notes", reservationData.userData.notes);
  checkoutData.append("restaurant_id", restaurant.id);
  checkoutData.append(
    "terms_and_conditions",
    reservationData.userData.terms_and_conditions ? 1 : 0
  );
  checkoutData.append("table_id", reservationData.table.id);
  checkoutData.append(
    "table_availability_id",
    reservationData.selectedData.availabilityId
  );
  checkoutData.append("reservation_date", date.toLocaleDateString("en-CA"));
  checkoutData.append("amount", paymentData.total_price);
  checkoutData.append(
    "number_of_extra_chairs",
    reservationData.selectedData.extraSeats || 0
  );
  checkoutData.append(
    "number_of_extra_childs_chairs",
    reservationData.selectedData.childSeats || 0
  );
  checkoutData.append("payment_method", paymentData.gateway.type);
  checkoutData.append("gateway_id", paymentData.gateway.id);
  if (paymentData.gateway.type == "cash") {
    checkoutData.append("transaction_image", paymentData.paymentProof);
  }
  checkoutData.append(
    "transaction_phone_number",
    paymentData.transaction_phone_number
  );
  checkoutData.append("customer_name", reservationData.userData.name);
  checkoutData.append("customer_email", reservationData.userData.email);
  checkoutData.append("customer_phone", reservationData.userData.telephone);
  return checkoutData;
};
