import './infoModal.css'
import { observer } from 'mobx-react'
import { useRootStore } from '../../provider/RootStoreProvider'
import { useEffect, useState } from 'react'
import { heroMoneyConverter } from '../helpers'

const InfoModal = () => {

    const { heroActionStore: { 
        monsterName,
        monsterLevel,
        monsterXp,
        monsterMoneyDrop,
        monsterDeath,
        patrolBattleStart,
        location,
        monsterLevelMin,
        monsterLevelMax,
        underAttack
        }} = useRootStore()

    const { heroStatsStore: { heroDeath, health } } = useRootStore()

    const [ buttonBoolean, setButtonBoolean ] = useState(true)

    useEffect(() => {
        if (monsterDeath) {
            const openModal = () => {
                document.getElementById(`infoModal__${monsterName}`).style.display = "block";
            }
            openModal()
            buttonTimer()
        } else if (heroDeath) {
            const openModal = () => {
                document.getElementById(`infoModal__${monsterName}`).style.display = "block";
            }
            openModal()
            buttonTimer()
        }
    }, [monsterDeath, heroDeath])

    const closeModal = () => {
        document.getElementById(`infoModal__${monsterName}`).style.display = "none";
    }

    const handleContinueButton = () => {
        if (underAttack) {
            console.log('Still in battle')
        } else if (health <= 0){
            console.log('You is dead brah');
        } else {
            setButtonBoolean(true)
            patrolBattleStart(location,
                monsterLevelMin,
                monsterLevelMax,)
        }
        closeModal()
    }
    
    const handleBackButton = () => {
        setButtonBoolean(true)
        patrolBattleStart()
    }

    const buttonTimer = () => {
        setTimeout(toggleDisabled, 1000)
    }

    const toggleDisabled = () => {
        setButtonBoolean(false)
    }

    if (monsterDeath) {
        return (
            <div className="infoModal">
                <div id={`infoModal__${monsterName}`} className="infoModal__modal">
                    <div className='infoModal__modal--open'>
                        <div className='infoModal__modalContents'>
                            {`You killed ${monsterName} level: ${monsterLevel}!`}
                        </div>
                        <div className='infoModal__patrolWin__xpReward'>
                            {`You gained ${monsterXp} XP `}
                        </div>
                        <div className='infoModal__patrolWin__moneyReward'>
                            {heroMoneyConverter(monsterMoneyDrop)} Gained.
                        </div>
                        <button className='PatrolBattle__continueButton' disabled={buttonBoolean} onClick={() => handleContinueButton()}>Continue</button>
                        <button className='PatrolBattle__backButton' disabled={buttonBoolean} onClick={() => handleBackButton()}>Back</button>
                    </div>
                </div>
            </div>
        )
        } else if (heroDeath) {
            return (
                <div className="infoModal">
                <div id={`infoModal__${monsterName}`} className="infoModal__modal">
                    <div className='infoModal__modal--open'>
                        <div className='infoModal__modalContents'>
                            {`You were killed by a ${monsterName} level: ${monsterLevel}!`}
                        </div>
                        <div className='infoModal__patrolWin__moneyLoss'>
                            It will cost you 10% of your money to revive!
                        </div>
                        <button className='PatrolBattle__backButton' disabled={buttonBoolean} onClick={() => handleBackButton()}>Back</button>
                    </div>
                </div>
            </div>
            )
        } else {
            return (
            <></>
            )
        }
}

export default observer(InfoModal)