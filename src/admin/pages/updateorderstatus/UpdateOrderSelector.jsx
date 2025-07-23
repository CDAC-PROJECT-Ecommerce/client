import React from "react";
import OrderIdSelector from "../updateorderstatus/OrderIdSelector";

const UpdateOrderSelector = () => {
  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">✏️ Update an Order</h2>
      <OrderIdSelector />
    </div>
  );
};

export default UpdateOrderSelector;
