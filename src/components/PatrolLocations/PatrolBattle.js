import { observer } from 'mobx-react'
import { useRootStore } from '../../provider/RootStoreProvider'
import './patrolBattle.css'

const PatrolBattle = (props) => {
    
    const { heroActionStore: { patrolBattleAttack, monsterHealth, monsterLevel, monsterName, underAttack, patrolBattleStart } } = useRootStore()
    const { heroStatsStore: { health } } = useRootStore()

    const continuePatrol = () => {
        if (underAttack) {
            console.log('Still in battle')
        } else if (health <= 0){
            console.log('You is dead brah');
        } else {
            patrolBattleStart(props.location, props.num1, props.num2)
        }
    }

    return (
        <div className='patrolBattle__container' >
            <div className='PatrolBattle--attack' onClick={() => patrolBattleAttack()}>
                <div className='patrolBattle__infoCollection'>
                    <div className='patrolBattle__areaName'>
                        {props.location}
                    </div>
                    <div className='PatrolBattle__monsterName'>
                        {monsterName}
                    </div>
                    <div className='PatrolBattle__monsterLevel'>
                        Level: {monsterLevel}
                    </div>
                    <div className='PatrolBattle__monsterHealth'>
                        Health: {monsterHealth}
                    </div>
                </div>
                HIT
                <button className='PatrolBattle__continueButton' onClick={continuePatrol}>Continue</button>
                <button className='PatrolBattle__backButton' onClick={() => patrolBattleStart()}>Back</button>
            </div>
        </div>
    )
}

export default observer(PatrolBattle)