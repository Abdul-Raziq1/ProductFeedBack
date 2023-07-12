import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const LinkButton = ({ text, icon, color }) => {
  const buttonStyle = {
     backgroundColor: color,
     borderRadius: "10px",
     padding
     : "10px",
  }
  const mapTextToLink = (text) => {
    const links = {
      'Add Feedback': '/addFeedback',
      'Edit Feedback': 'edit',
      'Take me home': '/'
    }
    return links[text]
  }
  return (
    <Link
      to={`${mapTextToLink(text)}`}
      style={buttonStyle}
      className="hover:opacity-100 opacity-90 "
    >
      <div className="flex justify-center gap-1 items-center ">
        {icon !== undefined && <span className="text-xs text-white">{icon}</span>}
        <span className="text-white font-bold whitespace-nowrap">{text}</span>
      </div>
    </Link>
  );
};

LinkButton.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.any,
  color: PropTypes.string,
};

export default LinkButton;
