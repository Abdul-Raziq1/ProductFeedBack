import PropTypes from "prop-types"
const FloatingActionButton = ({icon}) => {
  return (
    <div className="absolute -top-5 left-6 tablet:w-14 tablet:h-14 tablet:left-10 tablet:-top-7 flex justify-center items-center rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="text-white">
        {icon}
      </div>
    </div>
  );
};

FloatingActionButton.propTypes = {
    icon: PropTypes.any
}

export default FloatingActionButton;
