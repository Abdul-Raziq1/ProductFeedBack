import { FaChevronLeft } from "react-icons/fa";
import { useLoaderData, useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import axiosUtil from "../data/suggestions";
import Suggestion from "../components/Suggestion";
import DetailedComments from "../components/DetailedComments";

async function detailsLoader({ params }) {
  const suggestion = await axiosUtil.getSuggestionWithId(params.id);
  return suggestion;
}

const Comments = () => {
  const navigate = useNavigate();
  const backClickHandler = () => {
    navigate(-1);
  };
  const suggestion = useLoaderData();

  return (
    <div className="min-h-screen p-7 bg-grayTheme flex flex-col gap-10 select-none">
      <div className="flex justify-between">
        <div onClick={backClickHandler} className="flex gap-2 items-center">
          <FaChevronLeft className="w-2 text-blueTheme" />
          <span className="hover:underline font-semibold text-darkGrayTheme">
            Go Back
          </span>
        </div>
        <CustomButton text={"Edit Feedback"} color={"#4661E6"} />
      </div>
      <div className="flex flex-col">
        <Suggestion suggestion={suggestion} />
        <span>{suggestion.numOfMessages}</span>
        <div className=" p-3 bg-white rounded-xl">
          {suggestion.messages.map((message) => {
            return <DetailedComments key={message.id} message={message} />;
          })}
        </div>
      </div>
    </div>
  );
};

export { detailsLoader, Comments };
