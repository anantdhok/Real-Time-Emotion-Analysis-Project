import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./Auth.css";

function Signin() {
  /*mySubmitHandler = (event) => {
    const auth = this.context;
    event.preventDefault();

    Axios.post("/user/login", this.state.user)
      .then((response) => {
        this.setState((pre) => ({
          isloading: false,
        }));
        this.props.history.push("/");
        auth.login(response.data.userId, response.data.token);
        return Axios.get("/profile/viewprofile");
      })
      .then((data) => {
        let profile = data.data.profile.username;
        localStorage.setItem(
          "profileData",
          JSON.stringify({
            username: profile,
          })
        );
      })
      .catch((e) => {
        this.setState({
          isloading: false,
          error: {
            ...this.state.error,
            message: e.response.data.message,
            code: e.response.status,
          },
        });
      });
  };*/

  return (
    <>
      <div className="auth">
        <div className="container auth-container">
          <span className="auth-content">
            <h1>
              Sign In
              <br /> to your Account!
            </h1>
            <p>
              Sign in to your existing account with your credentials, or if you are new at us please create an account.
            </p>
          </span>

          <form className="auth-form">
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
              Read our{" "}
              <a href="#" className="link">
                terms of services and privacy policies.
              </a>
            </div>

            <div className="submits">
              <button style={{ marginRight: "15px" }} type="submit" className="button-dark solid">
                Sign In
              </button>

              <Link to="/signup">
                <button type="button" className="button-dark">
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

function Signup() {
  let firstRef = React.createRef();
  let lastRef = React.createRef();
  let dobRef = React.createRef();
  let genderRef = React.createRef();
  let emailRef = React.createRef();
  let passRef = React.createRef();

  const [data, setData] = useState({ first: "", last: "", dob: "", gender: "", email: "", password: "" });
  const change = () => {
    setData({
      first: firstRef.current.value,
      last: lastRef.current.value,
      dob: dobRef.current.value,
      gender: genderRef.current.value,
      email: emailRef.current.value,
      password: passRef.current.value,
    });
  };

  const signupDone = (e) => {
    Axios.post("http://localhost:8000/api/auth/signup", data)
      .then((response) => {
        console.log(response);
        window.location.replace("/signin");
      })
      .catch((err) => {
        console.log(err);
      });
    e.preventDefault();
  };

  return (
    <>
      <div className="auth">
        <div className="container auth-container">
          <span className="auth-content">
            <h1>
              1 Minute
              <br /> Registration
            </h1>
            <p>
              Sign up to get started with us, fill the form with appropriate information to complete your registration.
            </p>
          </span>

          <form className="auth-form" id="signup-form" onSubmit={signupDone}>
            <div className="input-field">
              <input type="text" name="fname" ref={firstRef} value={data.first} onChange={change} required />
              <label htmlFor="name">First Name </label>
            </div>

            <div className="input-field">
              <input type="text" name="lname" ref={lastRef} value={data.last} onChange={change} required />
              <label htmlFor="name">Last Name </label>
            </div>

            <div className="input-field">
              <input type="date" name="dob" ref={dobRef} value={data.dob} onChange={change} required />
              <label htmlFor="date">Date of Birth </label>
            </div>

            <div className="input-field">
              <select name="gender" ref={genderRef} value={data.gender} onChange={change} required>
                <option style={{ display: "none" }}></option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="T">Other</option>
                <option value="NA">Prefer not to share</option>
              </select>
              <label htmlFor="gender">I am </label>
            </div>

            <div className="input-field">
              <input
                type="email"
                name="email"
                ref={emailRef}
                value={data.email}
                onChange={change}
                placeholder=" "
                required
              />
              <label htmlFor="email">Write Email </label>
            </div>

            <div className="input-field">
              <input
                type="password"
                name="password"
                ref={passRef}
                value={data.password}
                onChange={change}
                placeholder=" "
                minLength="8"
                maxLength="16"
                required
              />
              <label htmlFor="password">Create Password </label>
            </div>

            <div className="privacy">
              By proceeding you will acknowledge our{" "}
              <a href="#" className="link">
                terms of services and privacy policies.
              </a>
            </div>

            <div className="submits">
              <button style={{ marginRight: "15px" }} type="submit" className="button-dark solid">
                Sign Up
              </button>

              <Link to="/signin">
                <button type="button" className="button-dark">
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

export { Signin, Signup };
