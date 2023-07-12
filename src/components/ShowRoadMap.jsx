import PropTypes from "prop-types";
import Suggestion from "./Suggestion";

const ShowRoadMap = ({ status }) => {
  const { title, description, cards, color } = status;
  return (
      <div className="flex flex-col gap-2">
        <h2 className="text-xl text-blueBlackTheme font-bold">{title}</h2>
        <span className="mb-3 text-darkGrayTheme">{description}</span>
        {cards.map((card) => {
          return (
            <Suggestion key={card.id} screen="roadmap" suggestion={card} color={color}/>
          );
        })}
      </div>
  );
};

ShowRoadMap.propTypes = {
  status: PropTypes.object,
};
export default ShowRoadMap;
