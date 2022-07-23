import { makeAutoObservable } from "mobx";
import Clicker from "../components/Clicker";
// import monsters from '../heroEquipment/monsters.json'
import fieldBoss from "../components/monsters/fieldBoss.json";
import levelChart from "../components/monsters/levelChart.json";
import monsters from "../components/monsters/monsters.json";
import SkillBattle from "../components/PatrolLocations/SkillBattle";
import PatrolBattle from "../components/PatrolLocations/PatrolBattle";
import { randomNumber } from "../components/helpers";
import lootDrop from "../components/LootDrop";
import _ from "lodash";

class HeroActionStore {
    allStores;

    selectedActionArea = (<Clicker />);

    location;
    levelMin;
    levelMax;
    MIA;
    FBIA;

    monster;
    monsterName = "";
    monsterHealth = 1;
    monsterStrength;
    monsterSpeed;
    monsterConstitution;
    monsterLuck;
    monsterLevel;
    monsterInterval;
    monsterXp;
    monsterMoneyDrop = 0;
    monsterDrop;
    monsterLevelMulti;

    lootDisplay = [];

    underAttack = false;

    heroHealthCheckInterval;

    //Skills
    prefixNum = 1;
    prefix;

    //Tanning
    tanningActive = false;
    setTanInterval;
    tanTime;
    tanningProgressState = 0;
    rawHide = {};

    skillName;

    constructor(store) {
        this.allStores = store;
        makeAutoObservable(this);
    }

    get monsterDeath() {
        return this.monsterHealth <= 0;
    }

    patrolBattleStart = (location, levelMin, levelMax, MIA, FBIA) => {
        if (!location) {
            this.monster = null;
            this.levelMin = null;
            this.levelMax = null;
            this.MIA = [];
            this.FBIA = [];
            this.monsterName = 0;
            this.monsterStrength = 0;
            this.monsterSpeed = 0;
            this.monsterLevel = 0;
            this.monsterMoneyDrop = 0;
            this.monsterNormalDrop = 0;
            this.monsterRareDrop = 0;
            this.monsterXp = 0;
            this.monsterLevelMulti = 0;
            this.monsterHealth = 1;
            this.selectedActionArea = null;
            clearInterval(this.monsterInterval);
            clearInterval(this.heroHealthCheckInterval);
            clearInterval(this.petInterval);
            this.selectedActionArea = <Clicker />;
        } else if (this.allStores.heroStatsStore.health <= 0) {
            console.log("Erm... your dead?");
        } else {
            //Boss roll
            if (FBIA.length > 0 && randomNumber(0, 100) <= 1) {
                this.levelMin = levelMin;
                this.levelMax = levelMax;
                this.MIA = MIA;
                this.FBIA = FBIA;
                this.monster = fieldBoss[_.sample(FBIA)];
                this.monsterLevelMulti = levelChart[levelMax - 1];
                this.monsterName = this.monster.name;
                this.monsterHealth = this.monster.health * this.monsterLevelMulti.multi;
                this.monsterStrength =
                    this.monster.strength * this.monsterLevelMulti.multi -
                    (this.allStores.heroStatsStore.constitution + this.allStores.heroStatsStore.equipedHeroArmour);
                this.monsterSpeed =
                    (this.monster.speed * this.monsterLevelMulti.multi) / this.allStores.heroStatsStore.speed;
                this.monsterXp = this.monster.xp * this.monsterLevelMulti.multi;
                this.monsterLevel = this.monsterLevelMulti.level;
                this.location = location;
                this.monsterMoneyDrop = Math.round(
                    randomNumber(this.monster.moneyMin, this.monster.moneyMax) * this.monsterLevelMulti.multi
                );
                if (this.monsterStrength < 1) {
                    this.monsterStrength = 1;
                }
                this.selectedActionArea = <PatrolBattle location={location} monsterImage={this.monster.image} />;
            } else {
                this.levelMin = levelMin;
                this.levelMax = levelMax;
                this.MIA = MIA;
                this.FBIA = FBIA;
                this.monster = monsters[_.sample(MIA)];
                this.monsterLevelMulti = levelChart[randomNumber(levelMin, levelMax)];
                this.monsterName = this.monster.name;
                this.monsterHealth = this.monster.health * this.monsterLevelMulti.multi;
                this.monsterConstitution = this.monster.constitution;
                this.monsterStrength =
                    this.monster.strength * this.monsterLevelMulti.multi -
                    (this.allStores.heroStatsStore.constitution + this.allStores.heroStatsStore.equipedHeroArmour);
                this.monsterSpeed =
                    (this.monster.speed * this.monsterLevelMulti.multi) / this.allStores.heroStatsStore.speed;
                this.monsterXp = this.monster.xp * this.monsterLevelMulti.multi;
                this.monsterLevel = this.monsterLevelMulti.level;
                this.location = location;
                this.monsterMoneyDrop = Math.round(
                    randomNumber(this.monster.moneyMin, this.monster.moneyMax) * this.monsterLevelMulti.multi
                );
                if (this.monsterStrength < 1) {
                    this.monsterStrength = 1;
                }
                this.selectedActionArea = <PatrolBattle location={location} monsterImage={this.monster.image} />;
            }
        }
    };

    skillBattleStart = (object) => {
        if (this.allStores.heroStatsStore.health <= 0) {
            console.log("Erm... your dead?");
        } else {
            this.skillName = object.skill;
            this.monster = object;
            this.monsterLevel = object.level;
            this.monsterName = this.monster.name;
            this.monsterHealth = this.monster.health;
            this.monsterConstitution = this.monster.constitution;
            this.monsterXp = this.monster.xp;
            this.location = object;
            this.selectedActionArea = <SkillBattle location={this.monsterName} />;
        }
    };

    patrolBattleAttack = () => {
        this.allStores.heroStatsStore.heroAttackCalc();
        if (this.monsterHealth <= 0) {
            console.log("He dead yo!");
        } else if (this.allStores.heroStatsStore.heroAttackAmount - this.monsterConstitution >= this.monsterHealth) {
            this.monsterHealth = 0;
            this.underAttack = false;
            this.patrolWin();
        } else if (this.allStores.heroStatsStore.health <= 0) {
            console.log("ye ded!");
        } else {
            if (!this.underAttack) {
                this.monsterHealth -= this.allStores.heroStatsStore.heroAttackAmount - this.monsterConstitution;
                this.underAttack = true;
                this.heroMonsterAttackInterval();
                this.heroHealthInterval();
                this.heroPetInterval();
            } else {
                this.monsterHealth -= this.allStores.heroStatsStore.heroAttackAmount - this.monsterConstitution;
                if (this.monsterHealth <= 0) {
                    this.underAttack = false;
                    this.patrolWin();
                }
            }
        }
    };

    skillAttack = () => {
        this.allStores.heroStatsStore.heroAttackCalc();
        if (this.monsterHealth <= 0) {
            console.log("He dead yo!");
        } else if (this.allStores.heroStatsStore.heroAttackAmount - this.monsterConstitution >= this.monsterHealth) {
            this.monsterHealth = 0;
            this.underAttack = false;
            this.patrolWin();
        } else if (this.allStores.heroStatsStore.health <= 0) {
            console.log("ye ded!");
        } else {
            if (!this.underAttack) {
                this.monsterHealth -= this.allStores.heroStatsStore.heroAttackAmount - this.monsterConstitution;
                this.underAttack = true;
            } else {
                this.monsterHealth -= this.allStores.heroStatsStore.heroAttackAmount - this.monsterConstitution;
                if (this.monsterHealth <= 0) {
                    this.underAttack = false;
                    this.patrolWin();
                }
            }
        }
    };

    heroHealthInterval = () => {
        this.heroHealthCheckInterval = setInterval(this.heroHealthStatement, 10);
    };

    heroHealthStatement = () => {
        if (this.allStores.heroStatsStore.health <= 0) {
            this.underAttack = false;
            this.patrolLoss();
        }
    };

    heroPetInterval = () => {
        if (this.allStores.heroStatsStore.equipedPet.name) {
            this.petInterval = setInterval(this.heroPetAttack, 1000 / this.allStores.heroStatsStore.equipedPet.speed);
        }
    };

    heroPetAttack = () => {
        this.monsterHealth -= this.allStores.heroStatsStore.equipedPet.strength;
    };

    heroMonsterAttackInterval = () => {
        this.monsterInterval = setInterval(this.monsterAttack, 1000 / this.monsterSpeed);
    };

    monsterAttack = () => {
        this.allStores.heroStatsStore.health -= Math.round(this.monsterStrength);
    };

    patrolWin = () => {
        if (this.skillName === "woodCutting") {
            this.allStores.countStore.skillExperienceIncrease(this.allStores.countStore.woodCutting, this.monster.xp);
            this.allStores.skillStore.skillActive = false;
            this.lootDrops();
        } else {
            clearInterval(this.monsterInterval);
            clearInterval(this.heroHealthCheckInterval);
            clearInterval(this.petInterval);
            this.allStores.countStore.heroMoney += this.monsterMoneyDrop;
            this.allStores.countStore.experience += this.monsterXp;
            this.allStores.countStore.levelCalc();
            this.lootDrops();
        }
    };

    patrolLoss = () => {
        clearInterval(this.monsterInterval);
        clearInterval(this.heroHealthCheckInterval);
        clearInterval(this.petInterval);
        this.allStores.countStore.money = this.allStores.countStore.heroMoney *= 0.9;
        this.allStores.countStore.coinSort();
        this.allStores.heroStatsStore.equipedPet.health--;
        this.allStores.heroStatsStore.health = 0;
    };

    lootDrops = () => {
        this.monsterDrop = lootDrop(this.monster, this.allStores.heroStatsStore.luck);
        for (let i = 0; i < this.monsterDrop.length; i++) {
            this.allStores.heroInventoryStore.inventoryPlacement(this.monsterDrop[i]);
            this.lootDisplay.push(this.monsterDrop[i]);
        }
        this.monsterDrop = null;
    };

    lootDropReset = () => {
        this.lootDisplay = [];
    };
}

export default HeroActionStore;
