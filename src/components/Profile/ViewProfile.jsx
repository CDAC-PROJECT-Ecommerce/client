
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./ProfileForm.css";

const ViewProfile = () => {
    const profile = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();

  return (
    <div className="div-of-page">
      <div className="nav-links">
        <div className="profile-top">
          <img src="menclothing.jpg" alt="profile" />
          <h2>{profile?.name}</h2>
        </div>
        <button className="edit-btn" onClick={() => navigate("/edit_profile")}>Edit Profile</button>
        <button>My Cart</button>
        <button>My Orders</button>
        <button className="logout-btn" onClick={() => dispatch(logout())}>
          Logout
        </button>
      </div>

      <div className="profile-form">
        <div className="form-section">
          <label>Full Name</label>
          <p className="readonly">{profile?.name}</p>

          <label>Email</label>
          <p className="readonly">{profile?.email}</p>

          <label>Mobile Number</label>
          <p className="readonly">{profile?.mobile}</p>

          <label>Password</label>
          <p className="readonly">********</p>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
