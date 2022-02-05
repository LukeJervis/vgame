import { observer } from 'mobx-react'
import { useRootStore } from '../provider/RootStoreProvider'
import { useEffect } from 'react'

const HeroMoney = () => {

    const { countStore: { coinSort, heroMoney, ironCoin, copperCoin, silverCoin, goldCoin } } = useRootStore()

    useEffect(() => {
        coinSort()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [heroMoney])

    return (
        <div className='heroMoney__container'>
            <div className='heroMoney__amount'>
                iron {ironCoin} - copper {copperCoin} - silver {silverCoin} - Gold {goldCoin}
            </div>
        </div>
    )
}

export default observer(HeroMoney)