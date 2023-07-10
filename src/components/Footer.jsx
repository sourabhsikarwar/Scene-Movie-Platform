import React from "react";
import logo from "../assets/image/slide.webp";
import "../assets/style/Footer.css";

const Footer = () => {
  return (
    <>
      <footer className="footer ">
        <div className="container">
          <div className="row">
            <div className="col-md wrap">
              <div className="box">
                <img
                  src={logo}
                  alt="LOGO"
                />
              </div>
              <div className="content-box">
                <div className="footer-col">
                  <h4>Quick Links</h4>
                  <ul>
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <a href="/about">About</a>
                    </li>
                    <li>
                      <a href="/recommend">For You</a>
                    </li>
                    <li>
                      <a href="/profile">Profile</a>
                    </li>
                    <li>
                      <a href="/favourite">TV Shows</a>
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
                    <a href="#">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/sourabhsikarwar/">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="https://github.com/sourabhsikarwar/Scene-Movie-Platform">
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
