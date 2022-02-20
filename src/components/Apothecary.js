import { useRootStore } from '../provider/RootStoreProvider'

const Apothecary = () => {
    const { heroStatsStore: { maxHealth, health, heroHeal } } = useRootStore()
    const { countStore: { heroLevel, heroMoney } } = useRootStore()

    let healCost = 0

    const healHero = () => {
        if (heroLevel <= 20 || heroMoney < (maxHealth - health)) {
            healCost = 0
        } else {
            healCost = maxHealth - health
        }
        console.log('heal');
        heroHeal()
    }

    return (
        <div className="apothecary__container">
            <div className="apothecary__cost">cost: {healCost}</div>
            <button onClick={() => healHero()}>Pay</button>
        </div>
    )
}

export default Apothecary