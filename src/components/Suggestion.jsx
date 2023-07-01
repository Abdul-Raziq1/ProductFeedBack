import PropTypes from "prop-types";
import Upvote from "./Upvote";
import Category from "./Category";
import { FaComment } from "react-icons/fa";
const Suggestion = ({ suggestion }) => {
  return (
    <div className="select-none rounded-xl flex flex-col gap-5 p-5 bg-white mb-5">
      <div className="flex flex-col gap-3">
        <h2 className="select-text text-blueBlackTheme font-bold text-lg">
          {suggestion.title}
        </h2>
        <p className="select-text text-darkGrayTheme">{suggestion.description}</p>
        <div className="flex gap-3">
          <Category category={suggestion.category} />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <Upvote numOfUpvotes={suggestion.numOfUpvotes} />
        <div className="flex gap-2 items-center ">
          <FaComment className="text-xl text-darkGrayTheme text-opacity-40"/>
          <span className="text-blueBlackTheme font-bold">{suggestion.numOfMessages}</span>
        </div>
      </div>
    </div>
  );
};

Suggestion.propTypes = {
  suggestion: PropTypes.object,
};
export default Suggestion;
