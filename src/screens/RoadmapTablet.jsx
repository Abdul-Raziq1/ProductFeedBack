import { FaChevronLeft, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ADD_FEEDBACK, IN_PROGRESS, LIVE, PLANNED} from "../data/types";
import LinkButton from "../components/LinkButtons";
import { useContext } from "react";
import { FeedbackContext } from "../context/FeedbackContext";
import ShowRoadMap from "../components/ShowRoadMap";

const RoadmapTablet = () => {
  const { updateStatus } = useContext(FeedbackContext);
  const navigate = useNavigate();
  const backClickHandler = () => {
    navigate(-1);
  };
  const planned = {
    title: `${PLANNED} (${updateStatus.planned.length})`,
    description: "Ideas prioritized for research",
    cards: updateStatus.planned,
    color: "#d97706",
  }
  const inProgress = {
    title: `${IN_PROGRESS} (${updateStatus.inProgress.length})`,
    description: "Currently being developed",
    cards: updateStatus.inProgress,
    color: "#AD1FEA",
  }
  const live = {
    title: `${LIVE} (${updateStatus.live.length})`,
    description: "Released features",
    cards: updateStatus.live,
    color: "#4661E6",
  }
  return (
    <div className="min-h-screen w-screen desktop:max-w-5xl desktop:mx-auto p-10 bg-grayTheme overflow-x-hidden">
      <div className="bg-blueBlackTheme rounded-xl text-white p-10 flex justify-between items-center">
        <div className="flex flex-col">
          <div
            onClick={backClickHandler}
            className="cursor-pointer w-fit flex gap-2 items-center"
          >
            <FaChevronLeft className="w-2" />
            <span className="hover:underline font-semibold">Go Back</span>
          </div>
          <span className="text-2xl font-bold">Roadmap</span>
        </div>
        <LinkButton icon={<FaPlus />} text={ADD_FEEDBACK} color={"#AD1FEA"} />
      </div>

      <div>
        <div className="grid grid-cols-3 gap-3 my-7">
            <ShowRoadMap status={planned}/>
            <ShowRoadMap status={inProgress}/>
            <ShowRoadMap status={live}/>
        </div>
      </div>
    </div>
  );
};

export default RoadmapTablet;
