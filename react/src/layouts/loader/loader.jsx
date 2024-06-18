import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("green");

  return (
    <div className="sweet-loading d-flex justify-content-center align-items-center vh-100 vw-100">
      <ClipLoader
        color={color}
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;