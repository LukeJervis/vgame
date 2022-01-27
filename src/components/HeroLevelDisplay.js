import { useRootStore } from '../provider/RootStoreProvider'
import { observer } from 'mobx-react'
import { useEffect } from 'react'
import './heroLevelDisplay.css'

const HerolevelDisplay = () => {

    const { countStore: { heroLevel } } = useRootStore()

    useEffect(() => {
        
    }, [heroLevel])

    return (
        <div className="heroLevelDisplay__container">
            <div className="heroLevelDisplay__title">Level:</div>
            {heroLevel}
        </div>
    )
}

export default observer(HerolevelDisplay)