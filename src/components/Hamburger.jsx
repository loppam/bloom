import PropTypes from "prop-types";

const Hamburger = ({ isOpen, toggle }) => {
  return (
    <button
      className={`hamburger ${isOpen ? "open" : ""}`}
      onClick={toggle}
      aria-label="Toggle menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

Hamburger.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default Hamburger;
