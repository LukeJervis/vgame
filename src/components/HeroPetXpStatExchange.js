import { useRootStore } from '../provider/RootStoreProvider'
import { observer } from "mobx-react"

const HeroPetXpStatExchange = () => {
    const { countStore: { experience, spendexperience } } = useRootStore ()
    const { heroStatsStore: { handlePetStatBuy, equipedPet } } = useRootStore()

    const strengthBuy = 'strength'
    const speedBuy = 'speed'
    const luckBuy = 'luck'
    const healthBuy = 'health'

    const petStatBuy = (equipedPet, petStat) => {
        console.log('petStat', equipedPet, petStat);
        if (experience < equipedPet.statCost) {
            console.log('Not enough XP!');
        } else if (petStat === 'health'){
            spendexperience(equipedPet.healthStatCost)
            handlePetStatBuy(equipedPet, petStat)
        } else {
            spendexperience(equipedPet.statCost)
            handlePetStatBuy(equipedPet, petStat)
        }
    }

    const listHeroPets = () => {
        if (equipedPet.name) {
            return (
                <div className='heroPetXpStatExchange__container'>
                <div className='heroPetXpStatExchange__health'>
                    Health {equipedPet.health}
                <button className='heroPetXpStatExchange__strength' onClick={() => petStatBuy(equipedPet, healthBuy)}>Buy {Math.floor(equipedPet.healthStatCost * equipedPet.healthStatMulti)}XP</button>
                </div>
                <div className='heroPetXpStatExchange__strength'>
                    Strength: {equipedPet.strength}
                <button className='heroPetXpStatExchange__strength--button' onClick={() => petStatBuy(equipedPet, strengthBuy)}>Buy {Math.floor(equipedPet.statCost)}XP</button>
                </div>
                <div className='heroPetXpStatExchange__speed'>
                    Speed: {equipedPet.speed}
                    <button className='heroPetXpStatExchange__Speed--button' onClick={() => petStatBuy(equipedPet, speedBuy)}>Buy {Math.floor(equipedPet.statCost)}XP</button>
                </div>
                <div className='heroPetXpStatExchange__luck'>
                    Luck: {equipedPet.luck}
                    <button className='heroPetXpStatExchange__Luck--button' onClick={() => petStatBuy(equipedPet, luckBuy)}>Buy {Math.floor(Math.floor(equipedPet.statCost))}XP</button>
                </div>
            </div> 
        )
        }
    }

    return (
        <div>
            {listHeroPets()}
        </div>
    )

}

export default observer(HeroPetXpStatExchange)