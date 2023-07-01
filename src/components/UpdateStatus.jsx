import PropTypes from "prop-types";
const UpdateStatus = ({ text, number, color }) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-4">
        <div className={`w-2 h-2 rounded-full ${color}`}></div>
        <span className="text-darkGrayTheme">{text}</span>
      </div>
      <span className="font-semibold text-darkGrayTheme">{number}</span>
    </div>
  );
};

UpdateStatus.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    number: PropTypes.number
}
export default UpdateStatus;
