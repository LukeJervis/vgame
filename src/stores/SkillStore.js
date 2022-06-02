import { makeAutoObservable } from "mobx";
import { randomNumber } from "../components/helpers";
import SkillScreen from "../components/craftingSkills/SkillScreen";

class SkillStore {
    allStores;

    //Skills
    prefixNum = 1;
    prefix;
    suffix;
    // skillItems;

    //Skilling
    skillActive = false;
    skillType;
    setSkillInterval;
    skillTime;
    skillProgressState = 0;
    skillItem = {};
    skillName;
    skillTypeName;

    constructor(store) {
        this.allStores = store;
        makeAutoObservable(this);
    }

    skillScreen = (name, skill) => {
        if (this.allStores.heroActionStore.selectedActionArea !== <SkillScreen /> && name && skill) {
            if (name === this.skillName || !this.skillActive) {
                this.skillName = name;
                this.skillTypeName = skill;
                console.log("skillName", name, skill);
                this.allStores.heroActionStore.selectedActionArea = (
                    <SkillScreen skillName={this.skillTypeName} skillLevel={this.skillName.level} />
                );
            } else {
                console.log("Other skill in progress");
            }
        }
    };

    skilling = (skillItem) => {
        if (this.tanningActive === true) {
            console.log("Tanning already in progress!");
        } else {
            if (skillItem.skill === "tannable") {
                this.skillType = this.allStores.countStore.tanning;
            } else if (skillItem.skill === "smeltable") {
                this.skillType = this.allStores.countStore.smelting;
            }
            this.skillActive = true;
            this.skillItem = skillItem;
            console.log("skillTime", this.skillItem.skillDiff);
            this.skillTime = this.skillItem.skillDiff / this.skillType.level;
            this.skillInterval();
            skillItem.count--;
            this.allStores.heroInventoryStore.inventoryCheck();
            // this.skillScreen(this.skillName);
        }
        console.log("hide", skillItem);
    };

    skillInterval = () => {
        this.setSkillInterval = setInterval(this.skillProgress, 1000);
    };

    skillProgress = (action) => {
        if (this.skillActive === false) {
            console.log("Nothing to tan");
        } else if (this.skillProgressState >= this.skillTime - 1 && this.skillActive === true) {
            this.skillComplete();
            clearInterval(this.setSkillInterval);
        } else if (action === "click") {
            this.skillProgressState++;
        } else {
            this.skillProgressState++;
        }
    };

    skillComplete = () => {
        const statChance = this.skillItem.skillDiff - this.skillType.Level;
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
        this.skillName = "";
        this.skillActive = false;
        this.skillProgressState = 0;
        this.allStores.heroInventoryStore.inventoryPlacement(finnishedProduct);
        this.allStores.countStore.skillExperienceIncrease(this.skillType, this.skillType.xp);
    };
}

export default SkillStore;
