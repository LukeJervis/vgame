import monsters from '../heroEquipment/monsters.json'
import { observer } from "mobx-react"

const BattleLocations = () => {

    const patrolCityOutskirts = () => {

    }

    return (
        <div className='battleLocations'>
            <div className='battleLocations__cityOutskirts'>
                City Outskirts
                <button className='battleLocations__cityOutskirts--button' onClick={() => patrolCityOutskirts()}>Patrol</button>
            </div>
        </div>
    )

}

export default observer(BattleLocations)