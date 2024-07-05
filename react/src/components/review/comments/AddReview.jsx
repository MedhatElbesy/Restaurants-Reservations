import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useBranch } from "../../restaurant/branches/BranchContext";
import { addComment } from "../../../slices/review/commentsSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import StarRating from "../rating/Rating";
import AddReport from "../report/Report";
import { Alert } from "react-bootstrap";

const AddComment = () => {
  const navigate = useNavigate();
  const { branch } = useBranch();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.comments.error);
  const [comment, setComment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim()) {
      try {
        await dispatch(
          addComment({ comment: comment.trim(), branchId: branch.id })
        ).unwrap();
        setComment("");
        setAlertMessage("Comment posted successfully!");
      } catch (err) {
        console.log(err);
        setAlertMessage("Failed to post comment. Please try again.");
        navigate("/server-error");
      }
      setTimeout(() => {
        setAlertMessage("");
      }, 3000);
    }
  };

  return (
    <article className="add-review pb-5">
      <h4 className="fs-1 mb-5">Post Your Review</h4>

      <div className="review d-flex flex-wrap justify-content-lg-between justify-content-center">
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
            disabled={comment.trim() === ""}
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
      <div className="report">
        <p className="mt-3 mb-0 d-inline-block" onClick={handleOpenModal}>
          <FontAwesomeIcon icon={faFlag} /> Report
        </p>
        <AddReport
          show={showModal}
          branch={branch}
          handleClose={handleCloseModal}
        />
      </div>
      {alertMessage && (
        <Alert
          variant={alertMessage.includes("successfully") ? "success" : "danger"}
          className="position-fixed m-3"
        >
          {alertMessage}
        </Alert>
      )}
    </article>
  );
};

export default AddComment;
