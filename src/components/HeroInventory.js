import { observer } from 'mobx-react-lite'
import { useRootStore } from '../provider/RootStoreProvider'
import './heroInventory.css'

const HeroInventory = () => {

    const { heroInventoryStore: { heroWeaponInv, heroArmourInv, heroItemsInv, heroPetSlotsArray } } = useRootStore()
    const { heroStatsStore: { heroWeaponEquip, equipPet, unequipPet } } = useRootStore()

    const heroWeaponEquipHandler = (heroEquipment) => {
        heroWeaponEquip(heroEquipment)
    }

    const heroPetEquipHandler = (heroPet) => {
        equipPet(heroPet)
    }

    const weaponInv = heroWeaponInv.map(heroEquipment => 
        <div key={Math.random().toString(36)} className='HeroInventory__equipment'>
            <div key={Math.random().toString(36)} className='HeroInventory__equipmentName'>{heroEquipment.name}</div>
            <img className='HeroInventory__image' src={heroEquipment.icon} alt='icon' title={`Damage Multiplier: ${heroEquipment.damage}\nDamage Bonus: ${heroEquipment.damageBonus}\nSpeed Bonus: ${heroEquipment.speedBonus}\nLuck Bonus: ${heroEquipment.luckBonus}\nLife Steal: ${heroEquipment.lifeSteal}\nMoney Drop Increase: ${heroEquipment.moneyIncrease}\nCost: ${heroEquipment.cost} iron`} />
            {/* <div key={Math.random().toString(36)}>Damage Multiplier: {heroEquipment.damage}</div>
            <div key={Math.random().toString(36)}>Damage Bonus: {heroEquipment.damageBonus}</div>
            <div key={Math.random().toString(36)}>Speed Bonus: {heroEquipment.speedBonus}</div>
            <div key={Math.random().toString(36)}>Luck Bonus: {heroEquipment.luckBonus}</div>
            <div key={Math.random().toString(36)}>Life Steal: {heroEquipment.lifeSteal}</div>
            <div key={Math.random().toString(36)}>Money Drop Increase: {heroEquipment.moneyIncrease}</div>
            <div key={Math.random().toString(36)}>Cost: {heroEquipment.cost}</div> */}
            <button onClick={() => heroWeaponEquipHandler(heroEquipment.cost)} key={heroEquipment.id}>Equip</button>
        </div>
    )

    const armourInv = heroArmourInv.map(heroEquipment => 
        <div key={Math.random().toString(36)} className='HeroInventory__equipment'>
            <div key={Math.random().toString(36)} className='HeroInventory__equipmentName'>{heroEquipment.name}</div>
            <img className='HeroInventory__image' src={heroEquipment.icon} alt='icon' title={`Defence: ${heroEquipment.constitution}\nArmour: ${heroEquipment.location}\nCost: ${heroEquipment.cost} iron
            `}/>
            {/* <div key={Math.random().toString(36)}>Damage Multiplier: {heroEquipment.damage}</div>
            <div key={Math.random().toString(36)}>Damage Bonus: {heroEquipment.damageBonus}</div>
            <div key={Math.random().toString(36)}>Speed Bonus: {heroEquipment.speedBonus}</div>
            <div key={Math.random().toString(36)}>Luck Bonus: {heroEquipment.luckBonus}</div>
            <div key={Math.random().toString(36)}>Life Steal: {heroEquipment.lifeSteal}</div>
            <div key={Math.random().toString(36)}>Money Drop Increase: {heroEquipment.moneyIncrease}</div>
            <div key={Math.random().toString(36)}>Cost: {heroEquipment.cost}</div> */}
            <button onClick={() => heroWeaponEquipHandler(heroEquipment)} key={heroEquipment.id}>Equip</button>
        </div>
    )

    const itemInv = heroItemsInv.map(heroEquipment => 
        <div key={Math.random().toString(36)} className='HeroInventory__equipment'>
            <div key={Math.random().toString(36)} className='HeroInventory__equipmentName'>{heroEquipment.name}</div>
            <img className='HeroInventory__image' src={heroEquipment.icon} alt='icon' title={`Name: ${heroEquipment.name} \n Cost: ${heroEquipment.cost}`}/>
        </div>
    )

    const heroPetCount = heroPetSlotsArray.map(heroPet =>
        <div key={Math.random().toString(36)} className='HeroInventory__pets'>
            <div key={Math.random().toString(36)} className='HeroInventory__petName'>{heroPet.name}</div>
            <img className='HeroInventory__image' src={heroPet.icon} alt='icon' title={`Health: ${heroPet.health}\nStrength: ${heroPet.strength}\nSpeed: ${heroPet.speed}\nLuck: ${heroPet.luck}
            `}/>
            {/* <div key={Math.random().toString(36)}>Health: {heroPet.health}</div>
            <div key={Math.random().toString(36)}>Strength: {heroPet.strength}</div>
            <div key={Math.random().toString(36)}>Speed: {heroPet.speed}</div>
            <div key={Math.random().toString(36)}>Luck: {heroPet.luck}</div> */}
            <div className='HeroInventory__buttons'>
                <button className='HeroInventory__button' onClick={() => heroPetEquipHandler(heroPet)} key={Math.random().toString(36)}>Equip</button>
                <button className='HeroInventory__button' onClick={() => unequipPet()} key={Math.random().toString(36)}>Unequip</button>
            </div>
        </div>    
    )

    return (
        <div>
            <div className='HeroInventory__weaponsTitle'>
                Inventory
            </div>
            <div className='HeroInventory__equipmentSlots'>
                {weaponInv}{armourInv}{itemInv}
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