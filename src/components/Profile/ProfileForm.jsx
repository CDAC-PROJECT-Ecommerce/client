import { useSelector, useDispatch } from "react-redux";
import {
  updateProfile,
  changePassword,
  logout,
} from "../../store/slice/UserSlice";
import "./ProfileForm.css";

const ProfileForm = ({ isEdit }) => {
  const { UserData } = useSelector((state) => state.userProfile);
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
        {isEdit ? (
          <div className="profile-form">
            <div className="form-section">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder={UserData?.fullName}
                value={UserData?.fullName}
                onChange={handleChange}
              />

              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder={UserData?.email}
                value={UserData?.email}
                disabled={true}
                onChange={handleChange}
              />

              <label>Mobile Number</label>
              <input
                type="Number"
                name="mobile"
                placeholder={UserData?.mobile}
                value={UserData?.mobile}
                onChange={handleChange}
              />

              <button className="save-btn" onClick={handleUpdate}>
                Update Profile
              </button>
            </div>
          </div>
        ) : (
          <div className="profile-details">
            <div className="form-section">
              <label>Full Name</label>
              <p className="readonly">{UserData?.fullName}</p>

              <label>Email</label>
              <p className="readonly">{UserData?.email}</p>

              {UserData?.mobile && (
                <>
                  <label>Mobile Number</label>
                  <p className="readonly">{UserData?.mobile}</p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileForm;
