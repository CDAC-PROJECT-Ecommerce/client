import React from "react";
import { Link } from "react-router-dom";
import "../scss/signup.scss";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const loginUser = async () => {
    const data = { username, password };
    dispatch(loginUser(data));
  };
  return (
    <div className="sign-up-contianer">
      <div id="sign-up-details">
        <h3>Please fill your details</h3>
        <p>To order products online seamlessly</p>
        {/* Image inserted in background */}
      </div>

      <div className="sign-up-box">
        <p>Sign Up</p>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" on autoComplete="off" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" autoComplete="off" />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" autoComplete="off" />
        </div>

        <div className="feature-box">
          <label>Already Registered?</label>
          <Link to="/signin">Sign In</Link>
        </div>
        <button>SIGN UP</button>
      </div>
    </div>
  );
};

export default SignUp;
