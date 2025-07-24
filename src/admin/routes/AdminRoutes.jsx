// src/admin/AdminRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import DashboardSummary from "../pages/dashboardsummary/DashboardSummary";
import ViewAllOrders from "../pages/viewallorders/ViewAllOrders";
import OrderSummary from "../pages/ordersummary/OrderSummary";
import UpdateOrderStatus from "../pages/updateorderstatus/UpdateOrderStatus";
import AddProduct from "../pages/addproduct/AddProduct";
import DeleteOrder from "../pages/deleteorder/DeleteOrder";
import UpdateOrderSelector from "../pages/updateorderstatus/UpdateOrderSelector";
import ViewProduct from "../pages/viewproduct/ViewProduct";
import UpdateProduct from "../pages/updateproduct/UpdateProduct";
import GetId from "../pages/getproductid/GetId";
import AdminLayout from "../layout/AdminLayout";
import { OrdersProvider } from "../context/OrdersContext";

const AdminRoutes = () => {
  return (
    <>
      <OrdersProvider>
        <Routes>
          <Route path="/" element={<AdminLayout />} />
          <Route index element={<Home />} />
          <Route path="dashboard" element={<DashboardSummary />} />
          <Route path="orders" element={<ViewAllOrders />} />
          <Route path="ordersummary/:orderId" element={<OrderSummary />} />
          <Route path="updateorderstatus" element={<UpdateOrderSelector />} />
          <Route
            path="updateorderstatus/:orderId"
            element={<UpdateOrderStatus />}
          />
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="deleteorder" element={<DeleteOrder />} />
          <Route path="viewproduct" element={<ViewProduct />} />
          <Route path="getproductid" element={<GetId />} />
          <Route path="updateproduct/:id" element={<UpdateProduct />} />
        </Routes>
      </OrdersProvider>
    </>
  );
};

export default AdminRoutes;
