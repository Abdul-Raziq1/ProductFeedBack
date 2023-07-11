import Roadmap from "./Roadmap"
import RoadmapTablet from "./RoadmapTablet"

const RoadmapScreen = () => {
  return (
    <>
        <div className="tablet:hidden">
            <Roadmap />
        </div>
        <div className="hidden tablet:flex">
            <RoadmapTablet />
        </div>
    </>
  )
}

export default RoadmapScreen
