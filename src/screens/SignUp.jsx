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

  return (
    <div className="sign-up-contianer">
      <div id="sign-up-details">
        <h3>Please fill your details</h3>
        <p>To order products online seamlessly</p>
      </div>

      <div className="sign-up-box">
        <p>Sign Up</p>

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
        </div>

        <div>
          <label htmlFor="password">Password</label>
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
      </div>
    </div>
  );
};

export default SignUp;
