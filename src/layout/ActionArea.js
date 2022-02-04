import { observer } from "mobx-react"
import { useRootStore } from '../provider/RootStoreProvider'
import './actionArea.css'

const ActionArea = () => {

    const { heroActionStore: { selectedActionArea } } = useRootStore()
    
    return (
        <div className="actionArea__container">
            <div className="actionArea__clicker">
                {selectedActionArea}
            </div>
        </div>
    )

}

export default observer(ActionArea)