import Lottie from "lottie-react";
// import loadingAnimation from "../assets/animations/loading.json";
import loadingAnimation from "../assets/animations/99297-loading-files.json";

const Loading = () => {
  return <Lottie animationData={loadingAnimation} className="" loop={true} />;
};

export default Loading;
