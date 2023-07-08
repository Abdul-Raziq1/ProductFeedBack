/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import Comment from "./Comment";
const DetailedComments = ({ message }) => {
  console.log("Message", message);
  return (
    <div>
      <Comment message={message} />
      <div className="">
        {message.replies?.length !== 0 ? (
          message.replies?.map((message) => {
            return (
              <div key={message.id} className="border-l-2 ml-4">
                <Comment message={message} />
              </div>
            );
          })
        ) : (
          <hr className="mx-4" />
        )}
      </div>
    </div>
  );
};

DetailedComments.propTypes = {
  id: PropTypes.string,
  profile: PropTypes.string,
  name: PropTypes.string,
  tag: PropTypes.string,
  comment: PropTypes.string,
  innerMessages: PropTypes.array,
};

export default DetailedComments;
