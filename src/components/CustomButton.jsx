import PropTypes from "prop-types";

const CustomButton = ({ text, icon, color, onClick, type="button" }) => {
  const buttonStyle = {
     backgroundColor: color,
     borderRadius: "10px",
     padding: "10px",
  }
  return (
    <button
      type={type}
      onClick={onClick}
      style={buttonStyle}
      className="hover:opacity-90 opacity-100"
    >
      <div className="flex justify-center gap-2 items-center px-2">
        {icon !== undefined ? <span className="text-xs text-white">{icon}</span> : ""}
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
  type: PropTypes.string,
};

export default CustomButton;
