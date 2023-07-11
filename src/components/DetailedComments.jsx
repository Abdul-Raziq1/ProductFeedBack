/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import Comment from "./Comment";
import { createContext } from "react";

export const IdContext = createContext();

const DetailedComments = ({ message, suggestionId, setSuggestion }) => {
  return (
    <IdContext.Provider value={{suggestionId, messageId: message.id, replyingTo: message.user.username, setSuggestion}}>
      <Comment message={message} />
      <div className="">
        {message.replies?.length !== 0 ? (
          message.replies?.map((reply) => {
            return (
              <div key={reply.id} className="border-l-2 ml-2 tablet:ml-6">
                <Comment message={reply} isReply={true} replyToUser={reply.replyingTo}/>
              </div>
            );
          })
        ) : (
          <hr className="mx-4" />
        )}
      </div>
    </IdContext.Provider>
  );
};

DetailedComments.propTypes = {
  id: PropTypes.string,
  profile: PropTypes.string,
  name: PropTypes.string,
  tag: PropTypes.string,
  comment: PropTypes.string,
  innerMessages: PropTypes.array,
};

export default DetailedComments;
