import PropTypes from "prop-types";
import { IN_PROGRESS, LIVE, PLANNED } from "../data/types";
const UpdateStatus = ({ text, number }) => {
  const mapNameToColor = (name) => {
    const colors = {
      [PLANNED]: 'bg-amber-600',
      [IN_PROGRESS]: 'bg-purpleTheme',
      [LIVE]: 'bg-blueTheme'
    }

    return colors[name]
  }
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-4">
        <div className={`w-2 h-2 rounded-full ${mapNameToColor(text)}`}></div>
        <span className="text-darkGrayTheme">{text}</span>
      </div>
      {number !== undefined && <span className="font-semibold text-darkGrayTheme">{number}</span>}
    </div>
  );
};

UpdateStatus.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    number: PropTypes.number
}
export default UpdateStatus;
