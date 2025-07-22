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
        <p>Shop efficiently on</p>
        <p>Shopee</p>
        {/* Image inserted in background */}
      </div>

      <div className="sign-in-box">
        <p style={{ marginBottom: "1rem" }}>Sign In</p>
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
          <Link to="/forgot_password">Forgot password?</Link>
        </div>
        <div className="btn-container">
          <button onClick={signInUser}>SIGN IN</button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
