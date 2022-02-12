import { makeAutoObservable } from "mobx";

class CountStore {

    allStores

    experience = 0
    heroWeapon = 0
    heroLevel = 1
    levelMultiplier = 1.5
    experienceNeeded = 10

    heroMoney = 0
    ironCoin = '0'
    copperCoin = '0'
    silverCoin = '0'
    goldCoin = '0'

    constructor(store) {
        this.allStores = store
        makeAutoObservable(this);
    }

    experienceIncrease = (props) => {
        this.experience = this.experience + props
        this.levelCalc()
    }

    levelCalc = () => {
        if (this.experienceNeeded <= this.experience) {
            this.HerolevelIncrease()
        }
    }

    HerolevelIncrease = () => {
        this.heroLevel++
        this.allStores.heroStatsStore.maxHealth = this.allStores.heroStatsStore.maxHealth + 10
        this.allStores.heroStatsStore.health = this.allStores.heroStatsStore.maxHealth
        this.experienceNeeded = this.heroLevel * (this.heroLevel * (this.heroLevel * this.heroLevel)) * this.levelMultiplier
        this.experience = 0
        if (this.heroLevel.toString().slice(-1)) {
            this.heroMoney = this.heroMoney + (this.heroLevel * this.heroLevel)
        }
    }

    coinSort = () => {
        this.ironCoin = (this.heroMoney.toString().slice(-2) <= 0) ? 0 : this.heroMoney.toString().slice(-2)
        this.copperCoin = (this.heroMoney.toString().slice(-4, -2) <= 0) ? 0 : this.heroMoney.toString().slice(-4, -2)
        this.silverCoin = (this.heroMoney.toString().slice(-6, -4) <= 0) ? 0 : this.heroMoney.toString().slice(-6, -4)
        this.goldCoin = (this.heroMoney.toString().slice(-8, -6) <= 0) ? 0 : this.heroMoney.toString().slice(-9, -6)
        this.heroMoney = Math.floor(this.heroMoney)
        if (this.heroMoney <= 0) {
            this.heroMoney = 0
        }
    }

    purchaseMoneyCount = (amount) => {
        this.heroMoney = this.heroMoney - amount
    }

    spendexperience = (amount) => {
        this.experience  = this.experience - amount
    }

}

export default CountStore