import { makeAutoObservable } from "mobx";

class HeroInventoryStore {

    heroInventorySlots = 10
    heroInventoryUsedSlots = 0

    heroInventorySlotsArray = []

    allStores;

    constructor(store) {
        this.allStores = store
        makeAutoObservable(this);
    }

    heroInventoryPurchase = (purchase) => {
        this.heroInventorySlotsArray.push(purchase)
        this.heroInventoryUsedSlots = this.heroInventoryUsedSlots + 1
        this.allStores.countStore.purchaseMoneyCount(purchase.cost)
    }

    handleBuy = (purchase) => {
        if (purchase.cost > this.allStores.countStore.heroMoney) {
            console.log("Not enough money!");
        } else if (this.heroInventoryUsedSlots >= this.heroInventorySlots + 1) {
            console.log("No inventory space")
        } else {
            this.heroInventoryPurchase(purchase)
        }
    }

}

export default HeroInventoryStore