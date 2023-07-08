/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import fakeApi from "../data/suggestions";
import { ALL, LEAST_UPVOTES, MOST_COMMENTS, MOST_UPVOTES, productRequests } from "../data/types";
export const FeedbackContext = createContext();



const FeedbackProvider = ({ children }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState(MOST_UPVOTES);
  const [filterBy, setFilterBy] = useState(ALL);
  const [sortedState, setSortedState] = useState([]);
  const [selected, setSelected] = useState(true);
  const [updateStatus, setUpdateStatus] = useState({});
  const [fetchData, setFetchData] = useState(true);
  const [feedback, setFeedback] = useState({
    title: "",
    description: "",
    category: "Feature",
    numOfComments: 0,
    upvotes: 0,
    comments: [],
  });
  const sorter = (sortBy, arrayToSort) => {
    let copy;
    // Sort Logic
    if (sortBy === MOST_UPVOTES) {
      copy = arrayToSort.slice(0).sort((a, b) => b.upvotes - a.upvotes);
    } else if (sortBy === LEAST_UPVOTES) {
      copy = arrayToSort.slice(0).sort((a, b) => a.upvotes - b.upvotes);
    } else if (sortBy === MOST_COMMENTS) {
      copy = arrayToSort
        .slice(0)
        .sort((a, b) => b.numOfComments - a.numOfComments);
    } else {
      copy = arrayToSort
        .slice(0)
        .sort((a, b) => a.numOfComments - b.numOfComments);
    }
    return copy;
  };

  const filterate = (filterBy, arrayToFilter) => {
    if (filterBy === ALL) {
      return arrayToFilter;
    }
    const filteredArray = arrayToFilter.filter(
      (suggestion) => suggestion.category === filterBy
    );
    return filteredArray;
  };
  useEffect(() => {
    // fakeApi
    //   .getSuggestions()
    //   .then((response) => {
    //     setSuggestions(sorter(sortBy, response));
    //     setSortedState(sorter(sortBy, filterate(filterBy, response)));

    //     // setTimeout(() => {
      //     // }, 2000)
      //   })
    setLoading(false);
    fetch(productRequests)
      .then((res) => res.json())
      .then((response) => {
        setSuggestions(sorter(sortBy, response));
        setSortedState(sorter(sortBy, filterate(filterBy, response)));
      })
      .catch(() => {
        console.log("Error fetching the data ");
      });

    fakeApi
      .getUpdateStatus()
      .then((response) => {
        setUpdateStatus(response);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
    setFetchData(false);
  }, [fetchData]);

  useEffect(() => {
    setSortedState(sorter(sortBy, filterate(filterBy, suggestions)));
  }, [sortBy, filterBy]);
  console.log("Sort by", sortBy);
  return (
    <FeedbackContext.Provider
      value={{
        sortedState,
        loading,
        selected,
        filterBy,
        updateStatus,
        feedback,
        sortBy,
        setSortBy,
        setFilterBy,
        setSelected,
        setFeedback,
        setFetchData,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackProvider;
