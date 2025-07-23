// src/admin/layout/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AppInitializer from "../components/appinitializer/AppInitializer";
import { Provider } from "react-redux";
import { store } from "./../../store/store";

const AdminLayout = () => {
  return (
    <Provider store={store}>
      <div>
        {/* App Initializer can load Redux data / tokens / etc */}
        <AppInitializer />

        {/* Optional: Admin-specific navbar/sidebar here */}
        {/* <AdminSidebar /> */}

        {/* Page content renders here */}
        <main>
          <Outlet />
        </main>
      </div>
    </Provider>
  );
};

export default AdminLayout;
