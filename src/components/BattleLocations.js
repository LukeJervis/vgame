import monsters from '../heroEquipment/monsters.json'
import { observer } from "mobx-react"

const BattleLocations = () => {

    return (
        <div className='battleLocations'>
            <div className='battleLocations__cityOutskirts'>
                City Outskirts
                <button className='battleLocations__cityOutskirts--button'>Fight</button>
            </div>
        </div>
    )

}

export default observer(BattleLocations)