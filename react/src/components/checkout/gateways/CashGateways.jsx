const VodafoneCash = ({
  branchMobileNumber,
  amount,
  formData,
  setFormData,
  register,
  errors,
  gateway,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      gateway: gateway,
      total_price: amount.total,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  return (
    <div className="cash-gateway d-flex flex-wrap justify-content-center">
      <p className="col-12 col-sm-9 col-md-7 mb-2 fs-4">
        Pay Using {gateway.title}
      </p>
      <p className="amount mb-4 fs- rounded-3 col-12 col-sm-9 col-md-7 text-center fs-6">
        Transfer <span className="text-sec">{amount.total}</span> to:{" "}
        <span className="text-sec">{branchMobileNumber}</span>
      </p>
      <div className="col-12 col-sm-9 col-md-7">
        <label className="mb-2" htmlFor="vodafoneCashNumber">
          {gateway.title} Number
        </label>
        <input
          type="tel"
          className="form-input form-control"
          id="transaction_phone_number"
          name="transaction_phone_number"
          placeholder={`${gateway.title} Number`}
          {...register("transaction_phone_number", {
            required: "Phone number is required",
            minLength: {
              value: 10,
              message: "Phone number must be at least 10 digits",
            },
          })}
          onChange={handleChange}
        />
        {errors.transaction_phone_number && (
          <p className="error">{errors.transaction_phone_number.message}</p>
        )}
      </div>
      <div className="col-12 col-sm-9 col-md-7 my-3">
        <label className="mb-2" htmlFor="paymentProof">
          Upload Payment Proof (Image)
        </label>
        <input
          name="paymentProof"
          className="form-control"
          type="file"
          id="paymentProof"
          accept="image/*"
          {...register("paymentProof", {
            required: "Payment proof is required",
          })}
          onChange={handleFileChange}
        />
        {errors.paymentProof && (
          <p className="error">{errors.paymentProof.message}</p>
        )}
      </div>
    </div>
  );
};

export default VodafoneCash;
