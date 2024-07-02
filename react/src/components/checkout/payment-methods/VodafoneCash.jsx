const VodafoneCash = ({
  branchMobileNumber,
  total,
  formData,
  setFormData,
  register,
  errors,
}) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
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
    <div className="vodafone-cash">
      <p className="amount mb-4 fs-5 rounded-3">
        Transfer <span className="text-sec">{total}</span> to:{" "}
        <span className="text-sec">{branchMobileNumber}</span>
      </p>
      <div>
        <label className="mb-2" htmlFor="vodafoneCashNumber">
          Vodafone Cash Number
        </label>
        <input
          type="tel"
          className="form-input form-control"
          id="telephone"
          name="telephone"
          placeholder="Phone Number"
          {...register("telephone", {
            required: "Phone number is required",
            minLength: {
              value: 10,
              message: "Phone number must be at least 10 digits",
            },
          })}
          onChange={handleChange}
        />
        {errors.telephone && (
          <p className="error">{errors.telephone.message}</p>
        )}
      </div>
      <div className="my-3">
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
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="acceptTerms"
          name="acceptTerms"
          {...register("acceptTerms", {
            required: "You must accept the terms and conditions",
          })}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="acceptTerms">
          Please accept our{" "}
          <a
            href="/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="terms"
          >
            Terms and conditions
          </a>
        </label>
        {errors.acceptTerms && (
          <p className="error">{errors.acceptTerms.message}</p>
        )}
      </div>
    </div>
  );
};

export default VodafoneCash;
