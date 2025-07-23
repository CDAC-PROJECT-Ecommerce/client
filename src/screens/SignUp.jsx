<<<<<<< HEAD
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../scss/signup.scss";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { registerUser } from "../store/slice/UserSlice";

const SignUp = () => {
  const dispatch = useDispatch();

  // Form values
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Validation errors
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // Validation logic
  const validate = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (validate()) {
      const userData = { username, email, password };
      const { meta } = await dispatch(registerUser(userData));
      if (meta.requestStatus === "fulfilled") {
        navigate("/");
      } else {
        toast.error("Something went wrong");
      }
    } else {
      toast.error("Please enter valid data");
    }
  };

=======
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
>>>>>>> 7790dde (Admin Panel)
  return (
    <div className="sign-up-contianer">
      <div id="sign-up-details">
        <h3>Please fill your details</h3>
        <p>To order products online seamlessly</p>
<<<<<<< HEAD
=======
        {/* Image inserted in background */}
>>>>>>> 7790dde (Admin Panel)
      </div>

      <div className="sign-up-box">
        <p>Sign Up</p>
<<<<<<< HEAD

        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={username}
            className={errors.username ? "error-input" : ""}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            className={errors.email ? "error-input" : ""}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
          {errors.email && <small className="error">{errors.email}</small>}
=======
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" on autoComplete="off" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" autoComplete="off" />
>>>>>>> 7790dde (Admin Panel)
        </div>

        <div>
          <label htmlFor="password">Password</label>
<<<<<<< HEAD
          <input
            type="password"
            name="password"
            value={password}
            className={errors.password ? "error-input" : ""}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
          {errors.password && (
            <small className="error">{errors.password}</small>
          )}
        </div>

        <div className="feature-box">
          <label>
            Already Registered? <Link to="/signin">Sign In</Link>
          </label>
        </div>
        <div className="btn-container">
          {" "}
          <button onClick={handleSignUp}>SIGN UP</button>
        </div>
=======
          <input type="password" name="password" autoComplete="off" />
        </div>

        <div className="feature-box">
          <label>Already Registered?</label>
          <Link to="/signin">Sign In</Link>
        </div>
        <button>SIGN UP</button>
>>>>>>> 7790dde (Admin Panel)
      </div>
    </div>
  );
};

export default SignUp;
