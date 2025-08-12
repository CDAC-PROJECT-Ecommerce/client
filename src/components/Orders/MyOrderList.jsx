import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MyOrderList = (props) => {
  const { totalAmount, orderDate, status, items, address, orderId } =
    props.value;
  const navigate = useNavigate();

  const handleCreateReview = (productId, orderId) => {
    if (!productId || !orderId) {
      console.error("Missing productId or orderId:", { productId, orderId });
      toast.error(
        "Unable to create review: Missing product or order information"
      );
      return;
    }

    navigate(`/create-review?productId=${productId}&orderId=${orderId}`);
  };

  const canReviewStatuses = ["PLACED", "SHIPPED", "DELIVERED"];

  const canCreateReview = (orderStatus) => {
    return canReviewStatuses.includes(orderStatus);
  };

  const getReviewButtonProps = (orderStatus) => {
    if (canCreateReview(orderStatus)) {
      return {
        text: "Create Review",
        disabled: false,
        className: "create-review-btn",
      };
    } else {
      return {
        text: "Review Unavailable",
        disabled: true,
        className: "create-review-btn disabled",
      };
    }
  };

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
        <p>Order items:</p>
        {items?.map((item, index) => {
          const buttonProps = getReviewButtonProps(status);

          return (
            <div
              key={`${item.productId}-${orderId}-${index}`}
              className="my-order-product-list"
            >
              <div className="product-info">
                <p>{item.productName}</p>
                <span>x{item.quantity}</span>
              </div>
              <div className="product-actions">
                <button
                  onClick={() => handleCreateReview(item.productId, orderId)}
                  disabled={buttonProps.disabled}
                  className={buttonProps.className}
                  title={
                    buttonProps.disabled
                      ? `Reviews are only available for ${canReviewStatuses.join(
                          ", "
                        )} orders`
                      : "Click to create a review"
                  }
                >
                  {buttonProps.text}
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
          {address.name}, {address.address}, {address.city}, {address.state},{" "}
          {address.pincode}, {address.phone}
        </span>
      </div>
    </div>
  );
};

export default MyOrderList;
