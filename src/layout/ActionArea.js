import { observer } from "mobx-react"
import { useEffect } from "react"
import { useRootStore } from '../provider/RootStoreProvider'
import InfoModal from "../components/modalHell/InfoModal"
import './actionArea.css'

const ActionArea = () => {

    const { heroActionStore: { selectedActionArea } } = useRootStore()
    const { heroActionStore: { monsterMoneyDrop } } = useRootStore()

    let initialLoad = true

    useEffect(() => {
        if (initialLoad) {
            initialLoad = false
        }
        // InfoModal()
    }, [monsterMoneyDrop])
    
    return (
        <div className="actionArea__container">
            <div className="actionArea__clicker">
                {selectedActionArea}
            </div>
        </div>
    )

}

export default observer(ActionArea)