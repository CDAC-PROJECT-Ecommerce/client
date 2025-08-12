import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersByUsername } from "../../store/slice/UserOrderSlice";
import MyOrderList from "./MyOrderList";
import "../../scss/myOrders.scss";
const MyOrders = () => {
  const dispatch = useDispatch();
  const { MyOrders } = useSelector((state) => state.userOrder);
  useEffect(() => {
    dispatch(fetchOrdersByUsername());
  }, []);
  return (
    <div className="my-orders">
      <h1>My Orders</h1>
      <div className="my-orders-container">
        {MyOrders.length === 0 && <h3>No Orders to display</h3>}
        {MyOrders?.map((orders) => (
          <MyOrderList key={orders.orderId} value={orders} />
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
