import { observer } from "mobx-react-lite";
import { useRootStore } from "../provider/RootStoreProvider";
import "./heroInventory.css";

const HeroInventory = () => {
    const {
        heroInventoryStore: { heroWeaponInv, heroArmourInv, heroItemsInv, heroPetSlotsArray, handleSell },
    } = useRootStore();
    const {
        heroStatsStore: {
            heroWeaponEquip,
            equipPet,
            unequipPet,
            equipedHeroArmourHead,
            equipedHeroArmourChest,
            equipedHeroArmourLegs,
            equipedHeroArmourHands,
            equipedHeroArmourFeet,
        },
    } = useRootStore();

    const heroWeaponEquipHandler = (heroEquipment) => {
        heroWeaponEquip(heroEquipment);
    };

    const heroPetEquipHandler = (heroPet) => {
        equipPet(heroPet);
    };

    const sellItemsHandler = (item, amount) => {
        handleSell(item, amount);
    };

    const equipedItems = () => {
        return (
            <div className="HeroInventory__equipedItems">
                <div className="HeroInventory__equipedItems__line1">
                    <img className="HeroInventory__equipedItems__head" src={equipedHeroArmourHead.icon} alt="head" />
                </div>
                <div className="HeroInventory__equipedItems__line2">
                    <img className="HeroInventory__equipedItems__hands" src={equipedHeroArmourHands.icon} alt="hands" />
                    <img className="HeroInventory__equipedItems__chest" src={equipedHeroArmourChest.icon} alt="chest" />
                </div>
                <div className="HeroInventory__equipedItems__line3">
                    <img className="HeroInventory__equipedItems__legs" src={equipedHeroArmourLegs.icon} alt="legs" />
                    <img className="HeroInventory__equipedItems__weapon" alt="weapon"></img>
                </div>
                <div className="HeroInventory__equipedItems__line4">
                    <img className="HeroInventory__equipedItems__pet" alt="pet" />
                    <img
                        className="HeroInventory__equipedItems__feet"
                        src={equipedHeroArmourFeet.icon}
                        alt="feet"
                    ></img>
                </div>
            </div>
        );
    };

    const weaponInv = heroWeaponInv.map((heroEquipment) => (
        <div key={Math.random().toString(36)} className="HeroInventory__equipment">
            <div key={Math.random().toString(36)} className="HeroInventory__equipmentName">
                {heroEquipment.name}
            </div>
            <img
                className="HeroInventory__image"
                src={heroEquipment.icon}
                alt="icon"
                title={`Damage Multiplier: ${heroEquipment.damage}\nDamage Bonus: ${heroEquipment.damageBonus}\nSpeed Bonus: ${heroEquipment.speedBonus}\nLuck Bonus: ${heroEquipment.luckBonus}\nLife Steal: ${heroEquipment.lifeSteal}\nMoney Drop Increase: ${heroEquipment.moneyIncrease}\nCost: ${heroEquipment.cost} iron`}
            />
            <div className="HeroInventory__buttonContainer">
                <button className="HeroInventory__button" onClick={() => sellItemsHandler(heroEquipment, "one")}>
                    S
                </button>
                <button
                    className="HeroInventory__button"
                    onClick={() => heroWeaponEquipHandler(heroEquipment)}
                    key={heroEquipment.id}
                >
                    E
                </button>
            </div>
        </div>
    ));

    const armourInv = heroArmourInv.map((heroEquipment) => (
        <div key={Math.random().toString(36)} className="HeroInventory__equipment">
            <div key={Math.random().toString(36)} className="HeroInventory__equipmentName">
                {heroEquipment.name}
            </div>
            <img
                className="HeroInventory__image"
                src={heroEquipment.icon}
                alt="icon"
                title={`Defence: ${heroEquipment.constitution}\nArmour: ${heroEquipment.location}\nCost: ${heroEquipment.cost} iron`}
            />
            <div className="HeroInventory__buttonContainer">
                <button
                    className="HeroInventory__button"
                    onClick={() => heroWeaponEquipHandler(heroEquipment)}
                    key={heroEquipment.id}
                >
                    E
                </button>
            </div>
        </div>
    ));

    const itemInv = heroItemsInv.map((heroEquipment) => (
        <div key={Math.random().toString(36)} className="HeroInventory__equipment">
            <div key={Math.random().toString(36)} className="HeroInventory__equipmentName">
                {heroEquipment.name + " " + heroEquipment.suffix}
            </div>
            <img
                className="HeroInventory__image"
                src={heroEquipment.icon}
                alt="icon"
                title={`Name: ${heroEquipment.name + " " + heroEquipment.suffix} \nCount: ${
                    heroEquipment.count
                } Cost: ${heroEquipment.cost}`}
            />
            <div className="HeroInventory__buttonContainer">
                <button className="HeroInventory__button" onClick={() => sellItemsHandler(heroEquipment, "one")}>
                    S
                </button>
                <button className="HeroInventory__button" onClick={() => sellItemsHandler(heroEquipment, "all")}>
                    S/A
                </button>
                <div className="HeroInventory__count" key={Math.random().toString(36)}>
                    {heroEquipment.count}
                </div>
            </div>
        </div>
    ));

    const heroPetCount = heroPetSlotsArray.map((heroPet) => (
        <div key={Math.random().toString(36)} className="HeroInventory__pets">
            <div key={Math.random().toString(36)} className="HeroInventory__petName">
                {heroPet.name}
            </div>
            <img
                className="HeroInventory__image"
                src={heroPet.icon}
                alt="icon"
                title={`Health: ${heroPet.health}\nStrength: ${heroPet.strength}\nSpeed: ${heroPet.speed}\nLuck: ${heroPet.luck}`}
            />
            <div className="HeroInventory__buttonContainer">
                <button
                    className="HeroInventory__button"
                    onClick={() => heroPetEquipHandler(heroPet)}
                    key={Math.random().toString(36)}
                >
                    E
                </button>
                <button className="HeroInventory__button" onClick={() => unequipPet()} key={Math.random().toString(36)}>
                    U
                </button>
            </div>
        </div>
    ));

    return (
        <div className="HeroInventory__list">
            <div className="HeroInventory__equipedList">{equipedItems()}</div>
            <div className="HeroInventory__title">Weapons</div>
            <div className="HeroInventory__item">{weaponInv}</div>
            <div className="HeroInventory__title">Armours</div>
            <div className="HeroInventory__item">{armourInv}</div>
            <div className="HeroInventory__title">Items</div>
            <div className="HeroInventory__item">{itemInv}</div>
            <div className="HeroInventory__title">Pets</div>
            <div className="HeroInventory__item">{heroPetCount}</div>
        </div>
    );
};

export default observer(HeroInventory);
