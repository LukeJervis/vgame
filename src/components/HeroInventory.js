import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useRootStore } from "../provider/RootStoreProvider";
import "./heroInventory.css";

const HeroInventory = () => {
    const {
        heroInventoryStore: {
            heroWeaponInv,
            heroArmourInv,
            heroItemsInv,
            heroPetSlotsArray,
            handleSell,
            heroInventorySlots,
            heroInventoryUsedSlots,
        },
    } = useRootStore();
    const {
        heroStatsStore: {
            equipedHeroWeapon,
            heroWeaponEquip,
            heroArmourEquip,
            equipedPet,
            equipPet,
            unequipPet,
            equipedHeroArmourHead,
            equipedHeroArmourChest,
            equipedHeroArmourLegs,
            equipedHeroArmourHands,
            equipedHeroArmourFeet,
            equipedHeroArmour,
            constitution,
            heroAttackAmount,
        },
    } = useRootStore();

    let [selectedEquipment, setSelectedEquipment] = useState("");

    const heroWeaponEquipHandler = (heroEquipment) => {
        heroWeaponEquip(heroEquipment);
    };

    const heroArmourEquipHandler = (heroEquipment) => {
        heroArmourEquip(heroEquipment);
    };

    const heroPetEquipHandler = (heroPet) => {
        equipPet(heroPet);
    };

    const sellItemsHandler = (item, amount) => {
        handleSell(item, amount);
    };

    const equipedClick = (equiped) => {
        const targetDiv = document.getElementById("HeroInventoryEquiped");
        if (
            document.getElementById("HeroInventoryEquiped") !== null &&
            targetDiv.style.display !== "none" &&
            selectedEquipment === equiped
        ) {
            targetDiv.style.display = "none";
            setSelectedEquipment("");
        } else if (document.getElementById("HeroInventoryEquiped") !== null && equiped !== undefined) {
            setSelectedEquipment(equiped);
            targetDiv.style.display = "flex";
        }
    };

    const equipedInfoOpen = (
        <div className="HeroInventory__display">
            <div className="HeroInventory__display__name">{selectedEquipment.name}</div>
            <div className="HeroInventory__display__items">
                <img className="HeroInventory__display__image" src={selectedEquipment.icon} alt="" />
                <div className="HeroInventory__display__itemContainer">
                    {selectedEquipment.damage > 0 && (
                        <div className="HeroInventory__display__item">Damage Multi: {selectedEquipment.damage}</div>
                    )}
                    {selectedEquipment.lifeSteal > 0 && (
                        <div className="HeroInventory__display__item">Life Steal: {selectedEquipment.lifeSteal}</div>
                    )}
                    {selectedEquipment.luckBonus > 0 && (
                        <div className="HeroInventory__display__item">Luck Bonus: {selectedEquipment.luckBonus}</div>
                    )}
                    {selectedEquipment.moneyIncrease > 0 && (
                        <div className="HeroInventory__display__item">
                            Money Drop Increase: {selectedEquipment.moneyIncrease}
                        </div>
                    )}
                    {selectedEquipment.speedBonus > 0 && (
                        <div className="HeroInventory__display__item">Speed Bonus: {selectedEquipment.speedBonus}</div>
                    )}
                    {selectedEquipment.constitution > 0 && (
                        <div className="HeroInventory__display__item">Defence: {selectedEquipment.constitution}</div>
                    )}
                    <div className="HeroInventory__display__item">Cost: {selectedEquipment.cost}</div>
                </div>
            </div>
        </div>
    );

    const equipedItems = () => {
        return (
            <div className="HeroInventory__equipedItems">
                <div className="HeroInventory__equipedItems__line1">
                    <img
                        className="HeroInventory__equipedItems__head"
                        onClick={() => equipedClick(equipedHeroArmourHead)}
                        src={equipedHeroArmourHead.icon}
                        alt="head"
                    />
                </div>
                <div className="HeroInventory__equipedItems__line2">
                    <img
                        className="HeroInventory__equipedItems__hands"
                        onClick={() => equipedClick(equipedHeroArmourHands)}
                        src={equipedHeroArmourHands.icon}
                        alt="hands"
                    />
                    <img
                        className="HeroInventory__equipedItems__chest"
                        onClick={() => equipedClick(equipedHeroArmourChest)}
                        src={equipedHeroArmourChest.icon}
                        alt="chest"
                    />
                </div>
                <div className="HeroInventory__equipedItems__line3">
                    <img
                        className="HeroInventory__equipedItems__legs"
                        onClick={() => equipedClick(equipedHeroArmourLegs)}
                        src={equipedHeroArmourLegs.icon}
                        alt="legs"
                    />
                    <img
                        className="HeroInventory__equipedItems__weapon"
                        onClick={() => equipedClick(equipedHeroWeapon)}
                        src={equipedHeroWeapon.icon}
                        alt="weapon"
                    />
                </div>
                <div className="HeroInventory__equipedItems__line4">
                    <img
                        className="HeroInventory__equipedItems__pet"
                        onClick={() => equipedClick(equipedPet)}
                        src={equipedPet.icon}
                        alt="pet"
                    />
                    <img
                        className="HeroInventory__equipedItems__feet"
                        onClick={() => equipedClick(equipedHeroArmourFeet)}
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
                onClick={() => equipedClick(heroEquipment)}
                src={heroEquipment.icon}
                alt="icon"
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
                onClick={() => equipedClick(heroEquipment)}
                src={heroEquipment.icon}
                alt="icon"
            />
            <div className="HeroInventory__buttonContainer">
                <button
                    className="HeroInventory__button"
                    onClick={() => heroArmourEquipHandler(heroEquipment)}
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
                onClick={() => equipedClick(heroEquipment)}
                src={heroEquipment.icon}
                alt="icon"
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
            <img className="HeroInventory__image" onClick={() => equipedClick(heroPet)} src={heroPet.icon} alt="icon" />
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

    const petDamageCalc = () => {
        if (equipedPet.strength > 0) {
            return equipedPet.strength * equipedPet.speed;
        } else {
            return "No Pet Equiped";
        }
    };

    const displayStatDetails = (
        <div>
            <div className="displayStatDetails__inventory">
                Inventory Slots: {heroInventoryUsedSlots}/{heroInventorySlots}
            </div>
            <div className="displayStatDetails__defence">Defence: {equipedHeroArmour + constitution}</div>
            <div className="displayStatDetails__damage">Damage: {heroAttackAmount}</div>
            <div className="displayStatDetails__pet">Pet DPS: {petDamageCalc()}</div>
        </div>
    );

    return (
        <div className="HeroInventory__list">
            <div className="HeroInventory__equipedList">{equipedItems()}</div>
            <div className="HeroInventory__displayStats">{displayStatDetails}</div>
            <div className="HeroInventory__equiped" id={"HeroInventoryEquiped"} style={{ display: "none" }}>
                {equipedInfoOpen}
            </div>
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
