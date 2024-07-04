import { useState } from "react";
import { useDispatch } from "react-redux";
import { useBranch } from "../../restaurant/branches/BranchContext";
import { addComment } from "../../../slices/review/commentsSlice";
import Swal from "sweetalert2";

const AddComment = () => {
  const [comment, setComment] = useState("");
  const { branch } = useBranch();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (comment.trim()) {
        await dispatch(
          addComment({ comment: comment.trim(), branchId: branch.id })
        ).unwrap();
        setComment("");
      }
    } catch (error) {
      Swal.fire({
        text: "unexpexted error, please try again",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add comment"
      />
      <button type="submit">add</button>
    </form>
  );
};

export default AddComment;
