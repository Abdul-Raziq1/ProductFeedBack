import { useContext, forwardRef } from "react";
import PropTypes from "prop-types";
import { FeedbackContext } from "../context/FeedbackContext";
import FilterOptions from "./FilterOptions";
import RoadmapStats from "./RoadmapStats";

// eslint-disable-next-line react/display-name
const SideBar = forwardRef(({ showSideBar }, ref) => {
  const { setFilterBy, selected, updateStatus } = useContext(FeedbackContext);
  return (
    <div
      ref={ref}
      className={`tablet:hidden absolute top-0 right-0 h-full z-10 p-4 bg-grayTheme flex flex-col gap-6 ${
        showSideBar ? "translate-x-0" : "translate-x-full"
      } ease-in-out duration-300`}
    >
      <FilterOptions selected={selected} setFilterBy={setFilterBy} />
      <RoadmapStats updateStatus={updateStatus} />
    </div>
  );
});

SideBar.propTypes = {
  showSideBar: PropTypes.bool,
};
export default SideBar;
