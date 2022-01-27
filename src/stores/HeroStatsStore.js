import { makeAutoObservable } from "mobx";

class HeroStatsStore {

    health = 100
    strength = 1
    speed = 1
    constitution = 1
    luck = 1

    equipedHeroWeapon = {}
    equipedHeroWeaponDamage = 0

    heroAttackAmount = 1

    constructor() {
        makeAutoObservable(this);
    }

    heroAttackCalc = () => {
        this.heroAttackAmount = this.strength + this.equipedHeroWeaponDamage
    }

    equipHeroWeapon = (HeroWeaponId) => {
        this.equipedHeroWeapon = HeroWeaponId
    }

    heroWeaponEquip = (weaponEquip) => {
        this.equipedHeroWeapon = weaponEquip
        this.equipedHeroWeaponDamage = weaponEquip.damage
    }

}

export default HeroStatsStore