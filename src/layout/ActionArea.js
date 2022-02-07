import { observer } from "mobx-react"
import { useEffect, useRef } from "react"
import { useRootStore } from '../provider/RootStoreProvider'
import './actionArea.css'

const ActionArea = () => {

    const { heroActionStore: { selectedActionArea } } = useRootStore()
    const { heroActionStore: { monsterMoneyDrop } } = useRootStore()

    let initialLoad = useRef(true)

    useEffect(() => {
        if (initialLoad) {
            initialLoad = false
        }
        // InfoModal()
        // eslint-disable-next-line react-hooks/exhaustive-deps
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