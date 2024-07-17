import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useBranch } from "../../restaurant/branches/BranchContext";
import { formatDate } from "../../../helpers/utils";
import Loader from "../../../layouts/loader/loader";
import { getBranchComments } from "../../../slices/review/commentsSlice";
import StarRating from "../rating/Rating";
import { Pagination } from "react-bootstrap";

const Comments = () => {
  const dispatch = useDispatch();
  const { branch } = useBranch();
  const { branchComments, status, error } = useSelector(
    (state) => state.comments
  );
  const [currentFilter, setCurrentFilter] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

  const prevBranchId = useRef(null);
  useEffect(() => {
    if (branch.id && branch.id !== prevBranchId.current) {
      dispatch(getBranchComments(branch.id));
      prevBranchId.current = branch.id;
      setCurrentPage(1);
    }
  }, [dispatch, branch.id]);

  const filteredComments = () => {
    if (currentFilter === "top-rated") {
      return branchComments.slice().sort((a, b) => b.user.rate - a.user.rate);
    }
    return branchComments
      .slice()
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  };

  const handleFilterChange = (e) => {
    setCurrentFilter(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginate = (comments) => {
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    return comments.slice(indexOfFirstComment, indexOfLastComment);
  };

  const paginatedComments = paginate(filteredComments());

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (status === "loading") {
    return <Loader size={100} />;
  }

  const totalPages = Math.ceil(filteredComments().length / commentsPerPage);

  return (
    <article className="all-users-comments mt-5 d-flex flex-column align-items-center">
      <h4 className="fs-1 mb-5">What People Are Saying</h4>
      <div className="filter d-flex justify-content-between align-items-center mb-5 col-12 col-sm-10 col-lg-7">
        <div className="reviews-count">
          <p className="mb-0">{filteredComments().length} Reviews</p>
        </div>
        <select
          className="offset-1"
          value={currentFilter}
          onChange={handleFilterChange}
        >
          <option value="recent">Most Recent</option>
          <option value="top-rated">Top Rated</option>
        </select>
      </div>
      <div className="users-comments col-12 col-sm-10 col-lg-7">
        {paginatedComments.length > 0 ? (
          paginatedComments.map((comment) => (
            <div key={comment.id} className="user-comment mb-3">
              <div className="user d-flex justify-content-between flex-column flex-sm-row">
                <p className="user-name text-sec mb-2">
                  {`${comment.user.first_name} ${comment.user.last_name}`}
                </p>
                {comment.user.rate && (
                  <StarRating
                    readOnly={true}
                    initialRating={Number(comment.user.rate)}
                    size={25}
                  />
                )}
              </div>
              <p className="comment-date text-main mb-1">
                {formatDate(comment.created_at)}
              </p>
              <p className="comment text-color">{comment.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-center fw-bold text-color">
            No Reviews For This Branch
          </p>
        )}
      </div>
      {filteredComments().length > commentsPerPage && (
        <Pagination className="mt-4">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          <Pagination.Item active>{currentPage}</Pagination.Item>
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      )}
    </article>
  );
};

export default Comments;
