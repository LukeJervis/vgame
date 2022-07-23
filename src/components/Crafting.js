import { randomNumber, randomNumberToTwo } from "../components/helpers";

const Crafting = (skillLevel, craftType) => {
    const luck = 10;
    const skillLevelAdjust = skillLevel + Math.round(randomNumber(0, luck / 10));
    const wood = {
        name: "wood",
        cost: 1,
        crafting: {
            SL: 50,
            SH: 100,
            DL: 0,
            DH: 0.2,
            LL: 0,
            LH: 0.1,
            ML: 0,
            MH: 0.2,
            diff: 1,
        },
    };

    let craftDiff = wood.diff; //overall crafting difficulty

    let damageBonus = 0;
    let speedBonus = 0;
    let luckBonus = 0;
    let prefixNum = 1;
    let prefix = "";
    let dropArray = [];

    if (randomNumber(0, craftDiff) <= skillLevel - 1) {
        if (randomNumber(0, craftDiff * 100) <= 10 * skillLevel) {
            prefixNum++;
        }
        if (randomNumber(0, craftDiff * 100) <= 8 * skillLevel) {
            prefixNum++;
        }
        if (randomNumber(0, craftDiff * 100) <= 6 * skillLevel) {
            prefixNum++;
        }
        if (randomNumber(0, craftDiff * 100) <= 3 * skillLevel) {
            prefixNum++;
        }
        if (randomNumber(0, craftDiff * 100) <= skillLevel) {
            prefixNum++;
        }
        if (craftType === "weapon") {
            damageBonus = randomNumberToTwo(wood.DL, wood.DH) * prefixNum;
            speedBonus = randomNumberToTwo(wood.SL, wood.SH) * prefixNum;
            luckBonus = randomNumberToTwo(wood.LL, wood.LH) * prefixNum;
        }

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
            name: prefix + wood.name,
            cost: wood.cost * prefixNum,
            stack: 1,
            damage: damageBonus,
            speed: speedBonus,
            luck: luckBonus,
            type: craftType,
            amount: 1,
            icon: "",
            count: 1,
            id: Math.random().toString(36),
        };
        dropArray.push(finishedProduct);
    } else {
        //failure
    }
};

export default Crafting;
