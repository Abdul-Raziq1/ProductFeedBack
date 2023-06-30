import { FaBars, FaPlus } from "react-icons/fa";
import SortDropDown from "../components/SortDropDown";
import CustomButton from "../components/CustomButton";

import detective from "../assets/images/detective.svg";
import Suggestion from "../components/Suggestion";
import { useContext } from "react";
import { FeedbackContext } from "../context/FeedbackContext";
const LandingScreen = () => {
  const { sortedState, loading } = useContext(FeedbackContext)
  return (
    <>
      <header className="flex px-10 py-6 justify-between items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-2xl text-white">Frontend Mentor</h2>
          <h4 className="font-semibold text-xl text-grayTheme">
            Feedback Board
          </h4>
        </div>
        <div>
          <FaBars className="text-white text-4xl cursor-pointer" />
        </div>
      </header>
      <section className="flex justify-between bg-blueBlackTheme py-5 px-5">
        <SortDropDown />
        <CustomButton
          icon={<FaPlus />}
          text={"Add Feedback"}
          color={"#AD1FEA"}
        />
      </section>
      <main className="bg-grayTheme py-10 px-4">
        {
          loading === true ? (
            <></>
          ) : (
            sortedState?.length === 0 ? (
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
                    Got a suggestion? Found a bug that needs to be squashed? We love
                    hearing about new ideas to improve our app.
                  </blockquote>
                  <CustomButton
                    icon={<FaPlus />}
                    text={"Add Feedback"}
                    color={"#AD1FEA"}
                  />
                </div>
              </div>
            ) : (
              sortedState?.map((suggestion) => {
                return <Suggestion key={suggestion.id} suggestion={suggestion} />;
              })
            )
          )
        }

      </main>
    </>
  );
};

export default LandingScreen;
