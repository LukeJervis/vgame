import { makeAutoObservable } from "mobx";

class CountStore {

    experiance = 0
    heroWeapon = 0
    // experianceGain = 1 + this.heroWeapon
    heroLevel = 1
    levelMultiplier = 1.5
    experianceNeeded = 10

    heroMoney = 0
    ironCoin = '0'
    copperCoin = '0'
    silverCoin = '0'
    goldCoin = '0'

    constructor() {
        makeAutoObservable(this);
    }

    experianceIncrease = (props) => {
        this.experiance = this.experiance + props
        this.levelCalc()
    }

    levelCalc = () => {
        if (this.experianceNeeded <= this.experiance) {
            this.HerolevelIncrease()
        }
    }

    HerolevelIncrease = () => {
        this.heroLevel++
        this.experianceNeeded = this.heroLevel * (this.heroLevel * (this.heroLevel * this.heroLevel)) * this.levelMultiplier
        this.experiance = 0
        if (this.heroLevel.toString().slice(-1)) {
            this.heroMoney = this.heroMoney + (this.heroLevel * this.heroLevel)
        }
    }

    coinSort = () => {
        this.ironCoin = (this.heroMoney.toString().slice(-2) <= 0) ? 0 : this.heroMoney.toString().slice(-2)
        this.copperCoin = (this.heroMoney.toString().slice(-4, -2) <= 0) ? 0 : this.heroMoney.toString().slice(-4, -2)
        this.silverCoin = (this.heroMoney.toString().slice(-6, -4) <= 0) ? 0 : this.heroMoney.toString().slice(-6, -4)
        this.goldCoin = (this.heroMoney.toString().slice(-8, -6) <= 0) ? 0 : this.heroMoney.toString().slice(-8, -6)
    }

    purchaseMoneyCount = (amount) => {
        this.heroMoney = this.heroMoney - amount
    }

}

export default CountStore