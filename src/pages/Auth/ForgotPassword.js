import React, { useState } from "react";
import AuthImage from "../../assets/images/auth.png";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handleResetPassword() {
    // TODO: Implement reset password logic
  }

  return (
    <div className="container">
      <div id="auth">
        <div className="auth__container">
          <div className="container__image">
                <img src={AuthImage} alt="img" />
          </div>
          <div className="container__text">
            <form>
              <h2 className="intro">Forgot your password?</h2>
              <div className="textInput">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <button
                type="button"
                className="primary"
                onClick={handleResetPassword}
              >
                Reset Password
              </button>
              <p className="redirect">
                <span>Remembered your password?</span>
                <a href="/login">Log In</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
