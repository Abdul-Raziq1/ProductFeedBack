import { FaChevronLeft, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import FloatingActionButton from "../components/FloatingActionButton";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { ADD_FEEDBACK, categoryOptions } from "../data/types";
import { useContext, useState } from "react";
import { FeedbackContext } from "../context/FeedbackContext";
import util from "../data/service";

const FeedbackScreen = () => {
  const { feedback, setFeedback, setFetchData } = useContext(FeedbackContext);
  const [showWarning, setShowWarning] = useState({
    titleWarning: false,
    descriptionWarning: false,
  });
  const navigate = useNavigate();
  const backClickHandler = () => {
    navigate(-1);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (!/\S/.test(feedback.title)) {
      setShowWarning((prevState) => ({ ...prevState, titleWarning: true }));
      setTimeout(() => {
        setShowWarning((prevState) => ({ ...prevState, titleWarning: false }));
      }, 1500);
      return;
    }
    if (!/\S/.test(feedback.description)) {
      setShowWarning((prevState) => ({
        ...prevState,
        descriptionWarning: true,
      }));
      setTimeout(() => {
        setShowWarning((prevState) => ({
          ...prevState,
          descriptionWarning: false,
        }));
      }, 1500);
      return;
    }
    util
      .addFeedBack(feedback)
      .then(() => {
        setFeedback({
          title: "",
          description: "",
          category: "Feature",
          numOfComments: 0,
          upvotes: 0,
          status: "Suggestion",
          comments: [],
        });
        navigate(-1);
        setFetchData(true);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };
  const titleChangeHandler = (event) => {
    setFeedback((prevState) => {
      return { ...prevState, title: event.target.value };
    });
  };

  const descriptionChangeHandler = (event) => {
    setFeedback((prevState) => {
      return { ...prevState, description: event.target.value };
    });
  };

  const addCategoryHandler = (selectedValue) => {
    setFeedback((prevState) => {
      return { ...prevState, category: selectedValue.value };
    });
  };
  return (
    <div className="min-h-screen py-7 desktop:max-w-2xl desktop:mx-auto tablet:px-6 px-4 bg-grayTheme flex flex-col gap-10 select-none">
      <div
        onClick={backClickHandler}
        className="cursor-pointer w-fit flex gap-2 items-center"
      >
        <FaChevronLeft className="w-2 text-blueTheme" />
        <span className="hover:underline font-semibold text-darkGrayTheme">
          Go Back
        </span>
      </div>
      <div className="flex-1 pt-14 pb-7 px-5 tablet:px-12 tablet:pb-10 relative rounded-xl bg-white">
        <FloatingActionButton icon={<FaPlus className="w-6 h-6" />} />
        <h2 className="tablet:text-3xl text-2xl mb-5 font-semibold text-lighterBlueBlackTheme">
          Create New Feedback
        </h2>
        <form noValidate className="flex flex-col gap-7">
          <div>
            <InputField
              title={"Feedback Title"}
              titleHandler={titleChangeHandler}
              titleValue={feedback.title}
              description={"Add a short descriptive headline"}
              inputType={"text"}
              warn={showWarning.titleWarning}
            />
            {showWarning.titleWarning && (
              <span className="text-red-600">Can&apos;t be empty</span>
            )}
          </div>

          <InputField
            title={"Category"}
            description={"Choose a category for your feedback"}
            inputType={"select"}
            categoryHandler={addCategoryHandler}
            options={categoryOptions}
            categoryValue={feedback.category}
          />
          <div>
            <InputField
              title={"Feedback Detail"}
              description={
                "Include any specific comments on what should be improved, added, etc"
              }
              inputType={"textarea"}
              descriptionHandler={descriptionChangeHandler}
              descriptionValue={feedback.description}
              warn={showWarning.descriptionWarning}
            />
            {showWarning.descriptionWarning && (
              <span className="text-red-600">Can&apos;t be empty</span>
            )}
          </div>
          <div className="flex flex-col tablet:flex-row-reverse tablet:self-end gap-3">
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
