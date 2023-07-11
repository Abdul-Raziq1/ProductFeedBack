import { useState, useContext } from "react";
import CustomButton from "./CustomButton";
import { INITIAL_CHARS } from "../data/types";
import { v4 as uuid } from "uuid";
import { FeedbackContext } from "../context/FeedbackContext";
import { IdContext } from "../components/DetailedComments";
import PropTypes from "prop-types";
import util from "../data/service";

const Reply = ({ setIsReplying, replyingTo }) => {
  const [reply, setReply] = useState("");
  const { currentUserData } = useContext(FeedbackContext);
  const { suggestionId, messageId, setSuggestion } =
    useContext(IdContext);
  const [charactersLeft, setCharactersLeft] = useState(INITIAL_CHARS);
  const [showWarning, setShowWarning] = useState(false);

  const closeReplyHandler = () => {
    setIsReplying(false);
  };
  const replyHandler = (event) => {
    const value = event.target.value;
    const charsLeft = INITIAL_CHARS - value.length;
    if (charactersLeft > 0) {
      setCharactersLeft(charsLeft);
      setReply(value);
    } else {
      setReply((prevValue) => {
        if (prevValue.length > value.length) {
          setCharactersLeft(charsLeft);
          return value;
        } else {
          return prevValue;
        }
      });
    }
  };

  const postReplyHandler = (event) => {
    event.preventDefault();

    if (!/\S/.test(reply)){
      setShowWarning(true);
      setTimeout(() => {
        setShowWarning(false);
      }, 1500);
      return;
    }

    const id = uuid();
    const replyObject = {
      id,
      content: reply,
      replyingTo,
      user: currentUserData,
    };
    setReply("");
    setCharactersLeft(INITIAL_CHARS);
    util
      .addReply(suggestionId, messageId, replyObject)
      .then((response) => {
        setSuggestion(response);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
    closeReplyHandler();
  };
  return (
    <form className="flex flex-col gap-2 justify-between p-3">
      <textarea
        className={`rounded bg-grayTheme p-3 ${
          showWarning ? "outline-red-500" : "focus:outline-blueTheme"
        } outline-offset-0 outline-1 outline-none`}
        placeholder="Type your reply here"
        rows={3}
        value={reply}
        onChange={replyHandler}
      />
      {showWarning && <span className="text-red-600">Can&apos;t be empty</span>}
      <div className="flex items-center justify-between">
        <span className="text-darkGrayTheme">
          {charactersLeft} {charactersLeft === 1 ? "Character" : "Characters"}{" "}
          left
        </span>
        <CustomButton
          text={"Post Reply"}
          type="submit"
          color={"#AD1FEA"}
          onClick={postReplyHandler}
        />
      </div>
    </form>
  );
};

Reply.propTypes = {
  setIsReplying: PropTypes.func,
  replyingTo: PropTypes.string
};

export default Reply;
