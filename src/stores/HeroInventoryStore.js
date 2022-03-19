import { makeAutoObservable } from "mobx";

class HeroInventoryStore {
    allStores;

    heroInventorySlots = 100;
    heroInventoryUsedSlots = 0;
    heroInventorySlotsArray = [];

    heroWeaponInv = [];
    heroArmourInv = [];
    heroItemsInv = [];

    heroPetSlots = 3;
    heroPetSlotsUsed = 0;
    heroPetSlotsArray = [];

    itemCheck;

    constructor(store) {
        this.allStores = store;
        makeAutoObservable(this);
    }

    inventoryPlacement = (item) => {
        if (this.heroInventoryUsedSlots > this.heroInventorySlots) {
            console.log("Full Inventory");
        } else if (item.type === "weapon") {
            this.heroWeaponInv.push(item);
            this.heroInventoryUsedSlots = this.heroInventoryUsedSlots + 1;
        } else if (item.type === "armour") {
            this.heroArmourInv.push(item);
            this.heroInventoryUsedSlots = this.heroInventoryUsedSlots + 1;
        } else if (item.type === "item") {
            if (
                item.stack > 1 &&
                item.count < item.stack &&
                this.heroItemsInv.some((el) => el.name === item.name)
            ) {
                const position = this.heroItemsInv.indexOf(item.name) + 1;
                const removedObject = this.heroItemsInv.splice(
                    position,
                    position + 1
                );
                removedObject[0].count++;
                this.heroItemsInv.push(removedObject[0]);
            } else {
                this.heroItemsInv.push(item);
                this.heroInventoryUsedSlots = this.heroInventoryUsedSlots + 1;
            }
        }
    };

    heroInventoryPurchase = (purchase) => {
        this.allStores.countStore.purchaseMoneyCount(purchase.cost);
        this.inventoryPlacement(purchase);
    };

    handleBuy = (purchase) => {
        if (purchase.cost > this.allStores.countStore.heroMoney) {
            console.log("Not enough money!");
        } else if (this.heroInventoryUsedSlots >= this.heroInventorySlots + 1) {
            console.log("No inventory space");
        } else {
            this.heroInventoryPurchase(purchase);
        }
    };

    handleSell = (item, amount) => {
        if (
            this.heroItemsInv.some((el) => el.name === item.name) &&
            item.type === "item"
        ) {
            if (amount === "one" && item.count === 1) {
                const position = this.heroItemsInv.findIndex(
                    (el) => el.id === item.id
                );
                this.heroItemsInv.splice(position, 1);
                this.allStores.countStore.heroMoney =
                    this.allStores.countStore.heroMoney + item.cost;
            } else if (amount === "one" && item.count > 1) {
                const position = this.heroItemsInv.indexOf(item.name) + 1;
                const removedObject = this.heroItemsInv.splice(position, 1);
                removedObject[0].count--;
                this.heroItemsInv.splice(position, 1, removedObject[0]);
                this.allStores.countStore.heroMoney =
                    this.allStores.countStore.heroMoney + item.cost;
            } else if (amount === "all") {
                const position = this.heroItemsInv.indexOf(item.name) + 1;
                this.heroItemsInv.splice(position, 1);
                this.allStores.countStore.heroMoney =
                    this.allStores.countStore.heroMoney +
                    item.cost * item.count;
            }
        }
        if (
            this.heroWeaponInv.some((el) => el.name === item.name) &&
            item.type === "weapon"
        ) {
            if (amount === "one" && item.count === 1) {
                const position = this.heroWeaponInv.findIndex(
                    (el) => el.id === item.id
                );
                this.heroWeaponInv.splice(position, 1);
                this.allStores.countStore.heroMoney =
                    this.allStores.countStore.heroMoney + item.cost;
            } else if (amount === "one" && item.count > 1) {
                const position = this.heroWeaponInv.indexOf(item.name) + 1;
                const removedObject = this.heroWeaponInv.splice(position, 1);
                removedObject[0].count--;
                this.heroWeaponInv.splice(position, 1, removedObject[0]);
                this.allStores.countStore.heroMoney =
                    this.allStores.countStore.heroMoney + item.cost;
            } else if (amount === "all") {
                const position = this.heroWeaponInv.indexOf(item.name) + 1;
                this.heroWeaponInv.splice(position, 1);
                this.allStores.countStore.heroMoney =
                    this.allStores.countStore.heroMoney +
                    item.cost * item.count;
            }
        }
        if (
            this.heroArmourInv.some((el) => el.name === item.name) &&
            item.type === "weapon"
        ) {
            if (amount === "one" && item.count === 1) {
                const position = this.heroArmourInv.findIndex(
                    (el) => el.id === item.id
                );
                this.heroArmourInv.splice(position, 1);
                this.allStores.countStore.heroMoney =
                    this.allStores.countStore.heroMoney + item.cost;
            } else if (amount === "one" && item.count > 1) {
                const position = this.heroArmourInv.indexOf(item.name) + 1;
                const removedObject = this.heroArmourInv.splice(position, 1);
                removedObject[0].count--;
                this.heroArmourInv.splice(position, 1, removedObject[0]);
                this.allStores.countStore.heroMoney =
                    this.allStores.countStore.heroMoney + item.cost;
            } else if (amount === "all") {
                const position = this.heroArmourInv.indexOf(item.name) + 1;
                this.heroArmourInv.splice(position, 1);
                this.allStores.countStore.heroMoney =
                    this.allStores.countStore.heroMoney +
                    item.cost * item.count;
            }
        }
    };

    handlePetBuy = (pet) => {
        if (pet.cost > this.allStores.countStore.heroMoney) {
            console.log("Not enough money!");
        } else if (this.heroPetSlotsUsed >= this.heroPetSlots) {
            console.log("Not enough pokeballs!");
        } else {
            this.petPurchase(pet);
        }
    };

    petPurchase = (pet) => {
        this.heroPetSlotsArray.push(pet);
        this.heroPetSlotsUsed = this.heroPetSlotsUsed + 1;
        this.allStores.countStore.purchaseMoneyCount(pet.cost);
    };
}

export default HeroInventoryStore;
