import React from "react";
import { FiGithub } from "react-icons/fi";
import { SiMedium } from "react-icons/si";
import "./Footer.css";

function Footer() {
  return (
    <>
      <footer>
        <h5 className="copyright"> © Copyrights reserved by Project Authors</h5>
      </footer>
    </>
  );
}

function FooterSources() {
  return (
    <>
      <footer>
        <div className="footer container">
          <a href="https://github.com/anantdhok/" target="_blank" rel="noreferrer" className="footer-button github">
            <FiGithub className="icon" />
            <span>Open Project on GitHub</span>
          </a>

          <a href="https://medium.com/@anantdhok/" target="_blank" rel="noreferrer" className="footer-button medium">
            <SiMedium className="icon" />
            <span>Read about this Project on MEDIUM</span>
          </a>

          <a href="https://drive.google.com/" target="_blank" rel="noreferrer" className="footer-link">
            Download research paper of this project.
          </a>
        </div>

        <h5 className="copyright"> © Copyrights reserved by Project Authors</h5>
      </footer>
    </>
  );
}

export { Footer, FooterSources };
