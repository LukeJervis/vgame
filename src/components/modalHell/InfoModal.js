import './infoModal.css'
import { observer } from 'mobx-react'
import { useRootStore } from '../../provider/RootStoreProvider'

const InfoModal = () => {

    const { heroActionStore: { monsterName, monsterLevel, monsterXp, monsterMoneyDrop } } = useRootStore()

    document.getElementById(`infoModal__${monsterName}`).style.display = "block";

    const closeModal = () => {
        document.getElementById(`infoModal__${monsterName}`).style.display = "none";
    }

    return (
        <div className="infoModal">
            <div id={`infoModal__${monsterName}`} className="infoModal__modal">
                <div className="infoModal__modal--open">
                    <span className="infoModal__modal--close" onClick={closeModal}>&times;</span>
                    <div className="infoModal__modalContents">
                        {monsterName}
                        {monsterLevel}
                        {monsterXp}
                        {monsterMoneyDrop}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(InfoModal)