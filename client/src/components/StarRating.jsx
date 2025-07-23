const StarRating = ({ rating }) => {
  return (
    <div className="review-star-container">
      {[...Array(5)].map((_, index) => (
        <span key={index} className={index < rating ? "filled" : "empty"}>
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
