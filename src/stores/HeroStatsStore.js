import { makeAutoObservable } from "mobx";

class HeroStatsStore {
    allStores;

    maxHealth = 100;
    health = 100;
    strength = 1;
    speed = 1;
    constitution = 1;
    luck = 1;

    statCost = 100;
    statCool = false;

    equipedHeroWeapon = {};
    equipedHeroWeaponDamage = 1;

    equipedHeroArmourHead = {};
    equipedHeroArmourChest = {};
    equipedHeroArmourLegs = {};
    equipedHeroArmourHands = {};
    equipedHeroArmourFeet = {};
    equipedHeroArmour = 0;

    heroAttackAmount = 1;

    equipedPet = {};
    petInterval;

    constructor(store) {
        this.allStores = store;
        makeAutoObservable(this);
    }

    get heroDeath() {
        return this.health <= 0;
    }

    devCheats = () => {
        this.strength += 100;
        this.speed += 100;
        this.constitution += 100;
        this.luck += 1000;
        this.allStores.countStore.heroMoney += 100000;
        this.heroAttackCalc();
    };

    heroHeal = () => {
        this.health = this.maxHealth;
    };

    heroAttackCalc = () => {
        this.heroAttackAmount = this.strength * this.equipedHeroWeaponDamage;
        this.equipedHeroArmour = 0;
        this.equipedHeroArmour +=
            this.equipedHeroArmourHead.constitution +
            this.equipedHeroArmourChest.constitution +
            this.equipedHeroArmourLegs.constitution +
            this.equipedHeroArmourHands.constitution +
            this.equipedHeroArmourFeet.constitution;
    };

    equipHeroWeapon = (HeroWeaponId) => {
        this.equipedHeroWeapon = { HeroWeaponId };
    };

    equipPet = (heroPet) => {
        console.log("equipPet", this.equipedPet);
        if (this.equipedPet === heroPet) {
            console.log("Pet Already Equiped");
        } else {
            this.unequipPet();
            this.equipedPet = heroPet;
            this.petStrength = heroPet.strength;
            this.petSpeed = heroPet.speed;
            console.log("equipPet", this.equipedPet);
            this.heroPetAttackInterval();
        }
    };

    unequipPet = () => {
        clearInterval(this.petInterval);
        this.equipedPet = {};
    };

    heroWeaponEquip = (weaponEquip) => {
        console.log("weaponEquip", weaponEquip);
        if (weaponEquip.type === "weapon") {
            this.equipedHeroWeapon = weaponEquip;
            this.equipedHeroWeaponDamage = weaponEquip.damage;
        } else if (weaponEquip.id > 1000 && weaponEquip.id < 2001) {
            this.heroArmourEquip(weaponEquip);
        }
    };

    heroArmourEquip = (armourEquip) => {
        if (armourEquip.location === "chest") {
            this.equipedHeroArmourChest = armourEquip;
            const position = this.allStores.heroInventoryStore.heroArmourInv.findIndex(
                (el) => el.id === armourEquip.id
            );
            this.allStores.heroInventoryStore.heroArmourInv.splice(position, 1);
        } else if (armourEquip.location === "legs") {
            this.equipedHeroArmourLegs = armourEquip;
            const position = this.allStores.heroInventoryStore.heroArmourInv.findIndex(
                (el) => el.id === armourEquip.id
            );
            this.allStores.heroInventoryStore.heroArmourInv.splice(position, 1);
        } else if (armourEquip.location === "head") {
            this.equipedHeroArmourHead = armourEquip;
            const position = this.allStores.heroInventoryStore.heroArmourInv.findIndex(
                (el) => el.id === armourEquip.id
            );
            this.allStores.heroInventoryStore.heroArmourInv.splice(position, 1);
        } else if (armourEquip.location === "hands") {
            this.equipedHeroArmourHands = armourEquip;
            const position = this.allStores.heroInventoryStore.heroArmourInv.findIndex(
                (el) => el.id === armourEquip.id
            );
            this.allStores.heroInventoryStore.heroArmourInv.splice(position, 1);
        } else if (armourEquip.location === "feet") {
            this.equipedHeroArmourFeet = armourEquip;
            const position = this.allStores.heroInventoryStore.heroArmourInv.findIndex(
                (el) => el.id === armourEquip.id
            );
            this.allStores.heroInventoryStore.heroArmourInv.splice(position, 1);
        }
        this.heroAttackCalc();
        console.log(this.equipedHeroArmour);
    };

    handleStatBuy = (statPurchase) => {
        if (statPurchase === "strength") {
            this.strength++;
            this.statCost = this.statCost * 1.1;
        } else if (statPurchase === "speed") {
            this.speed++;
            this.statCost = this.statCost * 1.1;
        } else if (statPurchase === "constitution") {
            this.constitution++;
            this.statCost = this.statCost * 1.1;
        } else if (statPurchase === "luck") {
            this.luck++;
            this.statCost = this.statCost * 1.1;
        } else {
            console.log("handleStatBuy Error");
        }
    };

    handlePetStatBuy = (petObject, petStat) => {
        if (petStat === "strength") {
            petObject.strength += petObject.strengthIncrease;
            petObject.statCost *= petObject.statMulti;
        } else if (petStat === "speed") {
            petObject.speed += petObject.speedIncrease;
            petObject.statCost *= petObject.statMulti;
        } else if (petStat === "constitution") {
            petObject.constitution += petObject.constitutionIncrease;
            petObject.statCost *= petObject.statMulti;
        } else if (petStat === "luck") {
            petObject.luck += petObject.luckIncrease;
            petObject.statCost *= petObject.statMulti;
        } else if (petStat === "health") {
            petObject.health += petObject.healthIncrease;
            petObject.healthStatCost *= petObject.healthStatMulti;
        } else {
            console.log("handlePetStatBuy Error");
        }

        clearInterval(this.petInterval);
        this.heroPetAttackInterval();
    };

    heroPetAttackInterval = () => {
        this.petInterval = setInterval(this.heroPetAttack, 1000 / this.equipedPet.speed);
    };

    heroPetAttack = () => {
        this.allStores.countStore.experience += this.equipedPet.strength;
        if (this.allStores.countStore.experience >= this.allStores.countStore.experienceNeeded) {
            this.allStores.countStore.herolevelIncrease();
        }
    };

    statTrain = (stat, amount, cost) => {
        if (!this.statCool) {
            if (stat === "strength") {
                this.strength += amount;
                this.strength = Math.round(this.strength * 10) / 10;
                this.allStores.countStore.heroMoney -= cost;
            } else if (stat === "speed") {
                this.speed += amount;
                this.speed = Math.round(this.speed * 10) / 10;
                this.allStores.countStore.heroMoney -= cost;
            } else if (stat === "constitution") {
                this.constitution += amount;
                this.constitution = Math.round(this.constitution * 10) / 10;
                this.allStores.countStore.heroMoney -= cost;
            }
            this.statCool = true;
            setTimeout(() => {
                this.statCool = false;
            }, 120000);
            console.log("hit");
        } else {
            console.log("Still cooling down");
        }
    };
}

export default HeroStatsStore;

// this.statCost = this.statCost * 2
