import { FaBars, FaPlus } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import SortDropDown from "../components/SortDropDown";

import detective from "../assets/images/detective.svg";
import Suggestion from "../components/Suggestion";
import { useContext, useEffect, useRef, useState } from "react";
import { FeedbackContext } from "../context/FeedbackContext";
import SideBar from "../components/SideBar";
import { ADD_FEEDBACK } from "../data/types";
import LinkButton from "../components/LinkButtons";
import Loading from "../components/Loading";
import FilterOptions from "../components/FilterOptions";
import RoadmapStats from "../components/RoadmapStats";
import suggestionsIcon from "/assets/suggestions/icon-suggestions.svg"
const LandingScreen = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const sideBarRef = useRef();
  const { sortedState, loading, setFilterBy, selected, updateStatus } = useContext(FeedbackContext);

  const sideBarHandler = () => {
    setShowSideBar(!showSideBar);
  };

  useEffect(() => {
    const closeSideBar = (event) => {
      if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
        setShowSideBar(false);
      }
    };
    document.addEventListener("mousedown", closeSideBar);
    return () => {
      document.removeEventListener("mousedown", closeSideBar);
    };
  }, []);

  if (loading === true) {
    return (
      <div className="min-h-screen min-w-screen flex flex-col justify-center">
        <Loading />
      </div>
    );
  }
  return (
    <div className="tablet:p-6 tablet:bg-grayTheme min-h-screen overflow-x-hidden select-none">
      <div className="hidden tablet:grid grid-row-1 grid-cols-3 gap-2 mb-6">
        <div className="flex flex-col rounded-lg pb-7 text-center justify-end bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <h2 className="font-semibold text-xl text-white">Frontend Mentor</h2>
          <h4 className=" text-lg text-grayTheme text-opacity-90">
            Feedback Board
          </h4>
        </div>
        <FilterOptions selected={selected} setFilterBy={setFilterBy} />
        <RoadmapStats updateStatus={updateStatus}/>
      </div>
      <header className="tablet:hidden flex pl-3 py-1 justify-between items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <div className="flex flex-col">
          <h2 className="font-semibold text-xl text-white">Frontend Mentor</h2>
          <h4 className=" text-lg text-grayTheme text-opacity-90">
            Feedback Board
          </h4>
        </div>
        <div className="mr-6" onClick={sideBarHandler}>
          {!showSideBar ? (
            <FaBars className="text-white text-3xl cursor-pointer" />
          ) : (
            <AiOutlineClose className="text-white text-4xl cursor-pointer" />
          )}
        </div>
      </header>
      <main className="min-h-screen relative bg-grayTheme">
        {<SideBar ref={sideBarRef} showSideBar={showSideBar} />}
        <section className="flex items-center tablet:rounded-lg justify-around bg-blueBlackTheme py-2">
          <div className="hidden tablet:flex gap-2">
            <img src={suggestionsIcon} className="w-6 h-6" alt="suggestions-icon"/>
            <h2 className="text-xl font-bold text-white">{sortedState.length} {sortedState.length === 1 ? "Suggestion" : "Suggestions"}</h2>
          </div>
          <SortDropDown />
          <LinkButton icon={<FaPlus />} text={ADD_FEEDBACK} color={"#AD1FEA"} />
        </section>
        <section className="py-10 px-4 tablet:px-0 ">
          {loading === true ? (
            <div className="min-h-screen w-full bg-white p-3 mr-3">
              <Loading />
            </div>
          ) : sortedState?.length === 0 ? (
            <div className="bg-white py-20 rounded-lg">
              <div className="flex w-full gap-10 flex-col justify-center items-center">
                <img
                  className="h-36 w-36"
                  src={detective}
                  alt="searching for results"
                />
                <h2 className="text-blueBlackTheme text-3xl font-bold">
                  There is no feedback yet
                </h2>

                <blockquote className="max-w-sm text-center text-lg">
                  Got a suggestion? Found a bug that needs to be squashed? We
                  love hearing about new ideas to improve our app.
                </blockquote>
                <LinkButton
                  icon={<FaPlus />}
                  text={ADD_FEEDBACK}
                  color={"#AD1FEA"}
                />
              </div>
            </div>
          ) : (
            sortedState?.map((suggestion) => {
              return <Suggestion key={suggestion.id} suggestion={suggestion} />;
            })
          )}
        </section>
      </main>
    </div>
  );
};

export default LandingScreen;
