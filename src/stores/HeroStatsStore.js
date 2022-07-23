import { makeAutoObservable } from "mobx";
import _ from "lodash";

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
        if (!_.isEmpty(this.equipedHeroArmourHead)) {
            this.equipedHeroArmour += this.equipedHeroArmourHead.constitution;
        }
        if (!_.isEmpty(this.equipedHeroArmourChest)) {
            this.equipedHeroArmour += this.equipedHeroArmourChest.constitution;
        }
        if (!_.isEmpty(this.equipedHeroArmourLegs)) {
            this.equipedHeroArmour += this.equipedHeroArmourLegs.constitution;
        }
        if (!_.isEmpty(this.equipedHeroArmourHands)) {
            this.equipedHeroArmour += this.equipedHeroArmourHands.constitution;
        }
        if (!_.isEmpty(this.equipedHeroArmourFeet)) {
            this.equipedHeroArmour += this.equipedHeroArmourFeet.constitution;
        }
    };

    equipPet = (heroPet) => {
        if (!_.isEmpty(this.equipedPet)) {
            this.unequipPet();
        }
        this.equipedPet = heroPet;
        this.petStrength = heroPet.strength;
        this.petSpeed = heroPet.speed;
        this.heroPetAttackInterval();
        const position = this.allStores.heroInventoryStore.heroPetSlotsArray.findIndex((el) => el.id === heroPet.id);
        this.allStores.heroInventoryStore.heroPetSlotsArray.splice(position, 1);
    };

    unequipPet = (pet) => {
        clearInterval(this.petInterval);
        this.allStores.heroInventoryStore.heroPetSlotsArray.push(pet);
        this.equipedPet = {};
    };

    heroWeaponEquip = (weaponEquip) => {
        if (!_.isEmpty(this.equipedHeroWeapon)) {
            this.heroWeaponUnequip();
        }
        this.equipedHeroWeapon = weaponEquip;
        this.equipedHeroWeaponDamage = weaponEquip.damage;
        const position = this.allStores.heroInventoryStore.heroWeaponInv.findIndex((el) => el.id === weaponEquip.id);
        this.allStores.heroInventoryStore.heroWeaponInv.splice(position, 1);
        this.heroAttackCalc();
    };

    heroWeaponUnequip = () => {
        this.allStores.heroInventoryStore.inventoryPlacement(this.equipedHeroWeapon);
        this.equipedHeroWeapon = {};
        this.heroAttackCalc();
    };

    heroArmourEquip = (armour) => {
        if (armour.location === "chest") {
            if (!_.isEmpty(this.equipedHeroArmourChest)) {
                this.heroArmourUnequip(this.equipedHeroArmourChest);
            }
            this.equipedHeroArmourChest = armour;
        } else if (armour.location === "legs") {
            if (!_.isEmpty(this.equipedHeroArmourLegs)) {
                this.heroArmourUnequip(this.equipedHeroArmourLegs);
            }
            this.equipedHeroArmourLegs = armour;
        } else if (armour.location === "head") {
            if (!_.isEmpty(this.equipedHeroArmourHead)) {
                this.heroArmourUnequip(this.equipedHeroArmourHead);
            }
            this.equipedHeroArmourHead = armour;
        } else if (armour.location === "hands") {
            if (!_.isEmpty(this.equipedHeroArmourHands)) {
                this.heroArmourUnequip(this.equipedHeroArmourHands);
            }
            this.equipedHeroArmourHands = armour;
        } else if (armour.location === "feet") {
            if (!_.isEmpty(this.equipedHeroArmourFeet)) {
                this.heroArmourUnequip(this.equipedHeroArmourFeet);
            }
            this.equipedHeroArmourFeet = armour;
        }
        const position = this.allStores.heroInventoryStore.heroArmourInv.findIndex((el) => el.id === armour.id);
        this.allStores.heroInventoryStore.heroArmourInv.splice(position, 1);
        this.heroAttackCalc();
    };

    heroArmourUnequip = (armour) => {
        if (armour.location === "chest") {
            this.allStores.heroInventoryStore.inventoryPlacement(this.equipedHeroArmourChest);
            this.equipedHeroArmourChest = {};
        } else if (armour.location === "legs") {
            this.allStores.heroInventoryStore.inventoryPlacement(this.equipedHeroArmourLegs);
            this.equipedHeroArmourLegs = {};
        } else if (armour.location === "head") {
            this.allStores.heroInventoryStore.inventoryPlacement(this.equipedHeroArmourHead);
            this.equipedHeroArmourHead = {};
        } else if (armour.location === "hands") {
            this.allStores.heroInventoryStore.inventoryPlacement(this.equipedHeroArmourHands);
            this.equipedHeroArmourHands = {};
        } else if (armour.location === "feet") {
            this.allStores.heroInventoryStore.inventoryPlacement(this.equipedHeroArmourFeet);
            this.equipedHeroArmourFeet = {};
        }
        this.heroAttackCalc();
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
        this.heroAttackCalc();
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
        this.heroAttackCalc();
    };
}

export default HeroStatsStore;
