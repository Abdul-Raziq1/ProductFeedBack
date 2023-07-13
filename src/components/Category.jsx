import PropTypes from "prop-types";
import { useContext } from "react";
import { FeedbackContext } from "../context/FeedbackContext";

const Category = ({ category, onClick, selected, isPresentational }) => {
  const { setSelected, filterBy } = useContext(FeedbackContext);
  const handleClick = (category) => {
    if (isPresentational) {
      return;
    }
    onClick(category);
    setSelected(true);
  };
  const styleForFunctional = `${
    filterBy === category && selected
      ? "bg-blueTheme text-white tablet:hover:bg-blueTheme tablet:hover:bg-opacity-100"
      : "bg-lighterBlueTheme bg-opacity-10 text-blueTheme tablet:hover:bg-blueTheme tablet:hover:bg-opacity-25"
  } w-fit cursor-pointer py-1 px-5  font-semibold rounded-xl`
  const styleForPresentational = "bg-lighterBlueTheme bg-opacity-10 text-blueTheme w-fit cursor-pointer py-1 px-5  font-semibold rounded-xl"
  return (
    <div
      onClick={() => handleClick(category)}
      className={isPresentational === true ? styleForPresentational : styleForFunctional}
    >
      <span>{category}</span>
    </div>
  );
};

Category.propTypes = {
  category: PropTypes.string,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  isPresentational: PropTypes.bool,
};
export default Category;
