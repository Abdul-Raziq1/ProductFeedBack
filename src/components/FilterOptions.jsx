/* eslint-disable react/prop-types */
import Category from "./Category";
import PropTypes from "prop-types";

const FilterOptions = ({ setFilterBy, selected }) => {
  const categoryHandler = (category) => {
    setFilterBy(category);
  };
  return (
    <div className="flex flex-col bg-white rounded-xl">
      <div className="flex flex-col desktop:p-7 desktop:mx-0 tablet:max-w-sm tablet:mx-auto tablet:px-2 tablet:pb-4 p-7 pb-10 gap-4">
        <div className="flex gap-4 tablet:gap-2">
          <Category
            selected={selected}
            onClick={categoryHandler}
            category={"All"}
          />
          <Category
            selected={selected}
            onClick={categoryHandler}
            category={"UI"}
          />
          <Category
            selected={selected}
            onClick={categoryHandler}
            category={"UX"}
          />
        </div>
        <div className="flex gap-4">
          <Category
            selected={selected}
            onClick={categoryHandler}
            category={"Enhancement"}
          />
          <div className="tablet:hidden">
            <Category
              selected={selected}
              onClick={categoryHandler}
              category={"Bug"}
            />
          </div>
        </div>
        <div className="tablet:flex gap-4">
          <Category
            selected={selected}
            onClick={categoryHandler}
            category={"Feature"}
          />
          <div className="hidden tablet:flex">
            <Category
              selected={selected}
              onClick={categoryHandler}
              category={"Bug"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

PropTypes.propTypes = {
  setFilterBy: PropTypes.func,
  selected: PropTypes.bool,
};

export default FilterOptions;
