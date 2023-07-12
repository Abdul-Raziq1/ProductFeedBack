// import PropType from 'prop-types'
import CustomButton from "../components/CustomButton";
import { categoryOptions, statusOptions } from "../data/types";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import FloatingActionButton from "../components/FloatingActionButton";
import InputField from "../components/InputField";
import { useContext, useState } from "react";
import editIcon from "/assets/shared/icon-edit-feedback.svg";
import { FeedbackContext } from "../context/FeedbackContext";
import util from "../data/service";

const EditScreen = () => {
  const [showWarning, setShowWarning] = useState({
    titleWarning: false,
    descriptionWarning: false,
  });
  const { setFetchData, setSuggestions } = useContext(FeedbackContext);
  const navigate = useNavigate();
  const backClickHandler = () => {
    navigate(-1);
  };
  const suggestion = useLoaderData();
  const title = suggestion.title;
  const [editedFeedback, setEditedFeedback] = useState(suggestion);
  const titleChangeHandler = (event) => {
    setEditedFeedback((prevState) => {
      return { ...prevState, title: event.target.value };
    });
  };

  const descriptionChangeHandler = (event) => {
    setEditedFeedback((prevState) => {
      return { ...prevState, description: event.target.value };
    });
  };

  const addCategoryHandler = (selectedValue) => {
    setEditedFeedback((prevState) => {
      return { ...prevState, category: selectedValue.value };
    });
  };

  const addStatusHandler = (selectedValue) => {
    setEditedFeedback((prevState) => {
      return { ...prevState, status: selectedValue.value };
    });
  };

  const saveEditHandler = (event) => {
    event.preventDefault();
    if (!/\S/.test(editedFeedback.title)) {
      setShowWarning((prevState) => ({ ...prevState, titleWarning: true }));
      setTimeout(() => {
        setShowWarning((prevState) => ({ ...prevState, titleWarning: false }));
      }, 1500);
      return;
    }
    if (!/\S/.test(editedFeedback.description)) {
      setShowWarning((prevState) => ({ ...prevState, descriptionWarning: true }));
      setTimeout(() => {
        setShowWarning((prevState) => ({ ...prevState, descriptionWarning: false }));
      }, 1500);
      return;
    }
    util.editFeedback(editedFeedback.id, editedFeedback).then((response) => {
      setSuggestions((prevState) => {
        const updatedSuggestions = prevState.map((state) => {
          if (state.id === response.id) {
            return response;
          }
          return state;
        });
        return updatedSuggestions;
      });
    });
    setFetchData((prevState) => !prevState);
    navigate(-1);
  };

  const deleteHandler = () => {
    const deletedId = editedFeedback.id;
    util.deleteFeedback(editedFeedback.id).then(() => {
      setSuggestions((prevState) => {
        const updatedSuggestions = prevState.filter(
          (state) => state.id !== deletedId
        );
        return updatedSuggestions;
      });
    });
    setFetchData((prevState) => !prevState);
    navigate("/");
  };

  return (
    <div className="min-h-screen py-7 desktop:max-w-2xl desktop:mx-auto desktop:py-20 tablet:px-6 px-4 bg-grayTheme flex flex-col gap-10 select-none">
      <div
        onClick={backClickHandler}
        className="cursor-pointer w-fit flex gap-2 items-center desktop:text-xl desktop:mb-4"
      >
        <FaChevronLeft className="w-2 text-blueTheme" />
        <span className="hover:underline font-semibold text-darkGrayTheme">
          Go Back
        </span>
      </div>
      <div className="tablet:px-12 tablet:pb-10 flex-1 pt-14 pb-7 px-5 relative rounded-xl bg-white">
        <FloatingActionButton
          icon={<img src={editIcon} className="desktop:w-14 desktop:h-14" />}
        />
        <h2 className="tablet:text-3xl text-2xl mb-5 font-semibold text-lighterBlueBlackTheme">
          Editing &apos;{title}&apos;
        </h2>
        <form noValidate className="flex flex-col gap-7">
          <div>
            <InputField
              title={"Feedback Title"}
              description={"Add a short descriptive headline"}
              titleValue={editedFeedback.title}
              titleHandler={titleChangeHandler}
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
            options={categoryOptions}
            categoryValue={editedFeedback.category}
            categoryHandler={addCategoryHandler}
          />

          <InputField
            title={"Update Status"}
            description={"Choose feature state"}
            inputType={"select"}
            options={statusOptions}
            categoryValue={editedFeedback.status}
            categoryHandler={addStatusHandler}
          />
          <div>
            <InputField
              title={"Feedback Detail"}
              description={
                "Include any specific comments on what should be improved, added, etc"
              }
              inputType={"textarea"}
              descriptionHandler={descriptionChangeHandler}
              descriptionValue={editedFeedback.description}
              warn={showWarning.descriptionWarning}
            />
            {showWarning.descriptionWarning && (
              <span className="text-red-600">Can&apos;t be empty</span>
            )}
          </div>
          <div className="flex flex-col tablet:flex-row-reverse tablet:justify-between gap-3">
            <div className="flex flex-col gap-3 tablet:flex-row-reverse">
              <CustomButton
                type={"submit"}
                color={"#AD1FEA"}
                text={"Save Changes"}
                onClick={saveEditHandler}
              />
              <CustomButton
                color={"#3A4374"}
                text={"Cancel"}
                onClick={backClickHandler}
              />
            </div>
            <CustomButton
              color={"#D73737"}
              text={"Delete"}
              onClick={deleteHandler}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditScreen;
