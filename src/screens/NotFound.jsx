/* eslint-disable react/prop-types */
import { FaPlus } from "react-icons/fa";
import detective from "/assets/suggestions/illustration-empty.svg"
import LinkButton from "../components/LinkButtons";
import { ADD_FEEDBACK } from "../data/types";
import PropTypes from "prop-types";
import CustomButton from "../components/CustomButton";
import { useLoaderData, useNavigate } from "react-router-dom";
import util from "../data/service";
import { AiOutlineReload } from "react-icons/ai";

const NotFound = ({ error = true }) => {
  const id = useLoaderData();
  const navigate = useNavigate();
  const reload = () => {
    util.getProductRequests().then(() => {
      navigate(`/comments/${id}`, { replace: true });
    });
    util.getUser();
  };
  return (
    <div className="bg-grayTheme flex flex-col">
      <div className="bg-white py-20 rounded-lg my-auto">
        <div className="flex w-full gap-10 flex-col justify-center items-center">
          <img
            className="h-36 w-36"
            src={detective}
            alt="searching for results"
          />
          <h2 className="text-blueBlackTheme text-center text-3xl font-bold">
            There is no feedback yet
          </h2>

          <blockquote className="max-w-sm mx-4 desktop:max-w-xl text-blueBlackTheme text-center text-lg">
            {error === false
              ? "Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app."
              : "Could not find the feedback. It may have been deleted. Please reload the screen"}
          </blockquote>
          <div className="flex gap-4">
            <LinkButton
              icon={<FaPlus />}
              text={ADD_FEEDBACK}
              color={"#AD1FEA"}
            />
            {error && (
              <CustomButton
                icon={<AiOutlineReload className="text-lg" />}
                text={"Reload"}
                color={"#4661E6"}
                onClick={reload}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

PropTypes.NotFound = {
  error: PropTypes.bool,
};
export default NotFound;
