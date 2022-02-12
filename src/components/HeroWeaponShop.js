import { observer } from "mobx-react"
import heroWeapons from '../heroEquipment/heroWeapons.json'
import { useRootStore } from '../provider/RootStoreProvider'
import { heroMoneyConverter } from './helpers'
import './heroWeaponShop.css'

const HeroWeaponShop = () => {
    const { heroInventoryStore: { handleBuy } } = useRootStore()

    const heroWeaponPurchase = (purchase) => {
        handleBuy(purchase)
    }

    const listHeroWeapons = heroWeapons.map(heroWeapons => 
        <div key={heroWeapons.id + Math.random().toString(36)} className="heroWeaponShop__weapon">
            <div key={heroWeapons.id + Math.random().toString(36)} className="heroWeaponShop__name">{heroWeapons.name}</div>
            <div key={heroWeapons.id + Math.random().toString(36)} className="heroWeaponShop__cost">Cost: {heroMoneyConverter(heroWeapons.cost)}</div>
            <div key={heroWeapons.id + Math.random().toString(36)} className="heroWeaponShop__damage">Damage Multi: {heroWeapons.damage}</div>
            <button className="heroWeaponShop__buyButton" onClick={() => heroWeaponPurchase(heroWeapons)} key={heroWeapons.id}>Buy</button>
        </div>
    )

    return (

        <div className="heroWeaponShop__container">
            {listHeroWeapons}
        </div>
    )

}

export default observer(HeroWeaponShop)