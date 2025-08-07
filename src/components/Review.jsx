import "../scss/starreview.scss";
import "../scss/review.scss";
import StarRating from "./StarRating";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviewByProductId } from "../store/slice/ReviewSlice";

const Review = ({ id }) => {
  const dispatch = useDispatch();
  const { productReview } = useSelector((state) => state.review);
  useEffect(() => {
    dispatch(fetchReviewByProductId(id));
  }, []);
  return (
    <div className="review-contaienr">
      <h2>Reviews</h2>

      <div className="reviews-display"></div>
      <div className="reviews-list">
        {productReview?.length === 0 && <p>No review to display</p>}
        {productReview?.map((review) => {
          return (
            <div className="review-box">
              <p>{review?.customerName}</p>
              <StarRating rating={review.rating} />
              <p>{review.reviewTitle}</p>
              <p>{review.reviewText}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Review;
