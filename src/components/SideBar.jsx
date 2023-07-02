import { useContext } from "react";
import Category from "./Category";
import PropTypes from "prop-types";
import { FeedbackContext } from "../context/FeedbackContext";
import UpdateStatus from "./UpdateStatus";

const SideBar = ({ showSideBar }) => {
  const { setFilterBy, selected, updateStatus } = useContext(FeedbackContext);
  const categoryHandler = (category) => {
    setFilterBy(category);
  };
  return (
    <div
      className={`absolute top-0 right-0 h-full z-10 p-4 bg-grayTheme flex flex-col gap-6 ${
        showSideBar ? "translate-x-0" : "translate-x-full"
      } ease-in-out duration-300`}
    >
      <div className="flex flex-col bg-white rounded-xl">
        <div className="flex flex-col p-7 pb-10 gap-4">
          <div className="flex gap-4">
            <Category
              selected={selected}
              onClick={categoryHandler}
              category={"All"}
            />
            <Category
              selected={selected}
              onClick={categoryHandler}
              category={"UI"}
            />
            <Category
              selected={selected}
              onClick={categoryHandler}
              category={"UX"}
            />
          </div>
          <div className="flex gap-4">
            <Category
              selected={selected}
              onClick={categoryHandler}
              category={"Enhancement"}
            />
            <Category
              selected={selected}
              onClick={categoryHandler}
              category={"Bug"}
            />
          </div>
          <Category
            selected={selected}
            onClick={categoryHandler}
            category={"Feature"}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 bg-white rounded-xl p-7">
        <div className="flex justify-between items-center ">
          <h2 className="text-xl font-semibold text-blueBlackTheme">Roadmap</h2>
          {/*TODO: Add Link tag soon */}
          <a
            href="/roadmap"
            className="text-sm text-darkGrayTheme text-opacity-30 font-semibold underline"
          >
            View
          </a>
        </div>
        <div className="flex flex-col gap-2">
          <UpdateStatus text={"Planned"} color={"bg-amber-600"} number={updateStatus.planned?.length}/>
          <UpdateStatus text={"In-Progress"} color={"bg-purpleTheme"} number={updateStatus.inProgress?.length}/>
          <UpdateStatus text={"Live"} color={"bg-blueTheme"} number={updateStatus.live?.length}/>
        </div>
      </div>
    </div>
  );
};

SideBar.propTypes = {
  showSideBar: PropTypes.bool,
};
export default SideBar;
