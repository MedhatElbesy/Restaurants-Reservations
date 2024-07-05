import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useBranch } from "../../restaurant/branches/BranchContext";
import { addComment } from "../../../slices/review/commentsSlice";
import { useNavigate } from "react-router-dom";
import StarRating from "../rating/Rating";

const AddComment = () => {
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const { branch } = useBranch();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.comments.error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim()) {
      try {
        await dispatch(
          addComment({ comment: comment.trim(), branchId: branch.id })
        ).unwrap();
        setComment("");
      } catch (err) {
        console.log(err);
        navigate("/server-error");
      }
    }
  };

  return (
    <article className="add-review pb-5">
      <h4 className="fs-1 mb-5">Post Your Review</h4>
      <div className="review d-flex flex-wrap justify-content-lg-between justify-content-center ">
        <form
          onSubmit={handleSubmit}
          className="add-comment col-12 col-sm-9 col-md-7 col-lg-5"
        >
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add comment"
            rows={5}
          />
          <button
            type="submit"
            className="add-btn d-block"
            disabled={comment === ""}
          >
            Post Comment
          </button>
          {error && (
            <p>Error: {error.message ? error.message : "Unknown error"}</p>
          )}
        </form>
        <div className="add-rating text-center my-lg-0 mt-5 col-12 col-sm-9 col-md-7 col-lg-7">
          <p className="text-color fs-2">Rate This Branch</p>
          <StarRating branch={branch} />
        </div>
      </div>
    </article>
  );
};

export default AddComment;
