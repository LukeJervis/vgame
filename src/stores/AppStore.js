import { makeAutoObservable } from "mobx";

class AppStore {
    rootStore = null;
    countStore = null;
    heroStatsPage = null;
    heroActionStore = null;
    heroInventoryStore = null;
    skillStore = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.countStore = rootStore.countStore;
        this.heroStatsPage = rootStore.heroStatsPage;
        this.heroInventoryStore = rootStore.heroInventoryStore;
        this.heroActionStore = rootStore.heroActionStore;
        this.skillStore = rootStore.skillStore;
        makeAutoObservable(this);
    }
}

export default AppStore;
