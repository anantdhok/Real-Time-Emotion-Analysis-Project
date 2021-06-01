import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signoutUser } from "../../../store/actions/authActions";
import "./NavLinks.css";

const NavLinks = (props) => {
  const signoutDone = () => {
    props.signoutAction();
    window.location.href = "./signin";
  };
  return (
    <ul className="nav-links">
      {!props.auth.isAuthenticated ? (
        <>
          <li>
            <Link to="/community">Community</Link>
          </li>
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
          <li>
            <Link to="/signup">
              <button className="button-dark">Get Started</button>
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/patients">Patients</Link>
          </li>
          <li>
            <Link to="/Schedule">Schedule</Link>
          </li>
          <li>
            <Link to="/history">History</Link>
          </li>
          <li>
            <Link onClick={signoutDone}>Logout</Link>
          </li>
        </>
      )}
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
const mapDispatchToProps = {
  signoutAction: signoutUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(NavLinks);
