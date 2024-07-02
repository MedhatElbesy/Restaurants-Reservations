const NavigationBar = ({ currentStep, steps }) => {
  return (
    <div className="navigation">
      <div className="step-wrapper">
        {steps.map((step, index) => (
          <div key={index} className="step">
            <p
              className={`step-label ${currentStep >= index ? "visited" : ""}`}
            >
              {index + 1}. {step.name}
            </p>
            <div
              className={`bar ${currentStep === index ? "active" : ""} ${
                currentStep >= index ? "visited" : ""
              }`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavigationBar;
