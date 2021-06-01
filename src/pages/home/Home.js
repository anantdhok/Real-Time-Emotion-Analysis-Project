import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Time from "../../utils/Time";
import Navigation from "../../components/navigation/Navigation";
import { Footer } from "../../components/footer/Footer";
import "./Home.css";

const Home = (props) => {
  useEffect(() => {
    if (!props.auth.isAuthenticated) {
      props.history.push("/signin");
    }
  }, [props]);

  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(props.auth.user.data);
  }, [props.auth.user]);

  const timeZone = () => {
    var n = new Date().getHours();
    if (n >= 5 && n < 11) return "Good Morning";
    if (n >= 11 && n < 17) return "Good Afternoon";
    if (n >= 17) return "Good Evening";
    return "Hello";
  };

  return (
    <>
      <Navigation />
      <div className="container home">
        <div className="row">
          <div className="home-content">
            <p
              className="home-content-alerts"
              style={user.hasOwnProperty("license") ? { color: "blue" } : { color: "gray" }}
            >
              {user.hasOwnProperty("license") ? "Community Account" : "User Account"}
            </p>
            <h3>
              <Time /><br />
              {timeZone()}, {user.first}!
            </h3>
            <p className="home-content-notice">Hope you're good today.</p>
          </div>
        </div>
        <div className="home-options">
          <Link to="/dashboard">
            <button style={{ marginRight: "15px" }} className="button-dark solid">
              Create an instant meet
            </button>
          </Link>
          <button type="button" className="button-dark">
            Schedule a meet
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => {
  console.log("home", state);
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps, null)(Home);
