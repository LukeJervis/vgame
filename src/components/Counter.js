import { observer } from 'mobx-react'
import { useRootStore } from '../provider/RootStoreProvider'
import './counter.css'

const ExperianceCounter = () => {

    const { countStore: {experiance, experianceNeeded} } = useRootStore()

    return(

    <div className="ExperianceCounter__container">
        <div className='ExperianceCounter__count'>
            XP {Math.round(experiance)}
        </div>
        <div className='ExperianceCounter__experianceNeeded'>
            XP Needed {experianceNeeded.toFixed(2)}
        </div>
    </div>

    )
}

export default observer(ExperianceCounter)