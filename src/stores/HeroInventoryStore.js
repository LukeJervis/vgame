import { makeAutoObservable, autorun } from "mobx";

class HeroInventoryStore {
    allStores;

    heroInventorySlots = 100;
    heroInventoryUsedSlots = 0;

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
        autorun(() => {
            this.inventoryCheck();
        });
    }

    inventoryPlacement = (item) => {
        if (this.heroInventoryUsedSlots > this.heroInventorySlots) {
            console.log("Full Inventory");
        } else if (item.type === "weapon") {
            this.heroWeaponInv.push(item);
        } else if (item.type === "armour") {
            this.heroArmourInv.push(item);
        } else if (item.type === "item") {
            if (!!this.heroItemsInv.find((el) => el.name === item.name)) {
                const foundItem = this.heroItemsInv.find((el) => el.name === item.name);
                if (foundItem.count < item.stack) {
                    foundItem.count += item.count;
                }
            } else {
                this.heroItemsInv.push(item);
            }
        }
    };

    inventoryCheck = () => {
        for (let i = 0; i < this.heroItemsInv.length; i++) {
            if (this.heroItemsInv[i].count <= 0) {
                const position = this.heroItemsInv.indexOf(this.heroItemsInv[i]);
                this.heroItemsInv.splice(position, 1);
            }
        }
        this.heroInventoryUsedSlots = this.heroWeaponInv.length + this.heroArmourInv.length + this.heroItemsInv.length;
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
        if (this.heroItemsInv.some((el) => el.name === item.name) && item.type === "item") {
            if (amount === "one" && item.count === 1) {
                const position = this.heroItemsInv.findIndex((el) => el.name === item.name);
                this.heroItemsInv.splice(position, 1);
                this.allStores.countStore.heroMoney += item.cost;
            } else if (amount === "one" && item.count > 1) {
                item.count--;
                this.allStores.countStore.heroMoney += item.cost;
            } else if (amount === "all") {
                const position = this.heroItemsInv.findIndex((el) => el.name === item.name);
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
