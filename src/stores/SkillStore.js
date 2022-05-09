import { makeAutoObservable } from "mobx";
import { randomNumber } from "../components/helpers";
import SkillScreen from "../components/craftingSkills/SkillScreen";

class SkillStore {
  allStores;

  //Skills
  prefixNum = 1;
  prefix;
  skillItems;

  //Tanning
  tanningActive = false;
  setTanInterval;
  tanTime;
  tanningProgressState = 0;
  rawHide = {};

  constructor(store) {
    this.allStores = store;
    makeAutoObservable(this);
  }

  itemInv = () => {
    this.skillItems = this.allStores.heroInventoryStore.heroItemsInv.map((heroItemsInv) => (
      <div key={Math.random().toString(36)} className="HeroInventory__equipment">
        <div key={Math.random().toString(36)} className="HeroInventory__equipmentName">
          {heroItemsInv.name}
        </div>
        <img
          className="HeroInventory__image"
          src={heroItemsInv.icon}
          alt="icon"
          title={`Name: ${heroItemsInv.name} \nCount: ${heroItemsInv.count} Cost: ${heroItemsInv.cost}`}
        />
        <div className="HeroInventory__buttonContainer">
          <div className="HeroInventory__count" key={Math.random().toString(36)}>
            {heroItemsInv.count}
            <button key={Math.random().toString(36)} onClick={() => this.tanning(heroItemsInv)}>
              Tan
            </button>
          </div>
        </div>
      </div>
    ));
  };

  skillScreen = () => {
    this.itemInv();
    if (this.allStores.heroActionStore.selectedActionArea !== <SkillScreen />) {
      this.allStores.heroActionStore.selectedActionArea = (
        <SkillScreen skill="Tanning" level={this.allStores.countStore.tanningLevel} />
      );
    }
  };

  tanning = (hide) => {
    if (this.tanningActive === true) {
      console.log("Tanning already in progress!");
    } else if (hide.skill !== "tannable") {
      console.log("Can't tan this!");
    } else {
      this.tanningActive = true;
      this.rawHide = hide;
      this.tanTime = hide.hideDiff / this.allStores.countStore.tanningLevel;
      this.tanInterval();
      hide.count--;
      this.itemInv();
      this.skillScreen();
    }
    console.log("hide", hide);
  };

  tanInterval = () => {
    this.setTanInterval = setInterval(this.tanningProgress, 1000);
  };

  tanningProgress = (action) => {
    this.skillScreen();
    console.log("hit1", action, this.tanningActive);
    if (this.tanningActive === false) {
      console.log("Nothing to tan");
    } else if (this.tanningProgressState >= this.tanTime && this.tanningActive === true) {
      this.tanningComplete();
      clearInterval(this.setTanInterval);
    } else if (action === "click") {
      this.tanningProgressState = this.tanningProgressState + this.allStores.countStore.tanningLevel;
      console.log("hit2");
    } else {
      this.tanningProgressState++;
    }
  };

  tanningComplete = () => {
    const tanChance = this.rawHide.tanDifficulty - this.allStores.countStore.tanningLevel;
    if (randomNumber(0, tanChance) <= 10) {
      this.prefixNum++;
    }
    if (randomNumber(0, tanChance) <= 9) {
      this.prefixNum++;
    }
    if (randomNumber(0, tanChance) <= 8) {
      this.prefixNum++;
    }
    if (randomNumber(0, tanChance) <= 7) {
      this.prefixNum++;
    }
    if (randomNumber(0, tanChance) <= 6) {
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
      this.prefix = "Good ";
    } else if (this.prefixNum === 2) {
      this.prefix = "Normal ";
    } else {
      this.prefix = "Damamged ";
    }
    let tannedHide = {
      prefix: this.prefix,
      name: this.prefix + this.rawHide.name,
      cost: this.rawHide.cost * +this.prefixNum,
      stack: this.rawHide.stack,
      type: this.rawHide.type,
      amount: this.rawHide.amount ? this.rawHide.amount : 1,
      icon: this.rawHide.tannedIcon,
      count: 1,
      skill: "none",
      id: Math.random().toString(36),
    };
    this.tanningActive = false;
    this.tanningProgressState = 0;
    this.allStores.heroInventoryStore.heroItemsInv.push(tannedHide);
    this.itemInv();
    this.allStores.countStore.skillExperienceIncrease("tanning", this.rawHide.xp);
    this.skillScreen();
  };
}

export default SkillStore;
