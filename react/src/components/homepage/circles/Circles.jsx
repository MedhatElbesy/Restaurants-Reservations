import { useNavigate } from "react-router-dom";

export default function Circles() {
  const navigate = useNavigate();
  const handleNavigate = (num) => {
    navigate(`/restaurant/${num}/home`);
  };
  return (
    <main className="circle-container my-5 mx-2">
      <div
        className="circle mx-1"
        onClick={() => handleNavigate(1)}
        style={{ backgroundImage: `url('./images/3.jpg')`, cursor: "pointer" }}
      >
        <div
          className="overlay-text"
          style={{
            cursor: "pointer",
          }}
        >
          Savor
        </div>
      </div>
      <div
        className="circle  mx-1"
        onClick={() => handleNavigate(2)}
        style={{ backgroundImage: `url('./images/5 (1) - Copy.jpg')` }}
      >
        <div
          className="overlay-text"
          style={{
            cursor: "pointer",
          }}
        >
          Share
        </div>
      </div>

      <div
        onClick={() => handleNavigate(3)}
        className="circle  mx-1"
        style={{ backgroundImage: `url('./images/1 (4).jpg')` }}
      >
        <div
          className="overlay-text"
          style={{
            cursor: "pointer",
          }}
        >
          Enjoy
        </div>
      </div>
    </main>
  );
}
