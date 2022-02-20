import { makeAutoObservable } from "mobx";

class HeroInventoryStore {

    allStores;

    heroInventorySlots = 100
    heroInventoryUsedSlots = 0
    heroInventorySlotsArray = []

    heroWeaponInv = []
    heroArmourInv = []
    heroItemsInv = []

    heroPetSlots = 3
    heroPetSlotsUsed = 0
    heroPetSlotsArray = []

    constructor(store) {
        this.allStores = store
        makeAutoObservable(this);
    }

    inventoryPlacement = (item) => {
        if (this.heroInventoryUsedSlots > this.heroInventorySlots) {
            console.log('Full Inventory');
        } else if (item.type === 'weapon') {
            this.heroWeaponInv.push(item)
            this.heroInventoryUsedSlots = this.heroInventoryUsedSlots + 1
        } else if (item.type === 'armour') {
            this.heroArmourInv.push(item)
            this.heroInventoryUsedSlots = this.heroInventoryUsedSlots + 1
        } else if (item.type === 'item') {
            this.heroItemsInv.push(item)
            this.heroInventoryUsedSlots = this.heroInventoryUsedSlots + 1
        }
    }

    heroInventoryPurchase = (purchase) => {
        this.allStores.countStore.purchaseMoneyCount(purchase.cost)
        this.inventoryPlacement(purchase)
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

    handlePetBuy = (pet) => {
        if (pet.cost > this.allStores.countStore.heroMoney) {
            console.log("Not enough money!");
        } else if (this.heroPetSlotsUsed >= this.heroPetSlots) {
            console.log("Not enough pokeballs!");
        } else {
            this.petPurchase(pet)
        }
    }

    petPurchase = (pet) => {
        this.heroPetSlotsArray.push(pet)
        this.heroPetSlotsUsed = this.heroPetSlotsUsed + 1
        this.allStores.countStore.purchaseMoneyCount(pet.cost)
    }

}

export default HeroInventoryStore