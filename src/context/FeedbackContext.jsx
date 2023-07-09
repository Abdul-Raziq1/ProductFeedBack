/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import fakeApi from "../data/suggestions";
import { ALL, LEAST_UPVOTES, MOST_COMMENTS, MOST_UPVOTES } from "../data/types";
import axiosUtil from "../data/service";
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
    status: "Suggestion",
    comments: [],
  });
  const [currentUserData, setCurrentUserData] = useState({
    image: "",
    name: "",
    username: "",
    likes: {}
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
    console.log("Getting user")
    axiosUtil.getUser().then((response) => {
      setCurrentUserData(response);
    });
  }, []);

  useEffect(() => {
    console.log("Fetching data");
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    axiosUtil
      .getProductRequests()
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
  }, [fetchData, setFetchData]);

  useEffect(() => {
    setSortedState(sorter(sortBy, filterate(filterBy, suggestions)));
  }, [sortBy, filterBy, setSortBy]);

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
        suggestions,
        currentUserData,
        sorter,
        filterate,
        setSortBy,
        setFilterBy,
        setSelected,
        setFeedback,
        setFetchData,
        setSuggestions,
        setSortedState,
        setCurrentUserData
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackProvider;
