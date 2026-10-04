import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Column 1 - Contact */}
        <div className="footer-box footer-contact">
          <h2>Contact</h2>

          <p>📍 Tamil Nadu, India</p>
          <p>📧 joelraj@gmail.com</p>
          <p>📞 91XXXXXXXXXX</p>

          <a
            href="https://wa.me/9360102801"
            target="_blank"
            rel="noreferrer"
            className="whatsapp-btn"
          >
            💬 WhatsApp Me
          </a>
        </div>

        {/* Column 2 - About */}
        <div className="footer-box footer-social">
          <h2>About Me</h2>

          

          <div className="social-icons">
            <a href="#">🌐</a>
            <a href="#">🐙</a> {/* GitHub */}
            <a href="#">📸</a> {/* Instagram */}
            <a href="#">💼</a> {/* LinkedIn */}
          </div>
        </div>

        {/* Column 3 - Links */}
        <div className="footer-box footer-links">
          <h2>Quick Links</h2>

          <a href="#home">Home</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        
      </div>

    </footer>
  );
};

export default Footer;