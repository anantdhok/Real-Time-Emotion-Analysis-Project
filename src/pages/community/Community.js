import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../../components/navigation/Navigation";
import { Footer } from "../../components/footer/Footer";
import "./Community.css";

export default function Community() {
  return (
    <>
      <Navigation />
      <div className="container">
        <div className="row community">
          <h1>Join the Community</h1>
          <p>
            Duis eget purus posuere, rhoncus felis feugiat, porta neque. Sed ultricies pellentesque tortor in
            pellentesque. Nam eu tortor a mi eleifend euismod. Morbi elit urna, suscipit quis auctor a, sodales ac est.
            Nullam vitae nisl sapien. Sed id vestibulum lacus, at aliquet velit. Vestibulum nec arcu egestas magna
            molestie sodales in sed est. Pellentesque vitae rhoncus ante. Donec a ligula blandit, blandit quam a,
            ullamcorper risus.
            <br />
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin facilisis ultricies eleifend. Nunc tellus
            leo, dignissim a elit vitae, consectetur tincidunt ipsum. Duis scelerisque ipsum et enim molestie, nec
            malesuada dui scelerisque. Maecenas tempus velit eu eros tempor gravida. Aliquam erat volutpat. Morbi quis
            rutrum nulla.
          </p>

          <div className="community-submits">
            <Link to="/community-signin">
              <button style={{ marginRight: "15px" }} type="submit" className="button-dark solid">
                I have my account
              </button>
            </Link>

            <Link to="/community-signup">
              <button type="button" className="button-dark">
                I want a professional account
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
