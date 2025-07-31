import { useSelector, useDispatch } from "react-redux";
import {
  updateProfile,
  changePassword,
  logout,
} from "../../store/slice/UserSlice";
import "./ProfileForm.css";

const ProfileForm = () => {
  const profile = useSelector((state) => state.users);
  const dispatch = useDispatch();

  // const [formData, setFormData] = useState({
  //   name: profile?.name,
  //   email: profile?.email,
  //   mobile: profile?.mobile,
  //   password: '',
  // });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    dispatch(updateProfile(formData));
    if (formData.password) dispatch(changePassword(formData.password));
    setFormData({ ...formData, password: "" });
  };

  return (
    <>
      <div className="div-of-page">
        <div className="nav-links">
          <div className="profile-top">
            {/* <img src="https://via.placeholder.com/100" alt="profile" /> */}
            <img src="menclothing.jpg" alt="profile" />
            {/* <h2>{profile?.name}</h2> */}
            <h2>fajhgjhhjglkfl</h2>
          </div>
          <button>My Cart</button>
          <button>My Orders</button>
          <button className="logout-btn" onClick={() => dispatch(logout())}>
            Logout
          </button>
        </div>

        <div className="profile-form">
          <div className="form-section">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder={profile?.name}
              value={profile?.name}
              onChange={handleChange}
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder={profile?.email}
              value={profile?.email}
              onChange={handleChange}
            />

            <label>Mobile Number</label>
            <input
              type="text"
              name="mobile"
              placeholder={profile?.mobile}
              value={profile?.mobile}
              onChange={handleChange}
            />

            <label>Change Password</label>
            <input
              type="password"
              name="password"
              placeholder="New Password"
              value={profile?.password}
              onChange={handleChange}
            />

            <button className="save-btn" onClick={handleUpdate}>
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileForm;
