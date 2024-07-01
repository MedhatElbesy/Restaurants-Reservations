const ReservationForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          First and Last Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Your Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="telephone" className="form-label">
          Your Telephone
        </label>
        <input
          type="tel"
          className="form-control"
          id="telephone"
          name="telephone"
          value={formData.telephone || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="additionalInfo" className="form-label">
          Please provide any additional info
        </label>
        <textarea
          className="form-control"
          id="additionalInfo"
          name="additionalInfo"
          value={formData.additionalInfo || ""}
          onChange={handleChange}
          rows="3"
        ></textarea>
      </div>
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="acceptTerms"
          name="acceptTerms"
          checked={formData.acceptTerms || false}
          onChange={handleChange}
          required
        />
        <label className="form-check-label" htmlFor="acceptTerms">
          Please accept our{" "}
          <a href="/terms" target="_blank" rel="noopener noreferrer">
            Terms and conditions
          </a>
        </label>
      </div>
    </form>
  );
};

export default ReservationForm;
