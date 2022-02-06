import { makeAutoObservable } from "mobx";
import Clicker from "../components/Clicker";
import monsters from '../heroEquipment/monsters.json'
import PatrolBattle from "../components/PatrolLocations/PatrolBattle";
import { randomNumber } from '../components/helpers'

class HeroActionStore {

    allStores

    selectedActionArea = <Clicker />

    monster
    monsterName
    monsterHealth = '0'
    monsterStrength
    monsterSpeed
    monsterLuck
    monsterLevel
    monsterInterval
    underAttack = false

    heroHealthCheckInterval

    constructor(store) {
        this.allStores = store
        makeAutoObservable(this);
    }

    patrolBattleStart = (location) => {
        if (!location) {
            this.selectedActionArea = <Clicker />
            this.monster = null
            this.monsterName = 0
            this.monsterHealth = 0
            this.monsterStrength = 0
            this.monsterSpeed = 0
            this.monsterLevel = 0
            this.monsterMoneyDrop = 0
            this.selectedActionArea = null
            this.selectedActionArea = <Clicker />
        } else if (this.allStores.heroStatsStore.health <= 0) {
            console.log('Erm... your dead?')
        } else {
            this.monster = monsters[randomNumber(0, 9)]
            this.monsterName = this.monster.name
            this.monsterHealth = this.monster.health
            this.monsterStrength = this.monster.strength - this.allStores.heroStatsStore.constitution
            this.monsterSpeed = this.monster.speed / this.allStores.heroStatsStore.speed
            this.monsterLevel = this.monster.level
            this.monsterMoneyDrop = randomNumber(+this.monster.moneyMin, +this.monster.moneyMax)
            this.selectedActionArea = <PatrolBattle location="City Outskirts" />
        }
    }
    
    patrolBattleAttack = () => {
        this.allStores.heroStatsStore.heroAttackCalc()

        if (this.monsterHealth <= 0) {
            console.log('He dead yo!');
        } else if (this.allStores.heroStatsStore.heroAttackAmount > this.monsterHealth) {
            this.monsterHealth = 0
            this.underAttack = false
            this.patrolWin()
        } else if (this.allStores.heroStatsStore.health <= 0) {
            console.log('ye ded!');
        } else {
            if (!this.underAttack) {
                this.monsterHealth = this.monsterHealth - this.allStores.heroStatsStore.heroAttackAmount
                this.underAttack = true
                this.heroMonsterAttackInterval()
                this.heroHealthInterval()
            } else {
                this.monsterHealth = this.monsterHealth - this.allStores.heroStatsStore.heroAttackAmount
                if (this.monsterHealth <= 0) {
                    this.underAttack = false
                    this.patrolWin()
                }
            }
        }
    }

    heroHealthInterval = () => {
        this.heroHealthCheckInterval = setInterval(this.heroHealthStatement, 10)
    }
    
    heroHealthStatement = () => {
        if (this.allStores.heroStatsStore.health <= 0) {
            this.underAttack = false
            this.patrolLoss()
        }
    }
    
    heroMonsterAttackInterval = () => {
        this.monsterInterval = setInterval(this.monsterAttack, 1000 / this.monsterSpeed)
    }
    
    monsterAttack = () => {
        this.allStores.heroStatsStore.health = this.allStores.heroStatsStore.health - this.monsterStrength
    }
    
    patrolWin = () => {
        clearInterval(this.monsterInterval)
        clearInterval(this.heroHealthCheckInterval)
        this.allStores.countStore.heroMoney = this.allStores.countStore.heroMoney + randomNumber(+this.monster.moneyMin, +this.monster.moneyMax)
    }

    patrolLoss = () => {
        clearInterval(this.monsterInterval)
        clearInterval(this.heroHealthCheckInterval)
        this.allStores.countStore.money = this.allStores.countStore.heroMoney *= 0.9
        this.allStores.heroStatsStore.equipedPet.health--
    }
    
}

export default HeroActionStore