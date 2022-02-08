import './infoModal.css'
import { observer } from 'mobx-react'
import { useRootStore } from '../../provider/RootStoreProvider'
import { useEffect } from 'react'
import { heroMoneyConverter } from '../helpers'

const InfoModal = () => {

    const { heroActionStore: { monsterName, monsterLevel, monsterXp, monsterMoneyDrop, monsterDeath, patrolBattleStart } } = useRootStore()
    const { heroStatsStore: { heroDeath } } = useRootStore()

    useEffect(() => {
        if (monsterDeath) {
            const openModal = () => {
                document.getElementById(`infoModal__${monsterName}`).style.display = "block";
            }
            openModal()
        } else if (heroDeath) {
            const openModal = () => {
                document.getElementById(`infoModal__${monsterName}`).style.display = "block";
            }
            openModal()
        }
    }, [monsterDeath, heroDeath])

    const closeModal = () => {
        document.getElementById(`infoModal__${monsterName}`).style.display = "none";
    }

    const handleBackButton = () => {
        patrolBattleStart()
        closeModal()
    }

    if (monsterDeath) {
        return (
            <div className="infoModal">
                <div id={`infoModal__${monsterName}`} className="infoModal__modal">
                    <div className='infoModal__modal--open'>
                        <span className="infoModal__modal--close" onClick={closeModal}>&times;</span>  
                        <div className='infoModal__modalContents'>
                            {`You killed ${monsterName} level: ${monsterLevel}!`}
                        </div>
                        <div className='infoModal__patrolWin__xpReward'>
                            {`You gained ${monsterXp} XP `}
                        </div>
                        <div className='infoModal__patrolWin__moneyReward'>
                            {heroMoneyConverter(monsterMoneyDrop)} Gained.
                        </div>
                        <button className='PatrolBattle__backButton' onClick={() => handleBackButton()}>Back</button>
                    </div>
                </div>
            </div>
        )
        } else if (heroDeath) {
            return (
                <div className="infoModal">
                <div id={`infoModal__${monsterName}`} className="infoModal__modal">
                    <div className='infoModal__modal--open'>
                        <span className="infoModal__modal--close" onClick={closeModal}>&times;</span>  
                        <div className='infoModal__modalContents'>
                            {`You were killed by a ${monsterName} level: ${monsterLevel}!`}
                        </div>
                        <div className='infoModal__patrolWin__moneyLoss'>
                            It will cost you 10% of your money to revive!
                        </div>
                        <button className='PatrolBattle__backButton' onClick={() => handleBackButton()}>Back</button>
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