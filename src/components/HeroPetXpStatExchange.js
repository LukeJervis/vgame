import { useRootStore } from '../provider/RootStoreProvider'

const HeroPetXpStatExchange = () => {
    const { heroInventoryStore: { heroPetSlotsArray } } = useRootStore()

    const listHeroPets = heroPetSlotsArray.map(heroPets => 
        <div key={Math.random().toString(36)} className="heroPetshop__weapon">
            <div key={Math.random().toString(36)} className="heroPetshop__name">{heroPets.name}</div>
            <div key={Math.random().toString(36)} className="heroPetshop__cost">Cost: {heroMoneyConverter(heroPets.cost)}</div>
            <div key={Math.random().toString(36)} className="heroPetshop__damage">Damage Multiplier: {heroPets.damage}</div>
            <button className="heroPetshop__buyButton" onClick={() => heroWeaponPurchase(heroPets)} key={heroPets.id}>Buy</button>
        </div>
    )
}