import LinkButton from "../components/LinkButtons";
import detective from "/assets/suggestions/illustration-empty.svg"

const PageNotFound = () => {
  return (
    <div className="min-h-screen w-screen tablet:max-w-xl tablet:mx-auto desktop:max-w-5xl desktop:mx-auto p-7 bg-grayTheme flex flex-col">
      <div className="bg-white py-20 rounded-lg my-auto">
        <div className="flex w-full gap-10 flex-col justify-center items-center">
          <img
            className="h-36 w-36"
            src={detective}
            alt="searching for results"
          />
          <h1 className="text-blueBlackTheme text-center text-4xl tablet:text-5xl font-bold">Where are you hiding...</h1>
          <div className="w-10/12 text-center">
            <h3 className="text-blueBlackTheme text-2xl font-semibold">
              We&apos;re not sure how you got here...
            </h3>
            <h3 className="text-blueBlackTheme text-2xl font-semibold">
              But you may be lost in cyberspace.
            </h3>
          </div>
          <LinkButton text={"Take me home"} color={"#4661E6"} />
          {/* <a href="/" className="bg-blueTheme px-4 py-2 rounded-lg">Take me home</a> */}
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
