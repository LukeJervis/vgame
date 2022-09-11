import { makeAutoObservable } from "mobx";

class CountStore {
    allStores;

    experience = 0;
    heroWeapon = 0;
    heroLevel = 1;
    levelMultiplier = 1.5;
    experienceNeeded = 10;

    heroMoney = 0;
    ironCoin = "0";
    copperCoin = "0";
    silverCoin = "0";
    goldCoin = "0";

    //Just make it an array already!!!!!
    skills = [
        {
            level: 1,
            experience: 0,
            levelMultiplier: 1.5,
            experienceNeeded: 10,
            name: "Tanning",
        },
        {
            level: 1,
            experience: 0,
            levelMultiplier: 1.5,
            experienceNeeded: 10,
            name: "Smelting",
        },
        {
            level: 1,
            experience: 0,
            levelMultiplier: 1.5,
            experienceNeeded: 10,
            name: "Wood Cutting",
        },
        {
            level: 1,
            experience: 0,
            levelMultiplier: 1.5,
            experienceNeeded: 10,
            slots: 1,
            name: "Weapon Crafting",
        },
    ];

    varLevel;
    varLevelMulti;
    varexperienceNeeded;
    varExperience;

    constructor(store) {
        this.allStores = store;
        makeAutoObservable(this);
    }

    experienceIncrease = (props) => {
        this.experience = this.experience + props;
        this.levelCalc();
    };

    skillExperienceIncrease = (skill, xp) => {
        skill.experience += xp;
        this.levelCalc(skill);
    };

    levelCalc = (skill) => {
        if (skill) {
            this.varLevel = skill.level;
            this.varLevelMulti = skill.levelMultiplier;
            this.varExperienceNeeded = skill.experienceNeeded;
            this.varExperience = skill.experience;
        } else {
            this.varLevel = this.heroLevel;
            this.varLevelMulti = this.levelMultiplier;
            this.varExperienceNeeded = this.experienceNeeded;
            this.varExperience = this.experience;
        }
        if (this.varLevel > 10) {
            this.varLevelMulti = 2;
        } else if (this.varLevel > 20) {
            this.varLevelMulti = 2.5;
        } else if (this.varLevel > 30) {
            this.varLevelMulti = 3;
        } else if (this.varLevel > 40) {
            this.varLevelMulti = 3.5;
        } else if (this.varLevel > 50) {
            this.varLevelMulti = 4;
        } else if (this.varLevel > 60) {
            this.varLevelMulti = 4.5;
        } else if (this.varLevel > 70) {
            this.varLevelMulti = 5;
        } else if (this.varLevel > 80) {
            this.varLevelMulti = 5.5;
        } else if (this.varLevel > 90) {
            this.varLevelMulti = 6;
        } else if (this.varLevel > 100) {
            this.varLevelMulti = 8;
        } else if (this.varLevel > 200) {
            this.varLevelMulti = 9;
        } else if (this.varLevel > 300) {
            this.varLevelMulti = 10;
        }
        if (this.varExperienceNeeded <= this.varExperience) {
            this.herolevelIncrease(skill);
        }
    };

    herolevelIncrease = (skill) => {
        if (skill) {
            skill.level++;
            this.allStores.heroStatsStore.maxHealth += 2;
            this.allStores.heroStatsStore.health = this.allStores.heroStatsStore.maxHealth;
            skill.experienceNeeded = skill.level * (skill.level * (skill.level * skill.level)) * skill.levelMultiplier;
            skill.experience = 0;
        } else {
            this.heroLevel++;
            this.allStores.heroStatsStore.maxHealth += 10;
            this.allStores.heroStatsStore.health = this.allStores.heroStatsStore.maxHealth;
            this.experienceNeeded =
                this.heroLevel * (this.heroLevel * (this.heroLevel * this.heroLevel)) * this.levelMultiplier;
            this.experience = 0;
            if (this.heroLevel.toString().slice(-1)) {
                this.heroMoney = this.heroMoney + this.heroLevel * this.heroLevel;
            }
        }
    };

    coinSort = () => {
        this.ironCoin = this.heroMoney.toString().slice(-2) <= 0 ? 0 : this.heroMoney.toString().slice(-2);
        this.copperCoin = this.heroMoney.toString().slice(-4, -2) <= 0 ? 0 : this.heroMoney.toString().slice(-4, -2);
        this.silverCoin = this.heroMoney.toString().slice(-6, -4) <= 0 ? 0 : this.heroMoney.toString().slice(-6, -4);
        this.goldCoin = this.heroMoney.toString().slice(-8, -6) <= 0 ? 0 : this.heroMoney.toString().slice(-9, -6);
        this.heroMoney = Math.floor(this.heroMoney);
        if (this.heroMoney <= 0) {
            this.heroMoney = 0;
        }
    };

    purchaseMoneyCount = (amount) => {
        this.heroMoney = this.heroMoney - amount;
    };

    spendexperience = (amount) => {
        this.experience = this.experience - amount;
    };
}

export default CountStore;
