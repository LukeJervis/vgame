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
            this.heroInventoryUsedSlots++;
        } else if (item.type === "armour") {
            this.heroArmourInv.push(item);
            this.heroInventoryUsedSlots++;
        } else if (item.type === "item") {
            if (item.stack > 1 && item.count < item.stack && this.heroItemsInv.some((el) => el.name === item.name)) {
                const position = this.heroItemsInv.findIndex((el) => el.name === item.name);
                const removedObject = this.heroItemsInv.splice(position, position + 1);
                removedObject[0].count = removedObject[0].count + item.count;
                this.heroItemsInv.push(removedObject[0]);
            } else {
                this.heroItemsInv.push(item);
                this.heroInventoryUsedSlots += 1;
            }
        }
    };

    inventoryCheck = () => {
        for (let i = 0; i < this.heroItemsInv.length; i++) {
            if (this.heroItemsInv[i].count <= 0) {
                const position = this.heroItemsInv.indexOf(this.heroItemsInv[i]);
                console.log("position", position);
                this.heroItemsInv.splice(position, 1);
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
        console.log("item", item, "amount", amount);
        if (this.heroItemsInv.some((el) => el.id === item.id) && item.type === "item") {
            if (amount === "one" && item.count === 1) {
                const position = this.heroItemsInv.findIndex((el) => el.id === item.id);
                this.heroItemsInv.splice(position, 1);
                this.allStores.countStore.heroMoney += item.cost;
            } else if (amount === "one" && item.count > 1) {
                item.count--;
                this.allStores.countStore.heroMoney += item.cost;
            } else if (amount === "all") {
                const position = this.heroItemsInv.findIndex((el) => el.id === item.id);
                this.heroItemsInv.splice(position, 1);
                this.allStores.countStore.heroMoney += item.cost * item.count;
            }
        }
        if (this.heroWeaponInv.some((el) => el.id === item.id) && item.type === "weapon") {
            if (amount === "one" && item.count === 1) {
                const position = this.heroWeaponInv.findIndex((el) => el.id === item.id);
                this.heroWeaponInv.splice(position, 1);
                this.allStores.countStore.heroMoney += item.cost;
            } else if (amount === "one" && item.count > 1) {
                item.count--;
                this.allStores.countStore.heroMoney += item.cost;
            } else if (amount === "all") {
                const position = this.heroWeaponInv.findIndex((el) => el.id === item.id);
                this.heroWeaponInv.splice(position, 1);
                this.allStores.countStore.heroMoney += item.cost * item.count;
            }
        }
        if (this.heroArmourInv.some((el) => el.name === item.name) && item.type === "weapon") {
            if (amount === "one" && item.count === 1) {
                const position = this.heroArmourInv.findIndex((el) => el.id === item.id);
                this.heroArmourInv.splice(position, 1);
                this.allStores.countStore.heroMoney += item.cost;
            } else if (amount === "one" && item.count > 1) {
                item.count--;
                this.allStores.countStore.heroMoney += item.cost;
            } else if (amount === "all") {
                const position = this.heroArmourInv.findIndex((el) => el.id === item.id);
                this.heroArmourInv.splice(position, 1);
                this.allStores.countStore.heroMoney += item.cost * item.count;
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
