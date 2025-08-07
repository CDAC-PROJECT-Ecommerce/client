import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../store/slice/UserProfile";
import { logout } from "../../store/slice/UserSlice";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

const ProfilePage = ({ isSidebarOpen, handleProfile }) => {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const profile = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOrders = () => {
    navigate("/myOrders");
    dispatch(handleProfile());
  };

  const handleCart = () => {
    navigate("/cart");
    dispatch(handleProfile());
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    dispatch(handleProfile());
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);

  return (
    <>
      {/* <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
        ☰ Profile
      </button> */}

      <div className={`profile-page ${isSidebarOpen ? "open" : ""}`}>
        <div className="profile-container">
          <div className="nav-links">
            <div className="profile-top">
              <h2>{profile?.UserData?.fullName || "User"}</h2>
            </div>
            <button onClick={handleCart}>My Cart</button>
            <button onClick={handleOrders}>My Orders</button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
