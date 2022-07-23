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
            heroWeaponUnequip,
            heroArmourUnequip,
        },
    } = useRootStore();

    let [selectedEquipment, setSelectedEquipment] = useState("");
    let [selectedInventory, setSelectedInventory] = useState("");

    const equipHandler = (selectedEquipment) => {
        if (selectedEquipment.type === "weapon") {
            heroWeaponEquip(selectedEquipment);
        } else if (selectedEquipment.type === "armour") {
            heroArmourEquip(selectedEquipment);
        } else if (selectedEquipment.type === "pet") {
            console.log("lkj2", selectedEquipment);
            equipPet(selectedEquipment);
        }
        document.getElementById("HeroInventoryEquiped").style.display = "none";
        document.getElementById("HeroInventorySelected").style.display = "none";
    };

    const sellItemsHandler = (item, amount) => {
        if (amount === "all" || item.count === 1) {
            document.getElementById("HeroInventoryEquiped").style.display = "none";
            document.getElementById("HeroInventorySelected").style.display = "none";
        }
        handleSell(item, amount);
    };

    const Unequip = (selectedEquipment) => {
        if (selectedEquipment.type === "weapon") {
            heroWeaponUnequip(selectedEquipment);
        } else if (selectedEquipment.type === "armour") {
            heroArmourUnequip(selectedEquipment);
        } else if (selectedEquipment.type === "pet") {
            unequipPet(selectedEquipment);
        }
        document.getElementById("HeroInventoryEquiped").style.display = "none";
        document.getElementById("HeroInventorySelected").style.display = "none";
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
                    <button onClick={() => Unequip(selectedEquipment)}>Unequip</button>
                </div>
            </div>
        </div>
    );

    const inventoryClick = (selected) => {
        console.log("lkj", selected);
        const targetDiv = document.getElementById("HeroInventorySelected");
        if (
            document.getElementById("HeroInventorySelected") !== null &&
            targetDiv.style.display !== "none" &&
            selectedInventory === selected
        ) {
            targetDiv.style.display = "none";
            setSelectedInventory("");
        } else if (document.getElementById("HeroInventorySelected") !== null && selected !== undefined) {
            setSelectedInventory(selected);
            targetDiv.style.display = "flex";
        }
    };

    const inventoryInfoOpen = (
        <div className="HeroInventory__display">
            <div className="HeroInventory__display__name">{selectedInventory.name}</div>
            <div className="HeroInventory__display__items">
                <img className="HeroInventory__display__image" src={selectedInventory.icon} alt="" />
                <div className="HeroInventory__display__itemContainer">
                    {selectedInventory.damage > 0 && (
                        <div className="HeroInventory__display__item">Damage Multi: {selectedInventory.damage}</div>
                    )}
                    {selectedInventory.lifeSteal > 0 && (
                        <div className="HeroInventory__display__item">Life Steal: {selectedInventory.lifeSteal}</div>
                    )}
                    {selectedInventory.luckBonus > 0 && (
                        <div className="HeroInventory__display__item">Luck Bonus: {selectedInventory.luckBonus}</div>
                    )}
                    {selectedInventory.moneyIncrease > 0 && (
                        <div className="HeroInventory__display__item">
                            Money Drop Increase: {selectedInventory.moneyIncrease}
                        </div>
                    )}
                    {selectedInventory.speedBonus > 0 && (
                        <div className="HeroInventory__display__item">Speed Bonus: {selectedInventory.speedBonus}</div>
                    )}
                    {selectedInventory.constitution > 0 && (
                        <div className="HeroInventory__display__item">Defence: {selectedInventory.constitution}</div>
                    )}
                    <div className="HeroInventory__display__item">Cost: {selectedInventory.cost}</div>
                    <button
                        className="HeroInventory__button"
                        onClick={() => sellItemsHandler(selectedInventory, "one")}
                    >
                        Sell
                    </button>
                    {selectedInventory.count > 1 && (
                        <button
                            className="HeroInventory__button"
                            onClick={() => sellItemsHandler(selectedInventory, "all")}
                        >
                            Sell All
                        </button>
                    )}
                    {(selectedInventory.type === "weapon" ||
                        selectedInventory.type === "armour" ||
                        selectedInventory.type === "pet") && (
                        <button className="HeroInventory__button" onClick={() => equipHandler(selectedInventory)}>
                            Equip
                        </button>
                    )}
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
                onClick={() => inventoryClick(heroEquipment)}
                src={heroEquipment.icon}
                alt="icon"
            />
            <div className="HeroInventory__buttonContainer"></div>
        </div>
    ));

    const armourInv = heroArmourInv.map((heroEquipment) => (
        <div key={Math.random().toString(36)} className="HeroInventory__equipment">
            <div key={Math.random().toString(36)} className="HeroInventory__equipmentName">
                {heroEquipment.name}
            </div>
            <img
                className="HeroInventory__image"
                onClick={() => inventoryClick(heroEquipment)}
                src={heroEquipment.icon}
                alt="icon"
            />
            <div className="HeroInventory__buttonContainer"></div>
        </div>
    ));

    const itemInv = heroItemsInv.map((heroEquipment) => (
        <div key={Math.random().toString(36)} className="HeroInventory__equipment">
            <div key={Math.random().toString(36)} className="HeroInventory__equipmentName">
                {heroEquipment.name + " " + heroEquipment.suffix}
            </div>
            <img
                className="HeroInventory__image"
                onClick={() => inventoryClick(heroEquipment)}
                src={heroEquipment.icon}
                alt="icon"
            />
            <div className="HeroInventory__buttonContainer">
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
                onClick={() => inventoryClick(heroPet)}
                src={heroPet.icon}
                alt="icon"
            />
            <div className="HeroInventory__buttonContainer"></div>
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
        <div className="displayStatDetails__container">
            <div className="displayStatDetails__item">
                Inventory Slots: {heroInventoryUsedSlots}/{heroInventorySlots}
            </div>
            <div className="displayStatDetails__item">Defence: {equipedHeroArmour + constitution}</div>
            <div className="displayStatDetails__item">Damage: {heroAttackAmount}</div>
            <div className="displayStatDetails__item">Pet DPS: {petDamageCalc()}</div>
        </div>
    );

    return (
        <div className="HeroInventory__list">
            <div className="HeroInventory__equipedList">{equipedItems()}</div>
            <div className="HeroInventory__displayStats">{displayStatDetails}</div>
            <div className="HeroInventory__equiped" id={"HeroInventoryEquiped"} style={{ display: "none" }}>
                <div className="HeroInventory__InfoOpen">Selected Equiped</div>
                {equipedInfoOpen}
            </div>
            <div className="HeroInventory__selected" id={"HeroInventorySelected"} style={{ display: "none" }}>
                <div className="HeroInventory__InfoOpen">Selected Inventory</div>
                {inventoryInfoOpen}
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
