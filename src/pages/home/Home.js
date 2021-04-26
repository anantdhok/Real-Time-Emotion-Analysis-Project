import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "../../components/navigation/Navigation";
import { Footer } from "../../components/footer/Footer";
import "./Home.css";

export default function Home() {
  let user = { license: "123", name: "Anant" };

  const [time, setTime] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    var timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

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
            <p className="home-content-alerts" style={user.license ? { color: "blue" } : { color: "gray" }}>
              {user.license ? "Community Account" : "User Account"}
            </p>
            <h3>
              {time} <br />
              {timeZone()}, {user.name}!
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
}
