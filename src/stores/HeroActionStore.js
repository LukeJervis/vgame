import { makeAutoObservable } from "mobx";
import Clicker from "../components/Clicker";
// import monsters from '../heroEquipment/monsters.json'
import fieldBoss from '../components/monsters/fieldBoss.json'
import levelChart from '../components/monsters/levelChart.json'
import monsters from '../components/monsters/monsters.json'
import PatrolBattle from "../components/PatrolLocations/PatrolBattle";
import { randomNumber } from '../components/helpers'
import lootDrop from "../components/LootDrop";
import _ from 'lodash'

class HeroActionStore {

    allStores

    selectedActionArea = <Clicker />

    location
    levelMin
    levelMax
    MIA
    FBIA

    monster
    monsterName = ''
    monsterHealth = 1
    monsterStrength
    monsterSpeed
    monsterLuck
    monsterLevel
    monsterInterval
    monsterXp
    monsterMoneyDrop
    monsterDrop
    monsterLevelMulti

    underAttack = false

    heroHealthCheckInterval

    //Skills
    prefixNum = 1
    prefix

    //Tanning
    tanningActive = false
    setTanInterval
    tanTime
    tanningProgressState = 0
    rawHide = {}

    constructor(store) {
        this.allStores = store
        makeAutoObservable(this);
    }

    get monsterDeath() {
        return this.monsterHealth <= 0
    }

    patrolBattleStart = (location, levelMin, levelMax, MIA, FBIA) => {
        if (!location) {
            this.monster = null
            this.levelMin = null
            this.levelMax = null
            this.MIA = []
            this.FBIA = []
            this.monsterName = 0
            this.monsterStrength = 0
            this.monsterSpeed = 0
            this.monsterLevel = 0
            this.monsterMoneyDrop = 0
            this.monsterNormalDrop = 0
            this.monsterRareDrop = 0
            this.monsterXp = 0
            this.monsterLevelMulti = 0
            this.monsterHealth = 1
            this.selectedActionArea = null
            clearInterval(this.monsterInterval)
            clearInterval(this.heroHealthCheckInterval)
            clearInterval(this.petInterval)
            this.selectedActionArea = <Clicker />
        } else if (this.allStores.heroStatsStore.health <= 0) {
            console.log('Erm... your dead?')
        } else {
            //Boss roll
            if (FBIA.length > 0 && randomNumber(0, 100) <= 1) {
                this.levelMin = levelMin
                this.levelMax = levelMax
                this.MIA = MIA
                this.FBIA = FBIA
                this.monster = fieldBoss[_.sample(FBIA)]
                this.monsterLevelMulti = levelChart[(levelMax) - 1]
                this.monsterName = this.monster.name
                this.monsterHealth = this.monster.health * this.monsterLevelMulti.multi
                this.monsterStrength = this.monster.strength * this.monsterLevelMulti.multi - (this.allStores.heroStatsStore.constitution + this.allStores.heroStatsStore.equipedHeroArmour)
                this.monsterSpeed = this.monster.speed * this.monsterLevelMulti.multi
                this.monsterXp = this.monster.xp * this.monsterLevelMulti.multi
                this.monsterLevel = this.monsterLevelMulti.level
                this.location = location
                this.monsterMoneyDrop = Math.round(randomNumber(this.monster.moneyMin, this.monster.moneyMax) * this.monsterLevelMulti.multi)
                if (this.monsterStrength < 1) {
                        this.monsterStrength = 1
                    }
                this.selectedActionArea = <PatrolBattle location={location} />
            } else {
                this.levelMin = levelMin
                this.levelMax = levelMax
                this.MIA = MIA
                this.FBIA = FBIA
                this.monster = monsters[_.sample(MIA)]
                this.monsterLevelMulti = levelChart[randomNumber(levelMin, levelMax)] 
                this.monsterName = this.monster.name
                this.monsterHealth = this.monster.health * this.monsterLevelMulti.multi
                this.monsterStrength = (this.monster.strength * this.monsterLevelMulti.multi) - (this.allStores.heroStatsStore.constitution + this.allStores.heroStatsStore.equipedHeroArmour)
                this.monsterSpeed = this.monster.speed * this.monsterLevelMulti.multi
                this.monsterXp = this.monster.xp * this.monsterLevelMulti.multi
                this.monsterLevel = this.monsterLevelMulti.level
                this.location = location
                this.monsterMoneyDrop = Math.round(randomNumber(this.monster.moneyMin, this.monster.moneyMax) * this.monsterLevelMulti.multi)
                if (this.monsterStrength < 1) {
                        this.monsterStrength = 1
                    }
                this.selectedActionArea = <PatrolBattle location={location} />
            }
        }
    }
    
    patrolBattleAttack = () => {
        this.allStores.heroStatsStore.heroAttackCalc()
        if (this.monsterHealth <= 0) {
            console.log('He dead yo!');
        } else if (this.allStores.heroStatsStore.heroAttackAmount >= this.monsterHealth) {
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
                this.heroPetInterval()
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

    heroPetInterval = () => {
        if (this.allStores.heroStatsStore.equipedPet.name) {
        this.petInterval = setInterval(this.heroPetAttack, 1000 / this.allStores.heroStatsStore.equipedPet.speed)
        }
    }

    heroPetAttack = () => {
        this.monsterHealth = this.monsterHealth - this.allStores.heroStatsStore.equipedPet.strength
    }
    
    heroMonsterAttackInterval = () => {
        this.monsterInterval = setInterval(this.monsterAttack, 1000 / this.monsterSpeed)
    }
    
    monsterAttack = () => {
        this.allStores.heroStatsStore.health = this.allStores.heroStatsStore.health - Math.round(this.monsterStrength)
    }
    
    patrolWin = () => {
        clearInterval(this.monsterInterval)
        clearInterval(this.heroHealthCheckInterval)
        clearInterval(this.petInterval)
        this.allStores.countStore.heroMoney = this.allStores.countStore.heroMoney + this.monsterMoneyDrop
        this.allStores.countStore.experience = this.allStores.countStore.experience + this.monsterXp
        this.allStores.countStore.levelCalc()
        this.lootDrops()
    }

    patrolLoss = () => {
        clearInterval(this.monsterInterval)
        clearInterval(this.heroHealthCheckInterval)
        clearInterval(this.petInterval)
        this.allStores.countStore.money = this.allStores.countStore.heroMoney *= 0.9
        this.allStores.countStore.coinSort()
        this.allStores.heroStatsStore.equipedPet.health--
        this.allStores.heroStatsStore.health = 0
    }

    lootDrops = () => {
        this.monsterDrop = lootDrop(this.monster, this.allStores.heroStatsStore.luck)
        for (let i = 0; i < this.monsterDrop.length; i++) {
            this.allStores.heroInventoryStore.inventoryPlacement(this.monsterDrop[i])
        }
        this.monsterDrop = null
    }

    tanning = (hide) => {
        if (this.tanningActive === true) {
            console.log('Tanning already in progress!');
        } else if (hide.skill !== 'tannable' ) {
            console.log('Can\'t tan this!');
        } else {
            this.rawHide = hide
            this.tanTime = (hide.tanDifficulty / this.allStores.countStore.tanningLevel) * 10
            this.setTanInterval = setInterval(this.tanningProgress(null), 1000)
        }
    }  

    tanningProgress = (action) => {
        if (this.tanningProgressState === this.tanTime) {
            this.tanningComplete()
            clearInterval(this.setTanInterval)
        } else if (action === 'click') {
            this.tanningProgressState = this.tanningProgressState + this.allStores.countStore.tanningLevel
        } else {
            this.tanningProgressState++
        }
    }

    tanningComplete = () => {
        const tanChance = this.rawHide.tanDifficulty - this.allStores.countStore.tanningLevel
        if (randomNumber(0, tanChance) <= 10) {
            this.prefixNum++
        }
        if (randomNumber(0, tanChance) <= 9) {
            this.prefixNum++
        }
        if (randomNumber(0, tanChance) <= 8) {
            this.prefixNum++
        }
        if (randomNumber(0, tanChance) <= 7) {
            this.prefixNum++
        }
        if (randomNumber(0, tanChance) <= 6) {
            this.prefixNum++
        }
        //Gets the correct prefix
        if (this.prefixNum === 6) {
            this.prefix = 'Mythic '
        } else if (this.prefixNum === 5) {
            this.prefix = 'Perfect '
        } else if (this.prefixNum === 4) {
            this.prefix = 'Superb '
        } else if (this.prefixNum === 3) {
            this.prefix = 'Good '
        } else if (this.prefixNum === 2) {
            this.prefix = 'Normal '
        } else {
            this.prefix = 'Torn '
        }
        let tannedHide = {
            prefix: this.prefix,
            name: this.prefix + this.rawHide.name,
            cost: this.rawHide.cost * +this.prefixNum,
            stack: this.rawHide.stack,
            type: this.rawHide.type,
            amount: this.rawHide.amount ? this.rawHide.amount : 1,
            icon: this.rawHide.tannedIcon,
            count: this.rawHide.count,
            skill: 'none',
            id: Math.random().toString(36)
        }
        this.allStores.heroInventoryStore.heroItemsInv.push(tannedHide)
    }
}

export default HeroActionStore