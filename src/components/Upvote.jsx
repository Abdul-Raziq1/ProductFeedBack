import { FaChevronUp } from "react-icons/fa";
import PropTypes from "prop-types";
import { useState } from "react";
import { useContext } from "react";
import { FeedbackContext } from "../context/FeedbackContext";
import util from "../data/service";
import { IN_PROGRESS, LIVE, MOST_UPVOTES, PLANNED } from "../data/types";

const Upvote = ({ upvotes, id, screen = "homepage" }) => {
  const {
    setSortedState,
    sorter,
    sortBy,
    currentUserData,
    setCurrentUserData,
    setUpdateStatus
  } = useContext(FeedbackContext);
  const [numOfUpvotes, setNumOfUpvotes] = useState({
    upvotes,
    once: !!currentUserData?.likes[id],
  });
  const upvoteHandler = (event) => {
    event.stopPropagation();
    if (numOfUpvotes.once === false) {
      setNumOfUpvotes((prevState) => ({
        upvotes: prevState.upvotes + 1,
        once: true,
      }));
      util
        .addToLikes(id)
        .then((response) => {
          setCurrentUserData(response);
        })
        .catch(() => {
          console.log("Error");
        });

      util
        .addUpvote(id)
        .then((response) => {
          setUpdateStatus((prevState) => {
            const newPlanned = prevState.planned.map((entry) => {
              if (entry.id === response.id) {
                return response
              }
              return entry
            })
            if (response.status === PLANNED) {
              return {
                ...prevState,
                planned: sorter(MOST_UPVOTES, newPlanned, true)
              }
            }
            if (response.status === IN_PROGRESS) {
              const newInProgress = prevState.inProgress.map((entry) => {
                if (entry.id === response.id) {
                  return response
                }
                return entry
              })
              return {
                ...prevState,
                inProgress: sorter(MOST_UPVOTES, newInProgress, true)
              }
            }
            if (response.status === LIVE) {
              const newLive = prevState.live.map((entry) => {
                if (entry.id === response.id) {
                  return response
                }
                return entry
              })
              return {
                ...prevState,
                live: sorter(MOST_UPVOTES, newLive, true)
              }
            }
            return prevState
          })
          setSortedState((prevState) => {
            const newState = prevState.map((state) => {
              if (state.id === id) {
                return { ...state, upvotes: response.upvotes };
              }
              return state;
            });
            return sorter(sortBy, newState);
          });
        })
        .catch(() => {
          console.log("Error");
        });
    } else {
      setNumOfUpvotes((prevState) => ({
        upvotes: prevState.upvotes - 1,
        once: false,
      }));
      util
        .removeFromLikes(id)
        .then((response) => {
          setCurrentUserData(response);
        })
        .catch(() => {
          console.log("Error");
        });
      util
        .addUpvote(id, "decrement")
        .then((response) => {
          setUpdateStatus((prevState) => {
            const newPlanned = prevState.planned.map((entry) => {
              if (entry.id === response.id) {
                return response
              }
              return entry
            })
            if (response.status === PLANNED) {
              return {
                ...prevState,
                planned: sorter(MOST_UPVOTES, newPlanned, true)
              }
            }
            if (response.status === IN_PROGRESS) {
              const newInProgress = prevState.inProgress.map((entry) => {
                if (entry.id === response.id) {
                  return response
                }
                return entry
              })
              return {
                ...prevState,
                inProgress: sorter(MOST_UPVOTES, newInProgress, true)
              }
            }
            if (response.status === LIVE) {
              const newLive = prevState.live.map((entry) => {
                if (entry.id === response.id) {
                  return response
                }
                return entry
              })
              return {
                ...prevState,
                live: sorter(MOST_UPVOTES, newLive, true)
              }
            }
            return prevState
          })
          setSortedState((prevState) => {
            const newState = prevState.map((state) => {
              if (state.id === id) {
                return { ...state, upvotes: response.upvotes };
              }
              return state;
            });
            return sorter(sortBy, newState);
          });
        })
        .catch(() => {
          console.log("Error");
        });
    }
  };
  return (
    <div
      onClick={upvoteHandler}
      className={`flex cursor-pointer ${
        screen === "roadmap" ? "" : "tablet:flex-col tablet:w-10"
      } justify-center gap-2 px-2 py-1 items-center ${
        numOfUpvotes.once
          ? "bg-blueTheme text-white"
          : "bg-grayTheme hover:bg-blueTheme hover:bg-opacity-25"
      } rounded-lg`}
    >
      <FaChevronUp
        className={`w-3 font-bold ${
          numOfUpvotes.once ? "text-white" : "text-blueTheme"
        }`}
      />
      <span
        className={`font-bold ${
          numOfUpvotes.once ? "text-white" : "text-blueBlackTheme"
        }`}
      >
        {numOfUpvotes.upvotes}
      </span>
    </div>
  );
};

Upvote.propTypes = {
  upvotes: PropTypes.number,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  screen: PropTypes.string,
};

export default Upvote;
