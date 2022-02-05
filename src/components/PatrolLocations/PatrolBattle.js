import { observer } from 'mobx-react'
import { useRootStore } from '../../provider/RootStoreProvider'
import './patrolBattle.css'

const PatrolBattle = (props) => {
    
    const { heroActionStore: { patrolBattleAttack, monsterHealth, monsterLevel, monsterName, underAttack, patrolBattleStart } } = useRootStore()

    const continuePatrol = () => {
        if (underAttack) {
            console.log('Still in battle')
        } else {
            patrolBattleStart(props.location)
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
            </div>
        </div>
    )
}

export default observer(PatrolBattle)

/*
    load hero health                                    /
    random number maker 0 - 9                           /
    number used to select slime in array                /
    get stats of slime                                  /
    use stats to remove hero health                     /
    clickable div to reduce monster health              /
    create attack logic          }                      /
    create being attacked logic  ¦                      /
    check monster health above 0 ¦                      /
    check hero health above 0    }                      /
    hero death penalty           ¦                      
    monster death reward         }                      /
    Create continue button                              /
*/