import { makeAutoObservable } from 'mobx';
import CountStore from './CountStore'
import HeroStatsPage from './HeroStatsStore'
import HeroEquipmentShopStore from './HeroEquipmentShopStore'
import HeroInventoryStore from './HeroInventoryStore'
import AppStore from './AppStore'

class RootStore {
    countStore;
    appStore;
    heroStatsPage;
    heroEquipmentShopStore;
    heroInventoryStore;

    constructor() {
        this.countStore = new CountStore();
        this.heroStatsStore = new HeroStatsPage();
        this.heroInventoryStore = new HeroInventoryStore(this)
        this.heroEquipmentShopStore = new HeroEquipmentShopStore();
        this.appStore = new AppStore(this);
        makeAutoObservable(this);
    }
}

export default RootStore
