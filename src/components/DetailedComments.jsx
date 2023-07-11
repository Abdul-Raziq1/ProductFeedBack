/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import Comment from "./Comment";
import { createContext } from "react";

export const IdContext = createContext();

const DetailedComments = ({ message, suggestionId, setSuggestion }) => {
  return (
    <IdContext.Provider value={{suggestionId, messageId: message.id, replyingTo: message.user.username, setSuggestion}}>
      <Comment message={message} />
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
