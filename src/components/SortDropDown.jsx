import CustomSelect from "./CustomSelect";

const SortDropDown = () => {
  const dropDownItems = [
    { label: "Most Upvotes", value: "Most Upvotes" },
    { label: "Least Upvotes", value: "Least Upvotes" },
    { label: "Most Comments", value: "Most Comments" },
    { label: "Least Comments", value: "Least Comments" },
  ];
  return (
    <div className="flex items-center">
      <span className="font-bold text-grayTheme">Sort by :</span>
      <CustomSelect options={dropDownItems} />
    </div>
  );
};

export default SortDropDown;
