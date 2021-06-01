import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signupUser } from "../../../store/actions/authActions";
import "./Auth.css";

function Signup(props) {
  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/home");
    }
  }, [props.history, props.auth]);

  let firstRef = React.createRef();
  let lastRef = React.createRef();
  let dobRef = React.createRef();
  let genderRef = React.createRef();
  let emailRef = React.createRef();
  let passRef = React.createRef();

  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
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
    props.signupAction(data);
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
              <input
                type="text"
                name="fname"
                ref={firstRef}
                value={data.first}
                onChange={change}
                placeholder=" "
                required
              />
              <label htmlFor="name">First Name </label>
            </div>

            <div className="input-field">
              <input
                type="text"
                name="lname"
                ref={lastRef}
                value={data.last}
                onChange={change}
                placeholder=" "
                required
              />
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
                style={{ letterSpacing: "5px" }}
                required
              />
              <p onClick={toggleShow}>{show ? "Hide" : "Show"}</p>
              <label htmlFor="password">Create Password </label>
            </div>

            <div className="privacy">
              By proceeding you will acknowledge our&nbsp;
              <a href="/privacy" className="link">
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

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    errors: state.errors,
  };
};
const mapDispatchToProps = {
  signupAction: signupUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
