import PropTypes from "prop-types";
import Upvote from "./Upvote";
import Category from "./Category";
import { useNavigate } from "react-router-dom";
import UpdateStatus from "./UpdateStatus";
import { FaComment } from "react-icons/fa";
const RoadmapSuggestion = ({
  suggestion,
  isPresentational = false,
  screen = "homepage",
  color,
}) => {
  const navigate = useNavigate();
  const viewCommentHandler = () => {
    if (isPresentational === true) {
      return;
    }
    navigate(`/comments/${suggestion.id}`);
  };
  const isNotSuggestion = suggestion.status !== "Suggestion";
  const style = {
    borderTopWidth: "8px",
    borderTopColor: color,
  };

  return (
    <div
      onClick={viewCommentHandler}
      style={isNotSuggestion ? style : {}}
      className="hidden tablet:flex select-none rounded-xl items-center justify-between px-7 gap-5 p-5 bg-white mb-5"
    >
      {screen === "roadmap" && <UpdateStatus text={suggestion.status} />}
      <div className="flex items-center gap-10 w-4/5">
        <Upvote upvotes={suggestion.upvotes} id={suggestion.id} />
        <div className="flex flex-col gap-3">
          <h2 className="text-blueBlackTheme font-bold text-lg">
            {suggestion.title}
          </h2>
          <p className="text-lg text-darkGrayTheme">{suggestion.description}</p>
          <div className="flex gap-3">
            <Category category={suggestion.category} isPresentational />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2 items-center ">
        <FaComment className="text-xl text-darkGrayTheme text-opacity-40" />
        <span className="text-blueBlackTheme font-bold">
          {suggestion.numOfComments}
        </span>
      </div>
    </div>
  );
};

RoadmapSuggestion.propTypes = {
  suggestion: PropTypes.object,
  isPresentational: PropTypes.bool,
  screen: PropTypes.string,
  color: PropTypes.string,
};
export default RoadmapSuggestion;
