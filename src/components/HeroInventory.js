import { observer } from 'mobx-react-lite'
import { useRootStore } from '../provider/RootStoreProvider'

const HeroInventory = () => {

    const { heroInventoryStore: { heroInventorySlotsArray } } = useRootStore()
    const { heroStatsStore: { heroWeaponEquip } } = useRootStore()

    const heroWeaponEquipHandler = (heroEquipment) => {
        heroWeaponEquip(heroEquipment)
    }

    const heroSlotCount = heroInventorySlotsArray.map(heroEquipment => 
        <div key={Math.random().toString(36)}>
            <div key={Math.random().toString(36)}>{heroEquipment.name}</div>
            <div key={Math.random().toString(36)}>Damage Multiplier: {heroEquipment.damage}</div>
            <button onClick={() => heroWeaponEquipHandler(heroEquipment)} key={heroEquipment.id}>Equip</button>
        </div>
    )

    return (
        <div>
            {heroSlotCount}
        </div>
    )

}

export default observer(HeroInventory)