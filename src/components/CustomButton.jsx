import PropTypes from "prop-types";

const CustomButton = ({ text, icon, color, onClick }) => {
  const buttonStyle = {
     backgroundColor: color,
     borderRadius: "10px",
     padding: "10px",
  }
  return (
    <button
      onClick={onClick}
      style={buttonStyle}
      className="hover:opacity-100 opacity-80"
    >
      <div className="flex gap-2 items-center px-2">
        <span className="text-xs text-white">{icon}</span>
        <span className="text-white font-bold whitespace-nowrap">{text}</span>
      </div>
    </button>
  );
};

CustomButton.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.any,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

export default CustomButton;
