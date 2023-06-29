import PropTypes from 'prop-types'

const Category = ({category}) => {
  return (
    <div className='py-1 px-5 text-blueTheme font-semibold bg-lighterBlueTheme bg-opacity-10 rounded-xl'>
        <span>{category}</span>
    </div>
  )
}

Category.propTypes = {
    category: PropTypes.string
}
export default Category
