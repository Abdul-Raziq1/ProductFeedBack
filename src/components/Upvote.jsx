import { FaChevronUp } from 'react-icons/fa'
import PropTypes from 'prop-types'

const Upvote = ({upvotes}) => {
  const upvoteHandler = (event) => {
    event.stopPropagation()
    console.log("Upvote")
  }
  return (
    <div onClick={upvoteHandler} className='flex justify-center gap-2 px-2 py-1 items-center bg-grayTheme rounded-lg'>
        <FaChevronUp className='w-3 text-blueTheme font-bold'/>
        <span className='font-bold text-blueBlackTheme'>{upvotes}</span>
    </div>
  )
}

Upvote.propTypes = {
  upvotes: PropTypes.number
}

export default Upvote
