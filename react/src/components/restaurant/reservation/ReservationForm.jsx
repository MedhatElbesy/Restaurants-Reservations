const ReservationForm = ({ formData, setFormData, register, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form className="user-data d-flex flex-wrap">
      <div className="mb-3 col-11">
        <input
          type="text"
          className="form-input"
          id="name"
          name="name"
          placeholder="Full Name"
          {...register("name", { required: "Full Name is required" })}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </div>
      <div className="mb-3 col-5">
        <input
          type="email"
          className="form-input"
          id="email"
          name="email"
          placeholder="Your Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "value does not match email format",
            },
          })}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>
      <div className="mb-3 col-5 offset-1">
        <input
          type="tel"
          className="form-input"
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
      <div className="mb-3 col-11">
        <textarea
          className="form-input"
          id="additionalInfo"
          name="additionalInfo"
          placeholder="Please provide any additional info"
          rows="3"
          {...register("additionalInfo")}
          onChange={handleChange}
        ></textarea>
      </div>
    </form>
  );
};

export default ReservationForm;
