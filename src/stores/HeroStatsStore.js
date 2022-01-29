import { makeAutoObservable } from "mobx";

class HeroStatsStore {

    health = 100
    strength = 1
    speed = 1
    constitution = 1
    luck = 1

    statCost = 100

    equipedHeroWeapon = {}
    equipedHeroWeaponDamage = 1

    heroAttackAmount = 1

    constructor() {
        makeAutoObservable(this);
    }

    heroAttackCalc = () => {
        this.heroAttackAmount = this.strength * this.equipedHeroWeaponDamage
    }

    equipHeroWeapon = (HeroWeaponId) => {
        this.equipedHeroWeapon = HeroWeaponId
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

}

export default HeroStatsStore

// this.statCost = this.statCost * 2