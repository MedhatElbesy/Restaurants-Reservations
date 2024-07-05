import { useDispatch } from "react-redux";
import { Rating } from "react-simple-star-rating";
import { addRating } from "../../../slices/review/ratingSlice";

const StarRating = ({
  branch,
  readOnly = false,
  initialRating = 0,
  size = 40,
}) => {
  const dispatch = useDispatch();

  const handleRating = async (rate) => {
    const response = await dispatch(
      addRating({ rate, branchId: branch.id })
    ).unwrap();
    console.log(response);
  };

  return (
    <div className="mb-2 star-rating-component">
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
    </div>
  );
};

export default StarRating;
