import detective from "/assets/suggestions/illustration-empty.svg"
import LinkButton from "../components/LinkButtons";

const NoFeedback = () => {
  return (
    <div className="bg-grayTheme min-h-screen tablet:max-w-xl tablet:mx-auto desktop:max-w-5xl desktop:mx-auto flex flex-col">
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
            You are reaching into the Future a bit. There&apos;s nothing here in the Now
          </blockquote>
          <div className="flex gap-4">
            <LinkButton
              text={"Back to the Past"}
              color={"#AD1FEA"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoFeedback;
