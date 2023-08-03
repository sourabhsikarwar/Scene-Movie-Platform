import React from "react";
import logo from "../assets/image/slide.webp";
import "../assets/style/Footer.css";

const Footer = () => {
  return (
    <>
      <footer className="footer pt-16">
        <div className="container">
          <div className="row">
            <div className="col-md wrap">
              <div className="box">
                <img
                  src={logo}
                  alt="LOGO"
                  aria-label="footer logo"
                />
              </div>
              <div className="content-box">
                <div className="footer-col">
                  <h4>Quick Links</h4>
                  <ul>
                    <li>
                      <a href="/" aria-label="Go to home page">Home</a>
                    </li>
                    <li>
                      <a href="/about" aria-label="Go to about page">About</a>
                    </li>
                    <li>
                      <a href="/recommend" aria-label="Go to recommendation page">For You</a>
                    </li>
                    <li>
                      <a href="/profile" aria-label="Go to your profile page">Profile</a>
                    </li>
                  </ul>
                </div>
                <div className="footer-col">
                  <h4>Need help?</h4>
                  <ul>
                    <li>
                      <a href="#">Visit Help Center</a>
                    </li>
                    <li>
                      <a href="#">Share Feedback</a>
                    </li>
                  </ul>
                </div>
                <div className="footer-col">
                  <h4>Community</h4>
                  <div className="social-links">
                    <a href="#" aria-label="Follow me on Facebook"
                      title="Facebook (External Link)"
                      rel="noopener noreferrer"
                      target="_blank">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" aria-label="Follow me on Twitter"
                      title="Twitter (External Link)"
                      rel="noopener noreferrer"
                      target="_blank">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" aria-label="Follow me on Instagram"
                      title="Instagram (External Link)"
                      rel="noopener noreferrer"
                      target="_blank">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/sourabhsikarwar/" aria-label="Follow me on Linkedin"
                      title="Linkedin (External Link)"
                      rel="noopener noreferrer"
                      target="_blank">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="https://github.com/sourabhsikarwar/Scene-Movie-Platform" aria-label="Follow me on Github"
                      title="Github (External Link)"
                      rel="noopener noreferrer"
                      target="_blank">
                      <i className="fab fa-github"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
