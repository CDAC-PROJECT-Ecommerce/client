import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "../scss/OrderPlaced.scss";
import { useEffect, useState } from "react";

const OrderPlaced = () => {
  const [searchParams] = useSearchParams();
  const { OrderPlaced } = useSelector((state) => state.userOrder);

  const status = searchParams.get("status");

  const [currentCount, setCurrentCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    if (OrderPlaced.length === 0 && currentCount > 0) {
      const timer = setTimeout(() => {
        setCurrentCount((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [currentCount, OrderPlaced]);

  useEffect(() => {
    if (currentCount === 0 && OrderPlaced.length === 0) {
      navigate("/");
    }
  }, [currentCount, OrderPlaced]);

  if (OrderPlaced.length === 0) {
    return (
      <div className="order-summary-container">
        <div className="summary-card">
          <h2>Order Not Found</h2>
          <p>Redirecting to homepage in {currentCount} seconds</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-placed-container">
      <div className="order-placed-box">
        {status === "success" ? (
          <h2>Order placed successfully</h2>
        ) : (
          <h2 style={{ color: "red" }}>Failed to place order</h2>
        )}

        <div className="order-placed-details">
          <div>
            <p>Order ID:</p> ORD00{OrderPlaced?.orderId}
          </div>
          <div>
            <p>Customer Name:</p> {OrderPlaced?.address.name}
          </div>
          <div className="product-details">
            <p>Product Details:</p>
            {OrderPlaced?.items.map((item) => {
              return (
                <div key={item.productId}>
                  <p>{item.productName} </p>
                  <p>x{item.quantity}</p>
                </div>
              );
            })}
          </div>
          <div className="order-price">
            <p>Order price:</p> ₹{OrderPlaced?.totalAmount}
          </div>
          {status === "success" && (
            <>
              <div className="shipping-address">
                <p>Shipping Address:</p>
                <p>
                  {OrderPlaced?.address.name}, {OrderPlaced?.address.address},
                  {OrderPlaced?.address.city},{OrderPlaced?.address.state},
                  {OrderPlaced?.address.pincode},{OrderPlaced?.address.phone}
                </p>
              </div>
              <div className="order-track-box">
                <div>
                  <p>Order Status:</p>
                  <p>{OrderPlaced.status}</p>
                </div>
                <div>
                  <p>Order Date: </p>
                  <p>
                    {OrderPlaced.orderDate
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("-")}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <button onClick={() => navigate("/")}>Continue Shopping</button>
    </div>
  );
};

export default OrderPlaced;
