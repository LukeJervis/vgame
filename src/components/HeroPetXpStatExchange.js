import { useRootStore } from '../provider/RootStoreProvider'
import { observer } from "mobx-react"

const HeroPetXpStatExchange = () => {
    const { heroInventoryStore: { heroPetSlotsArray } } = useRootStore()
    const { countStore: { experiance, spendExperiance } } = useRootStore ()
    const { heroStatsStore: { handlePetStatBuy } } = useRootStore()

    const strengthBuy = 'strength'
    const speedBuy = 'speed'
    const luckBuy = 'luck'
    const healthBuy = 'health'

    const petStatBuy = (petObject, petStat) => {
        if (experiance < petObject.statCost) {
            console.log('Not enough XP!');
        } else if (petStat === 'health'){
            spendExperiance(petObject.healthStatCost)
            handlePetStatBuy(petObject, petStat)
        } else {
            spendExperiance(petObject.statCost)
            handlePetStatBuy(petObject, petStat)
        }
    }

    const listHeroPets = heroPetSlotsArray.map(heroPets => 
        <div key={Math.random().toString(36)} className='heroPetXpStatExchange__container'>
            <div key={Math.random().toString(36)} className='heroPetXpStatExchange__health'>
                Health: {heroPets.health}
                <button key={Math.random().toString(36)} className='heroPetXpStatExchange__strength' onClick={() => petStatBuy(heroPets, healthBuy)}>Buy {Math.floor(heroPets.healthStatCost * heroPets.healthStatMulti)}XP</button>
            </div>
            <div key={Math.random().toString(36)} className='heroPetXpStatExchange__strength'>
                Strength: {heroPets.strength}
                <button key={Math.random().toString(36)} className='heroPetXpStatExchange__strength--button' onClick={() => petStatBuy(heroPets, strengthBuy)}>Buy {Math.floor(heroPets.statCost)}XP</button>
            </div>
            <div key={Math.random().toString(36)} className='heroPetXpStatExchange__speed'>
                Speed: {heroPets.speed}
                <button key={Math.random().toString(36)} className='heroPetXpStatExchange__Speed--button' onClick={() => petStatBuy(heroPets, speedBuy)}>Buy {Math.floor(heroPets.statCost)}XP</button>
            </div>
            <div key={Math.random().toString(36)} className='heroPetXpStatExchange__luck'>
                Luck: {heroPets.luck}
                <button key={Math.random().toString(36)} className='heroPetXpStatExchange__Luck--button' onClick={() => petStatBuy(heroPets, luckBuy)}>Buy {Math.floor(Math.floor(heroPets.statCost))}XP</button>
            </div>
        </div> 
    )

    return (
        <div>
            {listHeroPets}
        </div>
    )

}

export default observer(HeroPetXpStatExchange)