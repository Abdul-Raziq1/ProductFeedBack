import PropTypes from "prop-types";
import { BUG, ENHANCEMENT, FEATURE, UI, UX } from "../data/types";
import CustomSelect from "./CustomSelect";
import { useContext } from "react";
import { FeedbackContext } from "../context/FeedbackContext";
const InputField = ({ title, description, inputType, warn }) => {
  const { feedback, setFeedback } = useContext(FeedbackContext);
  const mapTextToInput = (type) => {
    const options = [
      { value: FEATURE, label: FEATURE },
      { value: UI, label: UI },
      { value: UX, label: UX },
      { value: ENHANCEMENT, label: ENHANCEMENT },
      { value: BUG, label: BUG },
    ];

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

    const inputElements = {
      text: (
        <input
          onChange={titleChangeHandler}
          value={feedback.title}
          type="text"
          className={`rounded ${
            warn ? "outline-red-500" : "focus:outline-blueTheme"
          } bg-grayTheme p-3  outline-offset-0 outline-1 outline-none`}
        />
      ),
      select: (
        <CustomSelect
          override
          className="rounded p-3"
          options={options}
          onChange={addCategoryHandler}
        />
      ),
      textarea: (
        <textarea
          onChange={descriptionChangeHandler}
          value={feedback.description}
          rows={3}
          className="rounded bg-grayTheme p-3 focus:outline-blueTheme outline-offset-0 outline-1 outline-none"
        ></textarea>
      ),
    };
    return inputElements[type];
  };
  return (
    <div className="flex flex-col">
      <span className="font-semibold text-lighterBlueBlackTheme">{title}</span>
      <span className=" mb-5 text-darkGrayTheme text-opacity-50">
        {description}
      </span>
      {mapTextToInput(inputType)}
    </div>
  );
};

InputField.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  inputType: PropTypes.string,
  warn: PropTypes.bool
};
export default InputField;
