import { FaChevronLeft, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ADD_FEEDBACK, IN_PROGRESS, LIVE, PLANNED } from "../data/types";
import LinkButton from "../components/LinkButtons";
import { useContext, useEffect, useRef, useState } from "react";
import ShowRoadMap from "../components/ShowRoadMap";
import { FeedbackContext } from "../context/FeedbackContext";

const Roadmap = () => {
  const [index, setIndex] = useState({ currentIndex: 0, prevIndex: 0 });
  const { updateStatus } = useContext(FeedbackContext);
  const roadmapRef = useRef();
  const navigate = useNavigate();
  const backClickHandler = () => {
    navigate(-1);
  };
  const switchIndex = (newIndex) => {
    setIndex((prevState) => {
      return { currentIndex: newIndex, prevIndex: prevState.currentIndex };
    });
  };
  const mapIndexToStatus = (index) => {
    const status = {
      0: {
        title: `${PLANNED} (${updateStatus.planned.length})`,
        description: "Ideas prioritized for research",
        cards: updateStatus.planned,
        color: "#d97706",
      },
      1: {
        title: `${IN_PROGRESS} (${updateStatus.inProgress.length})`,
        description: "Currently being developed",
        cards: updateStatus.inProgress,
        color: "#AD1FEA",
      },
      2: {
        title: `${LIVE} (${updateStatus.live.length})`,
        description: "Released features",
        cards: updateStatus.live,
        color: "#4661E6",
      },
    };
    return status[index];
  };
  useEffect(() => {
    const roadmap = roadmapRef.current;
    const MOVE_THRESHOLD = 100;

    let initialX = 0;
    let moveX = 0;
    const onTouchStart = (e) => {
      initialX = e.touches[0].pageX;
    };
    const onTouchMove = (e) => {
      let currentX = e.touches[0].pageX;
      moveX = currentX - initialX;
    };
    const onTouchEnd = () => {
      if (moveX < MOVE_THRESHOLD * Math.sign(moveX)) {
        if (index.currentIndex === 2) {
          return;
        } else {
          setIndex((prevState) => {
            return { ...prevState, currentIndex: prevState.currentIndex + 1 };
          });
        }
      } else if (moveX > MOVE_THRESHOLD * Math.sign(moveX)) {
        if (index.currentIndex === 0) {
          return;
        } else {
          setIndex((prevState) => {
            return { ...prevState, currentIndex: prevState.currentIndex - 1 };
          });
        }
      }
      moveX = 0;
    };
    roadmap.addEventListener("touchstart", onTouchStart);
    roadmap.addEventListener("touchmove", onTouchMove);
    roadmap.addEventListener("touchend", onTouchEnd);


    return () => {
      roadmap.removeEventListener("touchstart", onTouchStart);
      roadmap.removeEventListener("touchmove", onTouchMove);
      roadmap.removeEventListener("touchend", onTouchEnd);
    };
  }, [index]);
  return (
    <div className="min-h-screen w-screen bg-grayTheme overflow-x-hidden">
      <div className="bg-blueBlackTheme text-white p-6 flex justify-between items-center">
        <div className="flex flex-col">
          <div
            onClick={backClickHandler}
            className="cursor-pointer w-fit flex gap-2 items-center"
          >
            <FaChevronLeft className="w-2" />
            <span className="hover:underline font-semibold">Go Back</span>
          </div>
          <span className="text-xl font-bold">Roadmap</span>
        </div>
        <LinkButton icon={<FaPlus />} text={ADD_FEEDBACK} color={"#AD1FEA"} />
      </div>
      <div className="flex justify-around py-4">
        <div
          onClick={() => switchIndex(0)}
          className="flex flex-col w-full border-b-2"
        >
          <span
            className={`font-semibold  text-center pb-4 px-4 text-blueBlackTheme`}
          >
            Planned ({updateStatus.planned.length})
          </span>
          <div
            className={`w-full ease-in-out transition-transform h-1 ${
              index.currentIndex === 0 && index.prevIndex === 0
                ? "translate-x-0 bg-amber-600"
                : index.currentIndex === 1 && index.prevIndex === 0
                ? "translate-x-full bg-purpleTheme"
                : index.currentIndex === 2 && index.prevIndex === 0
                ? "translate-x-[280px]  bg-amber-600"
                : "opacity-0"
            }`}
          ></div>
        </div>
        <div
          onClick={() => switchIndex(1)}
          className="flex flex-col w-full border-b-2"
        >
          <span
            className={`font-semibold flex-1 text-center pb-4 px-3 text-blueBlackTheme`}
          >
            In-Progress ({updateStatus.inProgress.length})
          </span>
          <div
            className={`w-full ease-in-out transition-transform  h-1 ${
              index.currentIndex === 1 && index.prevIndex === 1
                ? "translate-x-0 bg-purpleTheme"
                : index.currentIndex === 0 && index.prevIndex === 1
                ? "-translate-x-full bg-amber-600"
                : index.currentIndex === 2 && index.prevIndex === 1
                ? "translate-x-full bg-blueTheme"
                : "opacity-0"
            }`}
          ></div>
        </div>
        <div
          onClick={() => switchIndex(2)}
          className="flex flex-col w-full border-b-2"
        >
          <span
            className={`font-semibold flex-1 text-center pb-4 px-4 text-blueBlackTheme`}
          >
            Live ({updateStatus.live.length})
          </span>
          <div
            className={`w-full ease-in-out transition-transform h-1 ${
              index.currentIndex === 2 && index.prevIndex === 2
                ? "translate-x-0 bg-blueTheme"
                : index.currentIndex === 0 && index.prevIndex === 2
                ? "-translate-x-[280px] bg-amber-600"
                : index.currentIndex === 1 && index.prevIndex === 2
                ? "-translate-x-full bg-purpleTheme"
                : "opacity-0"
            }`}
          ></div>
        </div>
      </div>
      <div ref={roadmapRef} className="">
        <div className="mx-4">
          <ShowRoadMap status={mapIndexToStatus(index.currentIndex)} />
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
