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
      <div className="py-4 pl-2 flex flex-col bg-white">
        <div className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-3 tablet:gap-7">
            <img src={image} className="rounded-full w-14" />
            <div className="leading-6">
              <div className="font-semibold text-lighterBlueBlackTheme">
                <span>{name}</span>
              </div>
              <span className=" text-darkGrayTheme">@{username}</span>
            </div>
          </div>
          <button
            onClick={replyHandler}
            className="text-blueTheme font-semibold tablet:pr-5 hover:underline"
          >
            Reply
          </button>
        </div>
        <div
          className={`tablet:${
            message?.replies?.length > 0 && "border-l-2 "
          } ml-7`}
        >
          <div>
            <div className="tablet:ml-14">
              <span className="pt-3 text-lg text-darkGrayTheme ">
                <span className="text-purpleTheme font-bold">
                  {message.replyingTo && replyToUser !== username
                    ? `@${replyToUser} `
                    : ""}
                </span>
                <span className="">{content}</span>
              </span>
            </div>
            <div
              className={`pl-1 ${
                isReply === false && message.replies?.length > 0 && "border-l-2"
              } tablet:border-l-0`}
            >
              {isReplying && (
                <Reply
                  setIsReplying={setIsReplying}
                  replyingTo={message.user.username}
                />
              )}
              {message &&
                message.replies?.length > 0 &&
                message.replies.map((reply) => {
                  return (
                    <div key={reply.id}>
                      <Comment message={reply} replyToUser={reply.replyingTo} />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      {message.replyingTo === undefined && <hr className="mx-10" />}
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
