import PropTypes from "prop-types";
import { useContext } from "react";
import { FeedbackContext } from "../context/FeedbackContext";

const Category = ({ category, onClick, selected, isPresentational }) => {
  const { setSelected, filterBy } = useContext(FeedbackContext);
  const handleClick = (category) => {
    if (isPresentational){
      return
    }
    onClick(category);
    setSelected(true)
  };
  return (
    <div
      onClick={() => handleClick(category)}
      className={`${
        filterBy === category && selected ? "bg-blueTheme text-white hover:bg-blueTheme hover:bg-opacity-100" : "bg-lighterBlueTheme bg-opacity-10 text-blueTheme"
      } w-fit cursor-pointer py-1 px-5  font-semibold rounded-xl ${isPresentational === undefined && "hover:bg-blueTheme hover:bg-opacity-25"}`}
    >
      <span>{category}</span>
    </div>
  );
};

Category.propTypes = {
  category: PropTypes.string,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  isPresentational: PropTypes.bool
};
export default Category;
