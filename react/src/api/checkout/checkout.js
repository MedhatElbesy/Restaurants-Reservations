import axios from "../../axios";

const EndPoint = "/reservations";

export const makeCheckout = async (checkoutData) => {
  console.log(checkoutData)
  try {
    console.log({
      total_price: checkoutData.total_price, // required
      notes: checkoutData.formData.notes,
      terms_and_conditions: checkoutData.formData.terms_and_conditions, // required
      details: [
        {
          table_id: checkoutData.tableId,
          table_availability_id: checkoutData.selectedData.availabilityId, // required
          reservation_date: checkoutData.reservationDate.toLocaleDateString('en-CA'), //required
          reservation_time: null,
          amount: checkoutData.total_price, //required
          number_of_extra_chairs: checkoutData.selectedData.extraSeats,
          number_of_extra_childs_chairs: checkoutData.selectedData.childSeats,
        },
      ],
      amount: checkoutData.total_price, // required
      payment_method: checkoutData.gateway.type,
      gateway_id: checkoutData.gateway.id, // required
      transaction_image: checkoutData.paymentProof, //required upload image
      transaction_phone_number: checkoutData.transaction_phone_number, //required
      transaction_id: "1234567890",
      customer_name: checkoutData.formData.name,
      customer_email: checkoutData.formData.email,
      customer_phone: checkoutData.formData.telephone,
    });
    const response = await axios.post(`${EndPoint}`, {
      total_price: checkoutData.total_price, // required
      notes: checkoutData.notes,
      terms_and_conditions: checkoutData.formData.terms_and_conditions, // required
      details: [
        {
          table_id: checkoutData.tableId,
          table_availability_id: checkoutData.selectedData.availabilityId, // required
          reservation_date:
            checkoutData.reservationDate.toLocaleDateString("en-CA"), //required
          reservation_time: null,
          amount: checkoutData.total_price, //required
          number_of_extra_chairs: checkoutData.selectedData.extraSeats,
          number_of_extra_childs_chairs: checkoutData.selectedData.childSeats,
        },
      ],
      amount: checkoutData.total_price, // required
      payment_method: checkoutData.gateway.type,
      gateway_id: checkoutData.gateway.id, // required
      transaction_image: checkoutData.paymentProof, //required upload image
      transaction_phone_number: checkoutData.transaction_phone_number, //required
      transaction_id: "1234567890",
      customer_name: checkoutData.formData.name,
      customer_email: checkoutData.formData.emal,
      customer_phone: checkoutData.formData.telephone,
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred during making reservation", error);
    throw error;
  }
};
