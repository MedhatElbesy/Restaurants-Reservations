import { useEffect } from "react";
import { decryptData } from "../../../helpers/cryptoUtils";

const ReservationForm = ({ formData, setFormData, register, errors }) => {
  useEffect(() => {
    const savedFormData = sessionStorage.getItem("formData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }

    const decryptedUser = decryptData("user");
    if (decryptedUser) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: `${decryptedUser.first_name || ""} ${
          decryptedUser.last_name || ""
        }`,
        email: decryptedUser.email || "",
        telephone: decryptedUser.mobile_number || "",
      }));
    }
  }, [setFormData]);

  useEffect(() => {
    sessionStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <form className="user-data d-flex flex-wrap">
      <div className="form-floating mb-3 col-11">
        <input
          value={formData.name || ""}
          type="text"
          className="form-input form-control"
          id="name"
          name="name"
          {...register("name", { required: "Full Name is required" })}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}
        <label htmlFor="name">Full Name</label>
      </div>
      <div className="form-floating mb-3 col-5">
        <input
          value={formData.email || ""}
          type="email"
          className="form-input form-control"
          id="email"
          name="email"
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
          value={formData.telephone || ""}
          type="tel"
          className="form-input form-control"
          id="telephone"
          name="telephone"
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
