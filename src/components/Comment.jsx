/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import Reply from "./Reply";
import { useState } from "react";
const Comment = ({ message, isReply = false, replyToUser }) => {
  const [isReplying, setIsReplying] = useState(false);
  const { user, content } = message;
  const { name, username, image } = user;

  const replyHandler = () => {
    setIsReplying(!isReplying);
  };
  return (
    <>
    <div className="p-4 bg-white">
      <div className="flex items-center justify-between text-lg">
        <div className="flex items-center gap-3">
          <img src={image} className="rounded-full w-16" />
          <div className="leading-6">
            <div className="font-semibold text-lighterBlueBlackTheme">
              <span>{name}</span>
            </div>
            <span className=" text-darkGrayTheme">@{username}</span>
          </div>
        </div>
        <button onClick={replyHandler} className="text-blueTheme font-semibold">
          Reply
        </button>
      </div>
      <span className="pt-3 text-lg text-darkGrayTheme">
        <span className="text-purpleTheme font-bold">
          {isReply && replyToUser !== username ? `@${replyToUser} ` : ""}
        </span>
        {content}
      </span>

    </div>
      {isReplying && <Reply setIsReplying={setIsReplying} replyingTo={message.user.username} />}
    </>
  );
};

Comment.propTypes = {
  id: PropTypes.string,
  profile: PropTypes.string,
  name: PropTypes.string,
  tag: PropTypes.string,
  comment: PropTypes.string,
  innerMessages: PropTypes.array,
  isReply: PropTypes.bool,
};
export default Comment;
