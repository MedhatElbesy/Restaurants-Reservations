import { useNavigate } from "react-router-dom";

const Done = () => {
  const navigate = useNavigate();
  return (
    <article className="text-center p-5 m-nav-height">
      <p className="text-color text-success fs-4 fw-bold">Order Placed Successfuly</p>
      <p className="text-color">You will be notified when restaurant accept your order</p>
      <button onClick={()=> navigate("/")}>Back TO Home</button>
    </article>
  );
};

export default Done;
