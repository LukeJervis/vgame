import { makeAutoObservable } from "mobx";

class HeroStatsStore {

    allStores

    maxHealth = 100
    health = 100
    strength = 1
    speed = 1
    constitution = 1
    luck = 1

    statCost = 100

    equipedHeroWeapon = {}
    equipedHeroWeaponDamage = 1

    equipedHeroArmourHead = 0
    equipedHeroArmourChest = 0
    equipedHeroArmourLegs = 0
    equipedHeroArmourHands = 0
    equipedHeroArmourFeet = 0
    equipedHeroArmour = 0

    heroAttackAmount = 1

    equipedPet = {}
    petInterval

    constructor(store) {
        this.allStores = store
        makeAutoObservable(this);
    }

    get heroDeath() {
        return this.health <= 0
    }

    heroAttackCalc = () => {
        this.heroAttackAmount = this.strength * this.equipedHeroWeaponDamage
        this.equipedHeroArmour = 0
        this.equipedHeroArmour = this.equipedHeroArmour + this.equipedHeroArmourHead + this.equipedHeroArmourChest + this.equipedHeroArmourLegs + this.equipedHeroArmourHands + this.equipedHeroArmourFeet
    }

    equipHeroWeapon = (HeroWeaponId) => {
        this.equipedHeroWeapon = HeroWeaponId
    }

    equipPet = (heroPet) => {
        console.log('equipPet', this.equipedPet);
        if (this.equipedPet === heroPet) {
            console.log("Pet Already Equiped");
        } else {
            this.unequipPet()
            this.equipedPet = heroPet
            this.petStrength = heroPet.strength
            this.petSpeed = heroPet.speed
            console.log('equipPet', this.equipedPet);
            this.heroPetAttackInterval()
        }
    }

    unequipPet = () => {
        clearInterval(this.petInterval)
        this.equipedPet = {}
    }

    heroWeaponEquip = (weaponEquip) => {
        if (weaponEquip.id > 0 && weaponEquip.id < 1001) {
            this.equipedHeroWeapon = weaponEquip
            this.equipedHeroWeaponDamage = weaponEquip.damage
        } else if (weaponEquip.id > 1000 && weaponEquip.id < 2001) {
            this.heroArmourEquip(weaponEquip)
        }
    }

    heroArmourEquip = (armourEquip) => {
        if (armourEquip.type === 'chest') {
            this.equipedHeroArmourChest = 0
            this.equipedHeroArmourChest = this.equipedHeroArmourChest + armourEquip.constitution
        }else if (armourEquip.type === 'legs') {
            this.equipedHeroArmourLegs = 0
            this.equipedHeroArmourLegs = this.equipedHeroArmourLegs + armourEquip.constitution
        }else if (armourEquip.type === 'head') {
            this.equipedHeroArmourHead = 0
            this.equipedHeroArmourHead = this.equipedHeroArmourHead + armourEquip.constitution
        }else if (armourEquip.type === 'hands') {
            this.equipedHeroArmourHands = 0
            this.equipedHeroArmourHands = this.equipedHeroArmourHands + armourEquip.constitution
        }else if (armourEquip.type === 'feet') {
            this.equipedHeroArmourFeet = 0
            this.equipedHeroArmourFeet = this.equipedHeroArmourFeet + armourEquip.constitution
        }
        this.heroAttackCalc()
        console.log(this.equipedHeroArmour);
    }

    handleStatBuy = (statPurchase) => {
        if (statPurchase === 'strength') {
            this.strength++
            this.statCost = this.statCost * 1.1
        } else if (statPurchase === 'speed') {
            this.speed++
            this.statCost = this.statCost * 1.1
        } else if (statPurchase === 'constitution') {
            this.constitution++
            this.statCost = this.statCost * 1.1
        } else if (statPurchase === 'luck') {
            this.luck++
            this.statCost = this.statCost * 1.1
        } else {
            console.log('handleStatBuy Error');
        }
    }

    handlePetStatBuy = (petObject, petStat) => {
        if (petStat === 'strength') {
            petObject.strength = petObject.strength + petObject.strengthIncrease
            petObject.statCost = petObject.statCost * petObject.statMulti
        } else if (petStat === 'speed') {
            petObject.speed = petObject.speed + petObject.speedIncrease
            petObject.statCost = petObject.statCost * petObject.statMulti
        } else if (petStat === 'constitution') {
            petObject.constitution = petObject.constitution + petObject.constitutionIncrease
            petObject.statCost = petObject.statCost * petObject.statMulti
        } else if (petStat === 'luck') {
            petObject.luck = petObject.luck + petObject.luckIncrease
            petObject.statCost = petObject.statCost * petObject.statMulti
        } else if (petStat === 'health') {
            petObject.health = petObject.health + petObject.healthIncrease
            petObject.healthStatCost = petObject.healthStatCost * petObject.healthStatMulti
        } else {
            console.log('handlePetStatBuy Error');
        }

        clearInterval(this.petInterval)
        this.heroPetAttackInterval()
    }

    heroPetAttackInterval = () => {
        this.petInterval = setInterval(this.heroPetAttack, 1000 / this.equipedPet.speed)
    }

    heroPetAttack = () => {
        this.allStores.countStore.experience = this.allStores.countStore.experience + this.equipedPet.strength
        if (this.allStores.countStore.experience >= this.allStores.countStore.experienceNeeded) {   
            this.allStores.countStore.HerolevelIncrease()
        }
    }

}

export default HeroStatsStore

// this.statCost = this.statCost * 2