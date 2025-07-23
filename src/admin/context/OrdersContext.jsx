import React, { createContext, useContext, useEffect, useState } from "react";
import localOrders from "../data/orders.json"; // ✅ direct import

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setOrders(localOrders); // ✅ load directly
    } catch (err) {
      setError("Error loading local orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <OrdersContext.Provider value={{ orders, fetchOrders, loading, error }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);
