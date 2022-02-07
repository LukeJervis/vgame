import { makeAutoObservable } from "mobx";
import Clicker from "../components/Clicker";
import monsters from '../heroEquipment/monsters.json'
import PatrolBattle from "../components/PatrolLocations/PatrolBattle";
import { randomNumber } from '../components/helpers'
import InfoModal from '../components/modalHell/InfoModal'

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
    monsterXp
    monsterMoneyDrop
    monsterDeath = false
    underAttack = false

    heroHealthCheckInterval

    constructor(store) {
        this.allStores = store
        makeAutoObservable(this);
    }

    patrolBattleStart = (location, num1, num2) => {
        if (!location) {
            this.monster = null
            this.monsterName = 0
            this.monsterHealth = 0
            this.monsterStrength = 0
            this.monsterSpeed = 0
            this.monsterLevel = 0
            this.monsterMoneyDrop = 0
            this.monsterXp = 0
            this.selectedActionArea = null
            this.allStores.heroStatsStore.health = this.allStores.heroStatsStore.maxHealth
            clearInterval(this.monsterInterval)
            clearInterval(this.heroHealthCheckInterval)
            this.selectedActionArea = <Clicker />
        } else if (this.allStores.heroStatsStore.health <= 0) {
            console.log('Erm... your dead?')
        } else {
            console.log(num1);
            this.monster = monsters[randomNumber(num1, num2)]
            this.monsterName = this.monster.name
            this.monsterHealth = this.monster.health
            this.monsterStrength = this.monster.strength - this.allStores.heroStatsStore.constitution
            this.monsterSpeed = this.monster.speed / this.allStores.heroStatsStore.speed
            this.monsterLevel = this.monster.level
            this.monsterXp = +this.monster.xp
            this.monsterMoneyDrop = randomNumber(+this.monster.moneyMin, +this.monster.moneyMax)
            this.selectedActionArea = <PatrolBattle location={location} num1={num1} num2={num2} />
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
        this.monsterMoneyDrop = randomNumber(+this.monster.moneyMin, +this.monster.moneyMax)
        this.allStores.countStore.heroMoney = this.allStores.countStore.heroMoney + this.monsterMoneyDrop
        this.allStores.countStore.experience = this.allStores.countStore.experience + this.monsterXp
        console.log('this.monsterDeath', this.monsterDeath);
        this.monsterDeath = true
        console.log('this.monsterDeath', this.monsterDeath);
    }

    patrolLoss = () => {
        clearInterval(this.monsterInterval)
        clearInterval(this.heroHealthCheckInterval)
        this.allStores.countStore.money = this.allStores.countStore.heroMoney *= 0.9
        this.allStores.countStore.coinSort()
        this.allStores.heroStatsStore.equipedPet.health--
    }
    
}

export default HeroActionStore