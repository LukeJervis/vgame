import { observer } from "mobx-react"
import petList from '../heroEquipment/petList.json'
import { useRootStore } from '../provider/RootStoreProvider'
import { heroMoneyConverter } from './helpers'
import './petShop.css'

const PetShop = () => {
    const { heroInventoryStore: { handlePetBuy } } = useRootStore()

    const petPurchase = (purchase) => {
        handlePetBuy(purchase)
    }

    const listPets = petList.map(petList => 
        <div key={Math.random().toString(36)} className="petShop__weapon">
            <div key={Math.random().toString(36)} className="petShop__name">{petList.name}</div>
            <div key={Math.random().toString(36)} className="petShop__cost">Cost: {heroMoneyConverter(petList.cost)}</div>
            <div key={Math.random().toString(36)} className="petShop__health">Health: {petList.health}</div>
            <div key={Math.random().toString(36)} className="petShop__damage">Damage Multiplier: {petList.strength}</div>
            <div key={Math.random().toString(36)} className="petShop__speed">Speed: {petList.speed}</div>
            <div key={Math.random().toString(36)} className="petShop__luck">Luck: {petList.luck}</div>
            <button className="petShop__buyButton" onClick={() => petPurchase(petList)} key={petList.id}>Buy</button>
        </div>
    )

    return (

        <div className="petShop__container">
            {listPets}
        </div>
    )

}

export default observer(PetShop)