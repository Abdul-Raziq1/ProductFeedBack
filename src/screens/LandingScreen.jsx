import { FaBars, FaPlus } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import SortDropDown from "../components/SortDropDown";

import Suggestion from "../components/Suggestion";
import { useContext, useEffect, useRef, useState } from "react";
import { FeedbackContext } from "../context/FeedbackContext";
import SideBar from "../components/SideBar";
import { ADD_FEEDBACK } from "../data/types";
import LinkButton from "../components/LinkButtons";
import Loading from "../components/Loading";
import FilterOptions from "../components/FilterOptions";
import RoadmapStats from "../components/RoadmapStats";
import suggestionsIcon from "/assets/suggestions/icon-suggestions.svg";
import SuggestionTablet from "../components/SuggestionTablet";
import NotFound from "./NotFound";
const LandingScreen = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const sideBarRef = useRef();
  const { sortedState, loading, setFilterBy, selected, updateStatus } =
    useContext(FeedbackContext);

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
      <div className="min-h-screen min-w-screen flex flex-col justify-center bg-white">
        <Loading />
      </div>
    );
  }
  return (
    <div className="tablet:p-6 desktop:flex desktop:px-32 desktop:py-20 tablet:bg-grayTheme min-h-screen overflow-x-hidden select-none">
      <div className="hidden desktop:grid-cols-1 desktop:w-2/6 desktop:h-full desktop:gap-4 desktop:grid-row-3 desktop:mr-4 tablet:grid tablet:grid-row-1 tablet:grid-cols-3 gap-2 mb-6">
        <div className="flex flex-col desktop:h-40 desktop:pb-5 rounded-lg pb-7 desktop:text-left desktop:pl-8 text-center justify-end bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <h2 className="font-semibold text-xl text-white">Frontend Mentor</h2>
          <h4 className=" text-lg text-grayTheme text-opacity-90">
            Feedback Board
          </h4>
        </div>
        <FilterOptions selected={selected} setFilterBy={setFilterBy} />
        <RoadmapStats updateStatus={updateStatus} />
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
      <main className="min-h-screen desktop:w-screen relative bg-grayTheme">
        {<SideBar ref={sideBarRef} showSideBar={showSideBar} />}
        <section className="flex items-center desktop:justify-between desktop:px-5 desktop:py-4 tablet:rounded-lg justify-around bg-blueBlackTheme py-2">
          <div className="hidden desktop:gap-16 tablet:flex items-center gap-2">
            <div className="flex items-center desktop:gap-5 gap-2">
              <img
                src={suggestionsIcon}
                className="w-6 h-6 mb-1"
                alt="suggestions-icon"
              />
              <h2 className="text-xl font-bold text-white">
                {sortedState.length}{" "}
                {sortedState.length === 1 ? "Suggestion" : "Suggestions"}
              </h2>
            </div>
            <div className="hidden desktop:flex mt-1">
              <SortDropDown />
            </div>
          </div>
          <div className="desktop:hidden">
            <SortDropDown />
          </div>
          <LinkButton icon={<FaPlus />} text={ADD_FEEDBACK} color={"#AD1FEA"} />
        </section>
        <section className="py-10 desktop:py-5 px-4 tablet:px-0 ">
          {loading === true ? (
            <div className="min-h-screen w-full bg-white p-3 mr-3">
              <Loading />
            </div>
          ) : sortedState?.length === 0 ? (
            <NotFound error={false} />
          ) : (
            sortedState?.map((suggestion) => {
              return (
                <div key={suggestion.id}>
                  <Suggestion suggestion={suggestion} />
                  <SuggestionTablet suggestion={suggestion} />
                </div>
              );
            })
          )}
        </section>
      </main>
    </div>
  );
};

export default LandingScreen;
