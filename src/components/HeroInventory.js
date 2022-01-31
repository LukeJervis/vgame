import { observer } from 'mobx-react-lite'
import { useRootStore } from '../provider/RootStoreProvider'

const HeroInventory = () => {

    const { heroInventoryStore: { heroInventorySlotsArray, heroPetSlotsArray } } = useRootStore()
    const { heroStatsStore: { heroWeaponEquip, equipPet } } = useRootStore()

    const heroWeaponEquipHandler = (heroEquipment) => {
        heroWeaponEquip(heroEquipment)
    }

    const heroPetEquipHandler = (heroPet) => {
        equipPet(heroPet)
    }

    const heroSlotCount = heroInventorySlotsArray.map(heroEquipment => 
        <div key={Math.random().toString(36)}>
            <div key={Math.random().toString(36)}>{heroEquipment.name}</div>
            <div key={Math.random().toString(36)}>Damage Multiplier: {heroEquipment.damage}</div>
            <button onClick={() => heroWeaponEquipHandler(heroEquipment)} key={heroEquipment.id}>Equip</button>
        </div>
    )

    const heroPetCount = heroPetSlotsArray.map(heroPet =>
        <div key={Math.random().toString(36)}>
            <div key={Math.random().toString(36)}>{heroPet.name}</div>
            <div key={Math.random().toString(36)}>Health: {heroPet.health}</div>
            <div key={Math.random().toString(36)}>Damage Multiplier: {heroPet.strength}</div>
            <div key={Math.random().toString(36)}>Speed: {heroPet.speed}</div>
            <div key={Math.random().toString(36)}>Luck: {heroPet.luck}</div>
            <button onClick={() => heroPetEquipHandler(heroPet)} key={heroPet.id}>Equip</button>
        </div>    
    )

    return (
        <div>
            <div>
                {heroSlotCount}
            </div>
            <div>
                {heroPetCount}
            </div>
        </div>
    )

}

export default observer(HeroInventory)