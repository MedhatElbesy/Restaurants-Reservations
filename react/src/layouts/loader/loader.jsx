import ClipLoader from "react-spinners/ClipLoader";

const Loader = ({loading}) => {
  return (
    <div className="sweet-loading d-flex justify-content-center align-items-center vh-100 vw-100">
      <ClipLoader
        color={"#e0b370"}
        loading={loading}
        size={70}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;