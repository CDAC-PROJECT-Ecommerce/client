import React, { useEffect, useState } from "react";
import ProfileForm from "./ProfileForm";
import "./ProfilePage.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../store/slice/UserProfile";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slice/UserSlice";

const ProfilePage = () => {
  const [isEdit, setIsEdit] = useState(false);
  const profile = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);
  return (
    <div className="profile-page">
      <h1>My Profile</h1>
      <div className="profile-contianer">
        <div className="nav-links">
          <div className="profile-top">
            <img src="menclothing.jpg" alt="profile" />
            <h2>{profile?.name}</h2>
          </div>
          <button className="edit-btn" onClick={() => setIsEdit(!isEdit)}>
            Edit Profile
          </button>
          <button onClick={() => navigate("/cart")}>My Cart</button>
          <button onClick={() => navigate("/myOrders")}>My Orders</button>
          <button className="logout-btn" onClick={() => dispatch(logout())}>
            Logout
          </button>
        </div>
        <ProfileForm isEdit={isEdit} />
      </div>
    </div>
  );
};

export default ProfilePage;
