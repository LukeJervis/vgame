import { observer } from "mobx-react"
import { useRootStore } from '../provider/RootStoreProvider'
import PatrolBattle from './PatrolLocations/PatrolBattle'

const BattleLocations = () => {

    const { heroActionStore: { patrolBattleStart } } = useRootStore()

    const chooseLocation = (newArea) => {
        if (newArea === "cityOutskirts") {
            // PatrolBattle('City Outskirts', 0, 9)
            patrolBattleStart('City Outskirts', 0, 9)
        } else {
            console.log('No location chosen!')
            // PatrolBattle('City Outskirts', 0, 9)
        }
    
    }

    return (
        <div className='battleLocations'>
            <div className='battleLocations__cityOutskirts'>
                City Outskirts
                <button className='battleLocations__cityOutskirts--button' onClick={() => chooseLocation("cityOutskirts")}>Patrol</button>
            </div>
        </div>
    )

}

export default observer(BattleLocations)