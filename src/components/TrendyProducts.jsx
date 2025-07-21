import "../scss/trendyproduct.scss";
const TrendyProducts = () => {
  return (
    <div className="trendybox-container">
      <div className="trendybox">
        <img src="/menclothing.jpg" alt="men_clothing" />
        <div className="overlay-content">
          <p className="title">Men's Clothing</p>
          <button>Explore</button>
        </div>
      </div>
      <div className="trendybox">
        <img src="/womenclothing.jpg" alt="men_clothing" />
        <div className="overlay-content">
          <p className="title">Women's Clothing</p>
          <button>Explore</button>
        </div>
      </div>
      <div className="trendybox">
        <img src="/babyclothing.jpg" alt="men_clothing" />
        <div className="overlay-content">
          <p className="title">Baby Clothing</p>
          <button>Explore</button>
        </div>
      </div>
    </div>
  );
};

export default TrendyProducts;
