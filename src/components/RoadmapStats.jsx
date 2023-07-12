/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import UpdateStatus from "./UpdateStatus";

const RoadmapStats = ({ updateStatus }) => {
  return (
    <div className="flex flex-col gap-5 bg-white rounded-xl p-7">
      <div className="flex justify-between items-center ">
        <h2 className="text-xl font-semibold text-blueBlackTheme">Roadmap</h2>
        <Link
          to={"/roadmap"}
          className="text-sm text-blueTheme hover:text-opacity-60 font-semibold underline"
        >
          View
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <UpdateStatus text={"Planned"} number={updateStatus.planned?.length} />
        <UpdateStatus
          text={"In-Progress"}
          number={updateStatus.inProgress?.length}
        />
        <UpdateStatus text={"Live"} number={updateStatus.live?.length} />
      </div>
    </div>
  );
};

export default RoadmapStats;
