import logowhite from "/logowhite.svg";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="footer" id="socials">
      <div className="content">
        <div className="footer-content">
          {/* Logo */}
          <div className="logo">
            <img src={logowhite} alt="logo" />
          </div>

          {/* Social Links - Now Centered */}
          <div className="social">
            <p>Find Us On Social Media:</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Empty div for flex spacing */}
          <div className="logo invisible"></div>
        </div>

        {/* Copyright */}
        <div className="copyright">Copyright © 2025</div>
      </div>
    </footer>
  );
};

export default Footer;
