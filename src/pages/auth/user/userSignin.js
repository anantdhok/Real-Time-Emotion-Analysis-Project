import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signinUser } from "../../../store/actions/authActions";
import "./Auth.css";

function Signin(props) {
  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/home");
    }
  }, [props]);

  let emailRef = React.createRef();
  let passRef = React.createRef();

  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  const [data, setData] = useState({ email: "", password: "" });
  const change = () => {
    setData({
      email: emailRef.current.value,
      password: passRef.current.value,
    });
  };

  const signinDone = (e) => {
    props.signinAction(data);
    e.preventDefault();
  };

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

          <form className="auth-form" id="signin-form" onSubmit={signinDone}>
            <div className="input-error">
              {Object.keys(props.errors).length === 0 ? null : props.errors.errors.map((item) => <p>{item}</p>)}
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
                type={show ? "text" : "password"}
                name="password"
                ref={passRef}
                value={data.password}
                onChange={change}
                placeholder=" "
                minLength="8"
                maxLength="16"
                style={{ letterSpacing: show ? "0" : "5px" }}
                required
              />
              <p onClick={toggleShow}>{show ? "Hide" : "Show"}</p>
              <label htmlFor="password">Enter Password </label>
            </div>

            <div className="help">
              Forgotten Password, <a href="/help">Need help?</a>
            </div>
            <div className="privacy">
              Read our&nbsp;
              <a href="/privacy" className="link">
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

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    errors: state.errors,
  };
};
const mapDispatchToProps = {
  signinAction: signinUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(Signin);
