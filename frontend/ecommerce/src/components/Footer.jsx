import React from "react";
import "../App.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <h2 className="footer-logo">ShopVerse</h2>

        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} ShopVerse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
