import "../scss/forgotpassword.scss";

const ForgotPassword = () => {
  return (
    <div className="forgot-password">
      <h2>Forgot Password</h2>
      <div className="password-container">
        <div>
          <label htmlFor="current">Current Password</label>
          <input type="password" name="current" />
        </div>
        <div>
          <label htmlFor="new">New Password</label>
          <input type="text" name="new" />
        </div>
        <button>Change Password</button>
      </div>
    </div>
  );
};

export default ForgotPassword;
