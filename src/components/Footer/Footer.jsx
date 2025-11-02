// Footer.jsx
import React from "react";
import {
  FaGithub,
  FaEnvelope,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__text">
        جميع الحقوق محفوظة &copy; {currentYear} - المهندس عبد الرحمن السمرة
      </p>

      <div className="footer__section">
        <p className="footer__section-title">صفحات المعهد:</p>
        <div className="footer__icons">
          <a href="https://www.instagram.com/edraaked?igsh=Y24zOGZkcXhhcDY5" target="_blank" rel="noreferrer" title="Instagram">
            <FaInstagram />
          </a>
          <a href="https://www.facebook.com/share/1LFq5TX8p7/" target="_blank" rel="noreferrer" title="Facebook">
            <FaFacebook />
          </a>
        </div>
      </div>
      <div className="footer__section">
        <p className="footer__section-title"> المطور:</p>
        <div className="footer__icons">
          <a href="https://wa.me/0997855951" title="Email">
            {/* mailto:bdalrhmnalsmrt64@gmail.com */}
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
