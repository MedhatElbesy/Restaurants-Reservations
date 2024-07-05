import { useState } from "react";
import { useDispatch } from "react-redux";
import { Rating } from "react-simple-star-rating";
import { Alert } from "react-bootstrap";
import { addRating } from "../../../slices/review/ratingSlice";

const StarRating = ({
  branch,
  readOnly = false,
  initialRating = 0,
  size = 40,
}) => {
  const dispatch = useDispatch();
  const [alertMessage, setAlertMessage] = useState("");

  const handleRating = async (rate) => {
    try {
      await dispatch(
        addRating({ rate, branchId: branch.id })
      ).unwrap();
      setAlertMessage("Rating sent");
    } catch (err) {
      setAlertMessage("Failed to submit rating. Please try again.");
    }

    setTimeout(() => {
      setAlertMessage("");
    }, 3000);
  };

  return (
    <div className="mb-2 star-rating-component position-relative">
      <Rating
        onClick={handleRating}
        size={size}
        fillColor="#FFD700"
        emptyColor="#EEE"
        transition
        iconsCount={5}
        readonly={readOnly}
        initialValue={initialRating}
      />
      {alertMessage && (
        <Alert
          variant={alertMessage.includes("successfully") ? "success" : "danger"}
          className="position-absolute text-center top-100 mt-2"
        >
          {alertMessage}
        </Alert>
      )}
    </div>
  );
};

export default StarRating;
