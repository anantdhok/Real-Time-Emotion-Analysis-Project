import React, { useState } from "react";
import { Link } from "react-router-dom";
import Backdrop from "./backdrop/Backdrop";
import MainHeader from "./header/Header";
import NavLinks from "./navLinks/NavLinks";
import SideDrawer from "./sideDrawer/SideDrawer";
import { AiOutlineMenu } from "react-icons/ai";
import "./Navigation.css";

const Navigation = (props) => {
  const [drawer, setDrawer] = useState(false);
  const toggleDrawer = () => setDrawer(!drawer);

  let attachedClasses = ["SideDrawer", "Close"];
  if (drawer) attachedClasses = ["SideDrawer", "Open"];

  return (
    <>
      <div className="navigation container">
        {drawer && <Backdrop onClick={toggleDrawer} />}

        <div className={attachedClasses.join(" ")}>
          <SideDrawer open={drawer} closed={toggleDrawer}>
            <nav className="navigation-drawer">
              <img src="/media/images/Welcome.png" alt="logo" />
              <div className="mobile">
                <NavLinks />
              </div>
            </nav>
          </SideDrawer>
        </div>

        <MainHeader>
          <AiOutlineMenu className="navigation-icon" onClick={toggleDrawer} />
          <h1 className="navigation-title">
            <Link to="/">RTEA</Link>
          </h1>
          <nav className="navigation-links">
            <NavLinks />
          </nav>
        </MainHeader>
      </div>
    </>
  );
};

export default Navigation;
