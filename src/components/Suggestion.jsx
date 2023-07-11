import PropTypes from "prop-types";
import Upvote from "./Upvote";
import Category from "./Category";
import { FaComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UpdateStatus from "./UpdateStatus";

const Suggestion = ({ suggestion, isPresentational = false, screen="homepage", color }) => {
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
      className={`${screen === "roadmap" ? "" : "tablet:hidden"} select-none rounded-xl flex flex-col gap-5 p-5 bg-white mb-5`}
    >
      {
        screen === "roadmap" &&
      <UpdateStatus
        text={suggestion.status}
      />
      }

      <div className="flex flex-col gap-3">
        <h2 className="text-blueBlackTheme font-bold text-lg">
          {suggestion.title}
        </h2>
        <p className="text-lg text-darkGrayTheme">
          {suggestion.description}
        </p>
        <div className="flex gap-3">
          <Category category={suggestion.category} isPresentational />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <Upvote upvotes={suggestion.upvotes} id={suggestion.id} screen={screen}/>
        <div className="flex gap-2 items-center ">
          <FaComment className="text-xl text-darkGrayTheme text-opacity-40" />
          <span className="text-blueBlackTheme font-bold">
            {suggestion.numOfComments}
          </span>
        </div>
      </div>
    </div>
  );
};

Suggestion.propTypes = {
  suggestion: PropTypes.object,
  isPresentational: PropTypes.bool,
  screen: PropTypes.string,
  color: PropTypes.string,
};
export default Suggestion;
