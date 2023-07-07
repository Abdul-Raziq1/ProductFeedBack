/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
const Comment = ({ message }) => {
  return (
    <div className="p-4 bg-white">
      <div className="flex items-center justify-between">
        {/* <img src={message.profile}/> */}
        <div className="flex items-center gap-4">
          <div className="p-3 w-10 h-10 bg-red-500 rounded-full"></div>
          <div>
            <div>
              <span>{message.name}</span>
            </div>
            <span>{message.tag}</span>
          </div>
        </div>
        <button>Reply</button>
      </div>
      <p>{message.comment}</p>
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
