import AddReview from "./AddReview";
import Comments from "./Comments";
import "./BranchComments.css";
const BranchComments = () => {
  return (
    <section className="branch-comments m-5">
      <AddReview />
      <Comments />
    </section>
  );
};

export default BranchComments;
