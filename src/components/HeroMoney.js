import { observer } from 'mobx-react'
import { useRootStore } from '../provider/RootStoreProvider'
import { useEffect } from 'react'
import ironCoinLogo from './images/IronCoinTransparent.png'
import copperCoinLogo from './images/CopperCoinTransparent.png'
import silverCoinLogo from './images/SilverCoinTransparent.png'
import goldCoinLogo from './images/GoldCoinTransparent.png'
import './heroMoney.css'

const HeroMoney = () => {

    const { countStore: { coinSort, heroMoney, ironCoin, copperCoin, silverCoin, goldCoin } } = useRootStore()

    useEffect(() => {
        coinSort()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [heroMoney])

    return (
        <div className='heroMoney__container'>
                <img src={ironCoinLogo} className='heroMoneyConverter__coins' height="30px" alt='Iron Coin' title='Iron Coin'/> {ironCoin}
                <img src={copperCoinLogo} className='heroMoneyConverter__coins' height="30px" alt='Copper Coin' title='Copper Coin'/> {copperCoin}
                <img src={silverCoinLogo} className='heroMoneyConverter__coins' height="30px" alt='Silver Coin' title='Silver Coin'/> {silverCoin}
                <img src={goldCoinLogo} className='heroMoneyConverter__coins' height="30px" alt='Gold Coin' title='Gold Coin'/> {goldCoin}
        </div>
    )
}

export default observer(HeroMoney)