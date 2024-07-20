import { useNavigate } from "react-router-dom";
import "./Checkout.css"

const Done = () => {
  const navigate = useNavigate();
  return (
    <article className="text-center p-5 m-nav-height">
      <p className="text-color text-success fs-4 fw-bold">Order Placed Successfuly</p>
      <p className="text-color">You will be notified when restaurant accept your order</p>
      <button className="btn-back px-3 py-1 rounded-5" onClick={()=> navigate("/")}>Back To Home</button>
    </article>
  );
};

export default Done;
