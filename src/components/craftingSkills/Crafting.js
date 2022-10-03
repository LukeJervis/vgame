import { randomNumber, randomNumberToTwo } from "../helpers";
import { observer } from "mobx-react";
import { useRootStore } from "../../provider/RootStoreProvider";

const Crafting = (skillLevel, craftType) => {
    const {
        skillStore: { inventoryPlacement },
    } = useRootStore();
    const luck = 10;
    // const skillLevelAdjust = skillLevel + Math.round(randomNumber(0, luck / 10)); will be adjusted before it get here
    const wood = {
        name: "Balsa",
        prefix: "",
        affix: "Log",
        cost: 1,
        crafting: {
            SL: 50,
            SH: 100,
            DL: 1,
            DH: 1.2,
            LL: 0,
            LH: 0.1,
            ML: 0,
            MH: 0.2,
            diff: 1,
        },
    };

    let craftDiff = wood.crafting.diff; //overall crafting difficulty
    let rollMulti = 100 - randomNumber(luck / 10, luck);

    let damageBonus = 0;
    let speedBonus = 0;
    let luckBonus = 0;
    let prefixNum = 1;
    let prefix = "";
    let dropArray = [];
    if (craftDiff < skillLevel || randomNumber(skillLevel, craftDiff) <= skillLevel) {
        if (rollMulti < 10) {
            rollMulti = 10;
        }
        if (randomNumber(0, craftDiff * rollMulti) <= 10 * skillLevel) {
            prefixNum++;
        }
        if (randomNumber(0, craftDiff * rollMulti) <= 8 * skillLevel) {
            prefixNum++;
        }
        if (randomNumber(0, craftDiff * rollMulti) <= 6 * skillLevel) {
            prefixNum++;
        }
        if (randomNumber(0, craftDiff * rollMulti) <= 3 * skillLevel) {
            prefixNum++;
        }
        if (randomNumber(0, craftDiff * rollMulti) <= skillLevel) {
            prefixNum++;
        }
        if (craftType === "weapon") {
            damageBonus = randomNumberToTwo(wood.crafting.DL, wood.crafting.DH) * prefixNum;
            speedBonus = randomNumberToTwo(wood.crafting.SL, wood.crafting.SH) * prefixNum;
            luckBonus = randomNumberToTwo(wood.crafting.LL, wood.crafting.LH) * prefixNum;
        }
        //need to decide which stats are applied
        //weapons need to be a multiplier
        //amount used affects

        //Gets the correct prefix
        if (prefixNum === 6) {
            prefix = "Mythic ";
        } else if (prefixNum === 5) {
            prefix = "Legendary ";
        } else if (prefixNum === 4) {
            prefix = "Epic ";
        } else if (prefixNum === 3) {
            prefix = "Rare ";
        } else if (prefixNum === 2) {
            prefix = "Uncommen ";
        } else {
            prefix = "";
        }
        //Create object
        let finishedProduct = {
            prefix: prefix,
            name: prefix + wood.name + " Sword",
            cost: wood.cost * prefixNum,
            stack: 1,
            damage: damageBonus,
            speed: speedBonus,
            luck: luckBonus,
            type: craftType,
            amount: 1,
            icon: "./images/Weapon.png",
            count: 1,
            id: Math.random().toString(36),
        };
        dropArray.push(finishedProduct);
    } else {
        console.log("Failed to craft");
    }
    console.log("lkj", dropArray);
    return inventoryPlacement(dropArray);
};

export default observer(Crafting);
