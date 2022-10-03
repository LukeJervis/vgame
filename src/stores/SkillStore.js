import { makeAutoObservable } from "mobx";
import { randomNumber } from "../components/helpers";
import SkillScreen from "../components/craftingSkills/SkillScreen";
import SkillObjectChoice from "../components/craftingSkills/SkillObjectChoice";
import CraftScreen from "../components/craftingSkills/CraftScreen";

class SkillStore {
    allStores;

    //Skills
    prefixNum = 1;
    prefix;
    suffix;

    //Skilling
    skillActive = false;
    skillType;
    setSkillInterval;
    skillTime;
    skillProgressState = 0;
    skillItem = {};
    skillName;
    selectedSkill;

    skillSlots = [];

    constructor(store) {
        this.allStores = store;
        makeAutoObservable(this);
    }

    passiveSkillScreen = (name) => {
        if (this.allStores.heroActionStore.selectedActionArea !== <SkillScreen />) {
            if (name === this.skillName || !this.skillActive) {
                this.skillName = name;
                this.selectedSkill = this.allStores.countStore.skills.find((skill) => skill.name === this.skillName);
                this.allStores.heroActionStore.selectedActionArea = <SkillScreen />;
            } else {
                console.log("Other skill in progress");
            }
        }
    };

    craftingScreen = (name) => {
        if (this.allStores.heroActionStore.selectedActionArea !== <CraftScreen />) {
            if (name === this.skillName || !this.skillActive) {
                this.skillName = name;
                this.selectedSkill = this.allStores.countStore.skills.find((skill) => skill.name === this.skillName);
                this.allStores.heroActionStore.selectedActionArea = <CraftScreen />;
            } else {
                console.log("Other skill in progress");
            }
        }
    };

    activeSkillScreen = (name) => {
        if (name === this.skillName || !this.skillActive) {
            this.skillName = name;
            this.selectedSkill = this.allStores.countStore.skills.find((skill) => skill.name === this.skillName);
            this.allStores.heroActionStore.selectedActionArea = <SkillObjectChoice />;
        } else {
            console.log("Other skill in progress");
        }
    };

    skilling = (skillItem) => {
        if (this.skillActive === true) {
            console.log("Tanning already in progress!");
        } else {
            this.skillActive = true;
            this.skillItem = skillItem;
            this.skillTime = this.skillItem.skillDiff / this.selectedSkill.level;
            this.skillInterval();
            skillItem.count--;
        }
    };

    activeSkilling = (skillObject) => {
        if (this.skillActive === true) {
            console.log("Something already in progress!");
        } else {
            this.skillActive = true;
            this.skillItem = skillObject;
            this.allStores.heroActionStore.skillBattleStart(skillObject);
        }
    };

    skillInterval = () => {
        this.setSkillInterval = setInterval(this.skillProgress, 100);
    };

    skillProgress = (action) => {
        if (this.skillActive === false) {
            console.log("Nothing to tan");
        } else if (this.skillProgressState >= this.skillTime - 1 && this.skillActive === true) {
            clearInterval(this.setSkillInterval);
            this.skillComplete();
        } else if (action === "click") {
            this.skillProgressState++;
        } else {
            this.skillProgressState++;
        }
    };

    skillComplete = () => {
        const statChance = this.skillItem.skillDiff - this.selectedSkill.Level;
        const numberGen = randomNumber(0, statChance);
        if (numberGen <= 40) {
            this.prefixNum++;
        }
        if (numberGen <= 30) {
            this.prefixNum++;
        }
        if (numberGen <= 20) {
            this.prefixNum++;
        }
        if (numberGen <= 10) {
            this.prefixNum++;
        }
        if (numberGen <= 5) {
            this.prefixNum++;
        }
        //Gets the correct prefix
        if (this.prefixNum === 6) {
            this.prefix = "Mythic ";
        } else if (this.prefixNum === 5) {
            this.prefix = "Perfect ";
        } else if (this.prefixNum === 4) {
            this.prefix = "Superb ";
        } else if (this.prefixNum === 3) {
            this.prefix = "Fine ";
        } else if (this.prefixNum === 2) {
            this.prefix = "Normal ";
        } else {
            this.prefix = "Scrap ";
        }
        let finnishedProduct = {
            prefix: this.prefix,
            suffix: this.skillItem.condition[1],
            name: this.prefix + this.skillItem.name,
            cost: this.skillItem.cost * +this.prefixNum,
            stack: this.skillItem.stack,
            type: this.skillItem.type,
            amount: this.skillItem.amount ? this.skillItem.amount : 1,
            icon: this.skillItem.skilledIcon,
            count: 1,
            skill: "none",
        };
        this.prefixNum = 0;
        this.skillActive = false;
        this.skillProgressState = 0;
        this.allStores.heroInventoryStore.inventoryPlacement(finnishedProduct);
        this.allStores.countStore.skillExperienceIncrease(this.selectedSkill, this.skillItem.xp);
    };
}

export default SkillStore;
