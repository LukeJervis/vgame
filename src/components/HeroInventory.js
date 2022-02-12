import { observer } from 'mobx-react-lite'
import { useRootStore } from '../provider/RootStoreProvider'
import './heroInventory.css'

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
        <div key={Math.random().toString(36)} className='HeroInventory__equipment'>
            <div key={Math.random().toString(36)} className='HeroInventory__equipmentName'>{heroEquipment.name}</div>
            <div key={Math.random().toString(36)}>Damage Multiplier: {heroEquipment.damage}</div>
            <button onClick={() => heroWeaponEquipHandler(heroEquipment)} key={heroEquipment.id}>Equip</button>
        </div>
    )

    const heroPetCount = heroPetSlotsArray.map(heroPet =>
        <div key={Math.random().toString(36)} className='HeroInventory__pets'>
            <div key={Math.random().toString(36)} className='HeroInventory__petName'>{heroPet.name}</div>
            <div key={Math.random().toString(36)}>Health: {heroPet.health}</div>
            <div key={Math.random().toString(36)}>Strength: {heroPet.strength}</div>
            <div key={Math.random().toString(36)}>Speed: {heroPet.speed}</div>
            <div key={Math.random().toString(36)}>Luck: {heroPet.luck}</div>
            <button onClick={() => heroPetEquipHandler(heroPet)} key={heroPet.id}>Equip</button>
        </div>    
    )

    return (
        <div>
            <div className='HeroInventory__weaponsTitle'>
                Weapons
            </div>
            <div className='HeroInventory__equipmentSlots'>
                {heroSlotCount}
            </div>
            <div className='HeroInventory__petsTitle'>
                Pets
            </div>
            <div>
                {heroPetCount}
            </div>
        </div>
    )

}

export default observer(HeroInventory)