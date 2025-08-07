import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyOrderList = (props) => {
  const { totalAmount, orderDate, status, items, address, orderId } = props.value;
  const navigate = useNavigate();

  // Navigation function for review button
  const handleCreateReview = (productId, orderId) => {
    navigate(`/create-review?productId=${productId}&orderId=${orderId}`);
  };

  console.log(items);
  return (
    <div className="my-order-list">
      <div>
        <p>
          Order date:{" "}
          <span>{orderDate.split("T")[0].split("-").reverse().join("-")}</span>
        </p>
        <div className="payment-status">
          <p>
            Order Status: <span>{status}</span>
          </p>
        </div>
      </div>
      <div className="my-orders-product">
        <p>Order items: </p>
        {items?.map((item) => {
          return (
            <div key={item.id} className="my-order-product-list">
              <div className="product-info">
                <p>{item.productName}</p>
                <span>x{item.quantity}</span>
              </div>
              {/* ADD REVIEW BUTTON HERE */}
              <div className="product-actions">
                <button
                  onClick={() => handleCreateReview(item.productId, orderId)}
                  disabled={status !== 'DELIVERED'}
                  className={`create-review-btn ${status !== 'DELIVERED' ? 'disabled' : ''}`}
                >
                  {status === 'DELIVERED' ? 'Create Review' : 'Review Unavailable'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <p>
        Total price: <span>{totalAmount}</span>
      </p>
      <div className="shipped-address">
        <p>Shipped address:</p>
        <span>
          {address.name}, {address.address},{address.city},{address.state},
          {address.pincode},{address.phone}
        </span>
      </div>
    </div>
  );
};

export default MyOrderList;