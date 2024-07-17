import { useEffect, useState } from "react";
import { decryptData } from "../../../helpers/cryptoUtils";

const ReservationForm = ({ formData, setFormData, register, errors }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(decryptData("user"));
    if (user) {
      setFormData({
        name: `${user.first_name || ""} ${user.last_name || ""}`,
        email: user.email || "",
        telephone: user.mobile_number || "",
      });
    }
  }, [setFormData, user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  return (
    <form className="user-data d-flex flex-wrap">
      <div className="form-floating mb-3 col-11">
        <input
          type="text"
          className="form-input form-control"
          id="name"
          name="name"
          value={formData.name || ""}
          {...register("name", { required: "Full Name is required" })}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}
        <label htmlFor="name">Full Name</label>
      </div>
      <div className="form-floating mb-3 col-5">
        <input
          type="email"
          className="form-input form-control"
          id="email"
          name="email"
          value={formData.email || ""}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Value does not match email format",
            },
          })}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
        <label htmlFor="email">Your Email</label>
      </div>
      <div className="form-floating mb-3 col-5 offset-1">
        <input
          type="tel"
          className="form-input form-control"
          id="telephone"
          name="telephone"
          value={formData.telephone || ""}
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
        <label htmlFor="telephone">Phone Number</label>
      </div>
      <div className="form-floating mb-3 col-11">
        <textarea
          value={formData.notes || ""}
          className="form-input form-control"
          id="notes"
          name="notes"
          rows="5"
          {...register("notes", {})}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="notes">Please provide any additional info</label>
      </div>
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="terms_and_conditions"
          name="terms_and_conditions"
          checked={formData.terms_and_conditions || false}
          {...register("terms_and_conditions", {
            required: "You must accept the terms and conditions",
          })}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="terms_and_conditions">
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
        {errors.terms_and_conditions && (
          <p className="error">{errors.terms_and_conditions.message}</p>
        )}
      </div>
    </form>
  );
};

export default ReservationForm;
