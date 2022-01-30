import { makeAutoObservable } from "mobx";

class HeroStatsStore {

    allStores

    health = 100
    strength = 1000000
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

    petAttackAmount = 0

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
            
        }
        this.equipedPet = heroPet
        this.petStrength = heroPet.strength
        this.petSpeed = heroPet.speed
        this.petAttackAmount = this.petStrength
        console.log(this.allStores.countStore.experiance);
        this.heroPetAttackInterval()
    }

    heroWeaponEquip = (weaponEquip) => {
        this.equipedHeroWeapon = weaponEquip
        this.equipedHeroWeaponDamage = weaponEquip.damage
    }

    handleStatBuy = (statPurchase) => {
        if (statPurchase === 'strength'){
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

    heroPetAttackInterval = () => {
        setInterval(this.heroPetAttack, 1000 / this.equipedPet.speed)
        console.log("hit", this.equipedPet.speed);
    }

    heroPetAttack = () => {
        this.allStores.countStore.experiance = this.allStores.countStore.experiance + this.petAttackAmount
    }

}

export default HeroStatsStore

// this.statCost = this.statCost * 2