import { FaChevronLeft, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import FloatingActionButton from "../components/FloatingActionButton";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { ADD_FEEDBACK } from "../data/types";
import { useContext, useState } from "react";
import { FeedbackContext } from "../context/FeedbackContext";
import axiosUtil from "../data/service";

const FeedbackScreen = () => {
  const { feedback, setFeedback, setFetchData } = useContext(FeedbackContext);
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();
  const backClickHandler = () => {
    navigate(-1);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (feedback.title === "") {
      setShowWarning(true);
      setTimeout(() => {
        setShowWarning(false);
      }, 1500);
      return;
    }
    axiosUtil
      .addFeedBack(feedback)
      .then(() => {
        setFeedback({
          title: "",
          description: "",
          category: "Feature",
          numOfComments: 0,
          upvotes: 0,
          status: "suggestion",
          comments: [],
        });
        navigate(-1);
        setFetchData(true);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };
  return (
    <div className="min-h-screen p-7 bg-grayTheme flex flex-col gap-10 select-none">
      <div
        onClick={backClickHandler}
        className="cursor-pointer w-fit flex gap-2 items-center"
      >
        <FaChevronLeft className="w-2 text-blueTheme" />
        <span className="hover:underline font-semibold text-darkGrayTheme">
          Go Back
        </span>
      </div>
      <div className="flex-1 pt-14 pb-7 px-5 relative rounded-xl bg-white">
        <FloatingActionButton icon={<FaPlus />} />
        <h2 className="text-2xl mb-5 font-semibold text-lighterBlueBlackTheme">
          Create New Feedback
        </h2>
        <form noValidate className="flex flex-col gap-7">
          <div>
            <InputField
              title={"Feedback Title"}
              description={"Add a short descriptive headline"}
              inputType={"text"}
              warn={showWarning}
            />
            {showWarning && (
              <span className="text-red-600">Can&apos;t be empty</span>
            )}
          </div>

          <InputField
            title={"Category"}
            description={"Choose a category for your feedback"}
            inputType={"select"}
          />
          <InputField
            title={"Feedback Detail"}
            description={
              "Include any specific comments on what should be improved, added, etc"
            }
            inputType={"textarea"}
          />
          <div className="flex flex-col gap-3">
            <CustomButton
              type={"submit"}
              color={"#AD1FEA"}
              text={ADD_FEEDBACK}
              onClick={submitHandler}
            />
            <CustomButton
              color={"#3A4374"}
              text={"Cancel"}
              onClick={backClickHandler}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackScreen;
