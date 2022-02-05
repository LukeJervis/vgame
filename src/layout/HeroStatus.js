import { observer } from 'mobx-react-lite'
import { useRootStore } from '../provider/RootStoreProvider'

const HeroStatus = () => {

    const { heroStatsStore: { health } } = useRootStore()

    return (
        <div className="heroStatus__container">
            <div className="heroStatus__health">
                Health: {health}
            </div>
        </div>
    )

}

export default observer(HeroStatus)