/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
const Comment = ({ message }) => {
  return (
    <div className="p-4 bg-white">
      <div className="flex items-center justify-between text-lg">
        {/* <img src={message.profile}/> */}
        <div className="flex items-center gap-4">
          <div className="p-3 w-10 h-10 bg-red-500 rounded-full"></div>
          <div className="leading-6">
            <div className="font-semibold text-lighterBlueBlackTheme">
              <span>{message.user.name}</span>
            </div>
            <span className=" text-darkGrayTheme">@{message.user.username}</span>
          </div>
        </div>
        <button className="text-blueTheme font-semibold">Reply</button>
      </div>
      <p className="pt-3 text-lg text-darkGrayTheme">{message.content}</p>
    </div>
  );
};

Comment.propTypes = {
  id: PropTypes.string,
  profile: PropTypes.string,
  name: PropTypes.string,
  tag: PropTypes.string,
  comment: PropTypes.string,
  innerMessages: PropTypes.array,
};
export default Comment;
