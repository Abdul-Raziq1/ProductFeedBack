import { useContext } from "react";
import CustomSelect from "./CustomSelect";
import { FeedbackContext } from "../context/FeedbackContext";
import { LEAST_COMMENTS, LEAST_UPVOTES, MOST_COMMENTS, MOST_UPVOTES } from "../data/types";

const SortDropDown = () => {
  const { setSortBy, sortBy } = useContext(FeedbackContext)
  const dropDownItems = [
    { label: MOST_UPVOTES, value: MOST_UPVOTES },
    { label: LEAST_UPVOTES, value: LEAST_UPVOTES },
    { label: MOST_COMMENTS, value: MOST_COMMENTS },
    { label: LEAST_COMMENTS, value: LEAST_COMMENTS },
  ];
  const handleChange = (selectedValue) => {
    setSortBy(selectedValue.value)
  }
  return (
    <div className="flex items-center cursor-pointer">
      <label className="font-bold whitespace-nowrap text-grayTheme">Sort by :</label>
      <div className="desktop:hidden tablet:hidden">
      <CustomSelect options={dropDownItems} onChange={handleChange} defaultValue={{label: sortBy, value: sortBy}}/>

      </div>
      <div className="hidden desktop:flex tablet:flex">
      <CustomSelect options={dropDownItems} onChange={handleChange} containerSize="desktop" defaultValue={{label: sortBy, value: sortBy}}/>

      </div>
    </div>
  );
};

export default SortDropDown;
