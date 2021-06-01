import React from "react";
import { Link } from "react-router-dom";
import "./AuthCommunity.css";

function SigninCommunity() {
  return (
    <>
      <div className="auth-comm">
        <div className="container auth-comm-container">
          <span className="auth-comm-content">
            <h1>
              Sign In
              <br /> to your Account!
            </h1>
            <p>
              Sign in to your existing account with your credentials, or if you are new at us please create an account.
            </p>
          </span>

          <form className="auth-comm-form">
            <div className="input-field">
              <input type="email" name="email" placeholder=" " required />
              <label htmlFor="email">Write Email </label>
            </div>

            <div className="input-field">
              <input type="password" name="password" placeholder=" " minLength="8" maxLength="16" required />
              <label htmlFor="password">Create Password </label>
            </div>

            <div className="help">
              Forgotten Password, <a href="#">Need help?</a>
            </div>
            <div className="privacy">
              Read our <a href="#" className="link">terms of services and privacy policies.</a>
            </div>

            <div className="submits">
              <button style={{ marginRight: "15px" }} type="submit" className="button-light solid">
                Sign In
              </button>

              <Link to="/community-signup">
                <button type="button" className="button-light">
                  Switch to Sign Up
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

function SignupCommunity() {
  return (
    <>
      <div className="auth-comm">
        <div className="container auth-comm-container">
          <span className="auth-comm-content">
            <h1>
              1 Minute
              <br /> Registration
            </h1>
            <p>
              Sign up to get started with us, fill the form with appropriate information to complete your registration.
            </p>
          </span>

          <form className="auth-comm-form">
            <div className="input-field">
              <input type="number" name="license" required />
              <label htmlFor="license">Registration Number </label>
            </div>
            
            <div className="input-field">
              <input type="text" name="fname" required />
              <label htmlFor="name">First Name </label>
            </div>

            <div className="input-field">
              <input type="text" name="lname" required />
              <label htmlFor="name">Last Name </label>
            </div>

            <div className="input-field">
              <input type="date" name="dob" required />
              <label htmlFor="date">Date of Birth </label>
            </div>

            <div className="input-field">
              <select name="gender" required>
                <option style={{ display: "none" }}></option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="T">Other</option>
                <option value="NA">Prefer not to share</option>
              </select>
              <label htmlFor="gender">I am </label>
            </div>

            <div className="input-field">
              <input type="email" name="email" placeholder=" " required />
              <label htmlFor="email">Write Email </label>
            </div>

            <div className="input-field">
              <input type="password" name="password" placeholder=" " minLength="8" maxLength="16" required />
              <label htmlFor="password">Create Password </label>
            </div>

            <div className="privacy">
              By proceeding you will acknowledge our <a href="#" className="link">terms of services and privacy policies.</a>
            </div>

            <div className="submits">
              <button style={{ marginRight: "15px" }} type="submit" className="button-light solid">
                Sign Up
              </button>

              <Link to="/community-signin">
                <button type="button" className="button-light">
                  Switch to Sign In
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export { SigninCommunity, SignupCommunity };
