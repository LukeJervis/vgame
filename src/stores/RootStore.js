import { makeAutoObservable } from "mobx";
import CountStore from "./CountStore";
import HeroStatsPage from "./HeroStatsStore";
import HeroActionStore from "./HeroActionStore";
import HeroInventoryStore from "./HeroInventoryStore";
import SkillStore from "./SkillStore";
import AppStore from "./AppStore";

class RootStore {
  countStore;
  appStore;
  heroStatsPage;
  heroActionStore;
  heroInventoryStore;
  skillStore;

  constructor() {
    this.countStore = new CountStore(this);
    this.heroStatsStore = new HeroStatsPage(this);
    this.heroInventoryStore = new HeroInventoryStore(this);
    this.heroActionStore = new HeroActionStore(this);
    this.skillStore = new SkillStore(this);
    this.appStore = new AppStore(this);
    makeAutoObservable(this);
  }
}

export default RootStore;
