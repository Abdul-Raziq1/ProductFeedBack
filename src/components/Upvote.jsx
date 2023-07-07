import { FaChevronUp } from 'react-icons/fa'
import PropTypes from 'prop-types'

const Upvote = ({numOfUpvotes}) => {
  const upvoteHandler = (event) => {
    event.stopPropagation()
    console.log("Upvote")
  }
  return (
    <div onClick={upvoteHandler} className='flex justify-center gap-2 px-2 py-1 items-center bg-grayTheme rounded-lg'>
        <FaChevronUp className='w-3 text-blueTheme font-bold'/>
        <span className='font-bold text-blueBlackTheme'>{numOfUpvotes}</span>
    </div>
  )
}

Upvote.propTypes = {
    numOfUpvotes: PropTypes.number
}

export default Upvote
