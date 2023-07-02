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
const LandingScreen = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const sideBarRef = useRef()
  const { sortedState, loading } = useContext(FeedbackContext);
  const sideBarHandler = () => {
    setShowSideBar(!showSideBar);
  };

  useEffect(() => {
    const closeSideBar = (event) => {
      if (sideBarRef.current && !sideBarRef.current.contains(event.target)){
        setShowSideBar(false)
      }
    }
    document.addEventListener('mousedown', closeSideBar)
    return () => {
      document.removeEventListener('mousedown', closeSideBar)
    }
  }, [])


  return (
    <div className="min-h-screen overflow-x-hidden select-none">
      <header className=" flex pl-3 py-1 justify-between items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
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
        <section className="flex justify-around bg-blueBlackTheme py-2">
          <SortDropDown />
          <LinkButton icon={<FaPlus />} text={ADD_FEEDBACK} color={"#AD1FEA"} />
        </section>
        <section className="py-10 px-4 ">
          {loading === true ? (
            <></>
          ) : sortedState?.length === 0 ? (
            <div className="bg-white py-20 rounded-lg">
              <div className="flex gap-10 flex-col justify-center items-center">
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
