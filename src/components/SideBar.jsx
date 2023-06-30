import { useContext } from "react";
import Category from "./Category";
import { FeedbackContext } from "../context/FeedbackContext";

const SideBar = () => {
  const {setFilterBy, selected } = useContext(FeedbackContext)
  const categoryHandler = (category) => {
    setFilterBy(category)
  }
  return (
    <div className="absolute top-full right-0 z-10 p-4 bg-grayTheme flex flex-col h-screen">
      <div className="flex flex-col bg-white rounded-xl">
        <div className="flex flex-col p-7 pb-10 gap-4">
          <div className="flex gap-4">
            <Category selected={selected} onClick={categoryHandler} category={"All"} />
            <Category selected={selected} onClick={categoryHandler} category={"UI"} />
            <Category selected={selected} onClick={categoryHandler} category={"UX"} />
          </div>
          <div className="flex gap-4">
            <Category selected={selected} onClick={categoryHandler} category={"Enhancement"} />
            <Category selected={selected} onClick={categoryHandler} category={"Bug"} />
          </div>
          <Category selected={selected} onClick={categoryHandler} category={"Feature"} />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
