import { observer } from 'mobx-react'
import { useRootStore } from '../provider/RootStoreProvider'
import './counter.css'

const ExperienceCounter = () => {

    const { countStore: {experience, experienceNeeded} } = useRootStore()

    return(

    <div className="experienceCounter__container">
        <div className='experienceCounter__count'>
            XP {Math.round(experience)}
        </div>
        <div className='experienceCounter__experienceNeeded'>
            XP Needed {experienceNeeded.toFixed(2)}
        </div>
    </div>

    )
}

export default observer(ExperienceCounter)