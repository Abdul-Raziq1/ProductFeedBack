/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import CustomSelect from "./CustomSelect";
const InputField = ({
  title,
  titleValue,
  descriptionValue,
  categoryValue,
  titleHandler,
  descriptionHandler,
  categoryHandler,
  options,
  description,
  inputType,
  warn,
  placeholder = "",
}) => {
  const mapTextToInput = (type) => {
    const inputElements = {
      text: (
        <input
          onChange={titleHandler}
          value={titleValue}
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
          onChange={categoryHandler}
          defaultValue={{label: categoryValue, value: categoryValue}}
        />
      ),
      textarea: (
        <textarea
          onChange={descriptionHandler}
          placeholder={placeholder}
          value={descriptionValue}
          rows={3}
          className="rounded bg-grayTheme p-3 focus:outline-blueTheme outline-offset-0 outline-1 outline-none"
        ></textarea>
      ),
    };
    return inputElements[type];
  };
  return (
    <div className="flex flex-col">
      {title !== undefined && (
        <span className="font-semibold text-lighterBlueBlackTheme">
          {title}
        </span>
      )}
      {description !== undefined && (
        <span className=" mb-5 text-darkGrayTheme text-opacity-50">
          {description}
        </span>
      )}
      {mapTextToInput(inputType)}
    </div>
  );
};

InputField.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  inputType: PropTypes.string,
  warn: PropTypes.bool,
  placeholder: PropTypes.string,
};
export default InputField;
