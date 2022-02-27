import { observer } from "mobx-react"
import { useRootStore } from '../provider/RootStoreProvider'

const BattleLocations = () => {

    const { heroActionStore: { patrolBattleStart } } = useRootStore()

    //patrolBattleStart("loaction", levelMin, levelMax, monsters index array, field boss index array)
    const chooseLocation = (newArea) => {
        if (newArea === "cityOutskirts") {
            patrolBattleStart('City Outskirts', 0, 9, [0], [])
        } else if (newArea === "cityPlains") {
            patrolBattleStart('City Outskirts', 10, 20, [1, 2, 3], [0, 1, 2])
        } else {
            console.log('No location chosen!')
        }
    
    }

    return (
        <div className='battleLocations'>
            <div className='battleLocations__cityOutskirts'>
                City Outskirts
                <button className='battleLocations__cityOutskirts--button' onClick={() => chooseLocation("cityOutskirts")}> Patrol</button>
            </div>
            <div className='battleLocations__cityPlains'>
                City Plains
                <button className='battleLocations__cityPlains--button' onClick={() => chooseLocation("cityPlains")}> Patrol</button>
            </div>
        </div>
    )

}

export default observer(BattleLocations)