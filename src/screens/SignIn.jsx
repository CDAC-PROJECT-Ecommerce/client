import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../scss/signin.scss";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/slice/UserSlice";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signInUser = async () => {
    const data = { username, password };
    const val = await dispatch(loginUser(data));
    if (val?.payload?.token) {
      navigate("/");
    }
  };

  return (
    <div className="sign-in-contianer">
      <div id="sign-in-details">
        <h3>WELCOME BACK</h3>
<<<<<<< HEAD
        <p>Shop efficiently on</p>
=======
        <p>Manage your shop efficiently on</p>
>>>>>>> 7790dde (Admin Panel)
        <p>Shopee</p>
        {/* Image inserted in background */}
      </div>

      <div className="sign-in-box">
<<<<<<< HEAD
        <p style={{ marginBottom: "1rem" }}>Sign In</p>
=======
        <p>Sign In</p>
>>>>>>> 7790dde (Admin Panel)
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="feature-box">
<<<<<<< HEAD
          <Link to="/forgot_password">Forgot password?</Link>
        </div>
        <div className="btn-container">
          <button onClick={signInUser}>SIGN IN</button>
        </div>
=======
          <div>
            <input type="checkbox" name="rem" />
            <label htmlFor="rem">Remember me</label>
          </div>

          <Link to="/forgot_password">Forgot password</Link>
        </div>
        <button onClick={signInUser}>SIGN IN</button>
>>>>>>> 7790dde (Admin Panel)
      </div>
    </div>
  );
};

export default SignIn;
