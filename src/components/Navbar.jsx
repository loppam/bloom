import { Link } from "react-router-dom";
import logo from "/logoblack.svg";
import { useState, useEffect } from "react";
import Hamburger from "./Hamburger";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; // Approximate navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsMenuOpen(false); // Close menu after clicking
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="content">
        <div className={`nav-content ${isMenuOpen ? "mobile-open" : ""}`}>
          <div className="nav-header">
            <Link to="/" className="logo">
              <img src={logo} alt="Bloom" />
            </Link>
            <Hamburger isOpen={isMenuOpen} toggle={toggleMenu} />
          </div>

          <div className="nav-links">
            <a
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("features");
              }}
            >
              Features
            </a>
            <a
              href="#socials"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("socials");
              }}
            >
              Socials
            </a>
          </div>

          <div className="nav-buttons">
            <Link to="/editor" className="btn btn-outline">
              Use Editor
            </Link>
            <Link to="/generator" className="btn btn-primary">
              Launch app
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
