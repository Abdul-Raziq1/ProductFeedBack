/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import fakeApi from "../data/suggestions";
import { LEAST_UPVOTES, MOST_COMMENTS, MOST_UPVOTES } from "../data/sortTypes";
export const FeedbackContext = createContext();

const FeedbackProvider = ({ children }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState(MOST_UPVOTES);
  const [sortedState, setSortedState] = useState([])

  const sorter = (sortBy, arrayToSort) => {
    let copy;
    if (sortBy === MOST_UPVOTES){
        copy = arrayToSort.slice(0).sort((a, b) => b.numOfUpvotes - a.numOfUpvotes)
    }
    else if (sortBy === LEAST_UPVOTES){
        copy = arrayToSort.slice(0).sort((a, b) => a.numOfUpvotes - b.numOfUpvotes)
    }
    else if (sortBy === MOST_COMMENTS){
        copy = arrayToSort.slice(0).sort((a, b) => b.numOfMessages - a.numOfMessages)
    }
    else {
        copy = arrayToSort.slice(0).sort((a, b) => a.numOfMessages - b.numOfMessages)
    }
    return copy
  }
  useEffect(() => {
    fakeApi
      .getSuggestions()
      .then((response) => {
        setSuggestions(sorter(sortBy, response));
        setSortedState(sorter(sortBy, response))
        setLoading(false);
        // setTimeout(() => {
        // }, 2000)
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, []);

  useEffect(() => {
    setSortedState(sorter(sortBy, suggestions))
}, [sortBy])

  return (
    <FeedbackContext.Provider value={{ sortedState, loading, setSortBy }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackProvider;
