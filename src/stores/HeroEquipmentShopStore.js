import { makeAutoObservable } from "mobx";

class HeroEquipmentShopStore {

    constructor() {
        makeAutoObservable(this);
    }

}

export default HeroEquipmentShopStore