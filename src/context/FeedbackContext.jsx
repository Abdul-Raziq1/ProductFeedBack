/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import fakeApi from "../data/suggestions";
import { ALL, LEAST_UPVOTES, MOST_COMMENTS, MOST_UPVOTES } from "../data/types";
export const FeedbackContext = createContext();

const FeedbackProvider = ({ children }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState(MOST_UPVOTES);
  const [filterBy, setFilterBy] = useState(ALL);
  const [sortedState, setSortedState] = useState([]);
  const [selected, setSelected] = useState(false);
  const [updateStatus, setUpdateStatus] = useState({});

  const sorter = (sortBy, arrayToSort) => {
    let copy;
    // Sort Logic
    if (sortBy === MOST_UPVOTES) {
      copy = arrayToSort
        .slice(0)
        .sort((a, b) => b.numOfUpvotes - a.numOfUpvotes);
    } else if (sortBy === LEAST_UPVOTES) {
      copy = arrayToSort
        .slice(0)
        .sort((a, b) => a.numOfUpvotes - b.numOfUpvotes);
    } else if (sortBy === MOST_COMMENTS) {
      copy = arrayToSort
        .slice(0)
        .sort((a, b) => b.numOfMessages - a.numOfMessages);
    } else {
      copy = arrayToSort
        .slice(0)
        .sort((a, b) => a.numOfMessages - b.numOfMessages);
    }
    return copy;
  };

  const filterate = (filterBy) => {
    if (filterBy === ALL) {
      return suggestions;
    }
    const filteredArray = suggestions.filter((suggestion) => {
      const filtered = suggestion.categories.filter((category) => {
        return category.category === filterBy;
      });
      return filtered.length > 0;
    });
    return filteredArray;
  };
  useEffect(() => {
    fakeApi
      .getSuggestions()
      .then((response) => {
        setSuggestions(sorter(sortBy, response));
        setSortedState(sorter(sortBy, response));
        setLoading(false);
        // setTimeout(() => {
        // }, 2000)
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
    fakeApi
      .getUpdateStatus()
      .then((response) => {
        console.log("Update Status", response);
        setUpdateStatus(response)
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  useEffect(() => {
    setSortedState(sorter(sortBy, filterate(filterBy)));
  }, [sortBy, filterBy]);

  return (
    <FeedbackContext.Provider
      value={{
        sortedState,
        loading,
        selected,
        filterBy,
        updateStatus,
        setSortBy,
        setFilterBy,
        setSelected,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackProvider;
