import "../scss/starreview.scss";
import "../scss/review.scss";
import StarRating from "./StarRating";

const Review = () => {
  return (
    <div className="review-contaienr">
      <h2>Reviews</h2>

      <div className="reviews-display"></div>
      <div className="reviews-list">
        {/* Component individual */}

        <div className="review-box">
          <p>Username</p>
          <StarRating rating={4} />

          <p>Review title</p>
          <p>Review details</p>
        </div>
        <div className="review-box">
          <p>Username</p>
          <StarRating rating={4} />

          <p>Review title</p>
          <p>Review details</p>
        </div>
        <div className="review-box">
          <p>Username</p>
          <StarRating rating={4} />

          <p>Review title</p>
          <p>Review details</p>
        </div>
        <div className="review-box">
          <p>Username</p>
          <StarRating rating={4} />

          <p>Review title</p>
          <p>Review details</p>
        </div>
      </div>
    </div>
  );
};

export default Review;
