import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./Checkout.css"

const Done = () => {
  const navigate = useNavigate();
  return (
    <article className="text-center p-5 m-nav-height">
      <p className="text-color text-success fs-4 fw-bold">
        Reservation Placed Successfuly
      </p>
      <p className="text-color">
        Check Your mail Box
      </p>
      <button
        className="btn-back px-3 py-1 rounded-5"
        onClick={() => navigate("/")}
      >
        <FontAwesomeIcon className="back" icon={faArrowLeft} />
        Back To Home
      </button>
    </article>
  );
};

export default Done;
