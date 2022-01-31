import { observer } from 'mobx-react-lite'
import { useRootStore } from '../provider/RootStoreProvider'

const HeroXpStatExchange = () => {
    const { heroStatsStore: { strength, speed, constitution, luck, statCost, handleStatBuy } } = useRootStore()
    const { countStore: { experiance, spendExperiance } } = useRootStore()

    const strengthBuy = 'strength'
    const speedBuy = 'speed'
    const constitutionBuy = 'constitution'
    const luckBuy = 'luck'

    const statBuy = (selectedStat) => {
        console.log('selectedStat', selectedStat);
        if (experiance < statCost) {
            console.log('Not enough XP!');
        } else {
            handleStatBuy(selectedStat)
            spendExperiance(statCost)
        }
    }

    return (
        <div className='HeroXpStatExchange__container'>
            <div className='HeroXpStatExchange__strength'>
                Strength: {strength}
                <button className='HeroXpStatExchange__strength--button' onClick={() => statBuy(strengthBuy)}>Buy {Math.floor(statCost)}XP</button>
            </div>
            <div className='HeroXpStatExchange__speed'>
                Speed: {speed}
                <button className='HeroXpStatExchange__Speed--button' onClick={() => statBuy(speedBuy)}>Buy {Math.floor(statCost)}XP</button>
            </div>
            <div className='HeroXpStatExchange__constitution'>
                Constitution: {constitution}
                <button className='HeroXpStatExchange__Constitution--button' onClick={() => statBuy(constitutionBuy)}>Buy {Math.floor(statCost)}XP</button>
            </div>
            <div className='HeroXpStatExchange__luck'>
                Luck: {luck}
                <button className='HeroXpStatExchange__Luck--button' onClick={() => statBuy(luckBuy)}>Buy {Math.floor(Math.floor(statCost))}XP</button>
            </div>
        </div>
    )

}

export default observer(HeroXpStatExchange)