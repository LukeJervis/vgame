import { makeAutoObservable } from "mobx";

class HeroStatsStore {

    allStores

    health = 100
    strength = 10
    speed = 1
    constitution = 1
    luck = 1

    statCost = 100

    equipedHeroWeapon = {}
    equipedHeroWeaponDamage = 1

    heroAttackAmount = 1

    petHealth
    petStrength
    petSpeed
    petLuck
    equipedPet = {}
    petInterval

    constructor(store) {
        this.allStores = store
        makeAutoObservable(this);
    }

    heroAttackCalc = () => {
        this.heroAttackAmount = this.strength * this.equipedHeroWeaponDamage
    }

    equipHeroWeapon = (HeroWeaponId) => {
        this.equipedHeroWeapon = HeroWeaponId
    }

    equipPet = (heroPet) => {
        if (this.equipedPet === heroPet) {
            console.log("Pet Already Equiped");
        } else {
            this.equipedPet = heroPet
            this.petStrength = heroPet.strength
            this.petSpeed = heroPet.speed
            this.heroPetAttackInterval()
        }
    }

    unequipPet = () => {
        this.equipedPet.shift()
        this.equipedPet = 0
        this.petStrength = 0
        this.petSpeed = 0
        this.petAttackAmount = 0
    }

    heroWeaponEquip = (weaponEquip) => {
        this.equipedHeroWeapon = weaponEquip
        this.equipedHeroWeaponDamage = weaponEquip.damage
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
        this.allStores.countStore.experiance = this.allStores.countStore.experiance + this.equipedPet.strength
        if (this.allStores.countStore.experiance >= this.allStores.countStore.experianceNeeded) {   
            this.allStores.countStore.HerolevelIncrease()
        }
    }

}

export default HeroStatsStore

// this.statCost = this.statCost * 2