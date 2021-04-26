import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/auth-context";
import "./NavLinks.css";
import { useHistory } from "react-router-dom";

const NavLinks = (props) => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  function onLogout() {
    console.log(history);
    auth.logout();
    history.push("/auth");
  }
  return (
    <ul className="nav-links">
      <li>
        <Link to="/community" exact>
          Community
        </Link>
      </li>

      <li>
        <Link to="/signin" exact>
          Sign In
        </Link>
      </li>

      {auth.isLoggedIn && (
        <div>
          <li>
            <Link to="/profile">Patients</Link>
          </li>
          <li>
            <Link to="/mypost">Schedule</Link>
          </li>
          <li>
            <Link to="/mypost">History</Link>
          </li>
          <li>
            <Link to="/">
              <b>Logout</b>
            </Link>
          </li>
        </div>
      )}

      {!auth.isLoggedIn && (
        <li>
          <Link to="/signup">
            <button className="button-dark">Get Started</button>
          </Link>
        </li>
      )}

      {auth.isLoggedIn && (
        <li>
          <button onClick={onLogout}>Logout</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
