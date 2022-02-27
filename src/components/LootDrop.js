import slimeLoot from './lootPools/slimeLoot.json'
import silverSlimeLoot from './lootPools/silverSlimeLoot.json'

import { randomNumber, randomNumberToTwo } from './helpers'

const lootDrop = (monster, luck) => {

    let monsterLoot = null
    let spin = 9999999999

    let damageBonus = 0
    let speedBonus = 0
    let luckBonus = 0
    let moneyIncrease = 0
    let lifeSteal = 0
    let prefixNum = 1
    let prefix = ''
    let dropArray = []


    // finds the correct pool
    if (monster.pool === "slimeLoot"){
        monsterLoot = slimeLoot
    } else if (monster.pool === "silverSlime") {
        monsterLoot = silverSlimeLoot
    }
    
    //maps over loot pool
    for (let i = 0; i < monsterLoot.length; i++) {
        //checks if drop is item
        if (monsterLoot[i].type === 'item') {
            spin = randomNumber(0, monsterLoot[i].dropCeil)
            if (spin <= luck) {
                let droppedLoot = {
                    name: monsterLoot[i].name,
                    cost: monsterLoot[i].cost,
                    stack: monsterLoot[i].stack,
                    icon: monsterLoot[i].icon,
                    type: monsterLoot[i].type,
                    count: monsterLoot[i].count,
                    id: Math.random().toString(36)
                }
                dropArray.push(droppedLoot)
            }
            //checks if loot is a weapon
        } else if (monsterLoot[i].type === "weapon") {
            //spin between 0 and the loots dropCeil
            spin = randomNumber(0, monsterLoot[i].dropCeil)
            //spins for stats
            if (spin <= luck) {
                if (randomNumber(0, monster.statChance) <= 10) {
                    damageBonus = randomNumberToTwo(monsterLoot[i].statLow, monsterLoot[i].statHigh)
                    prefixNum++
                }
                if (randomNumber(0, monster.statChance) <= 10) {
                    speedBonus = randomNumberToTwo(monsterLoot[i].statLow, monsterLoot[i].statHigh)
                    prefixNum++
                }
                if (randomNumber(0, monster.statChance) <= 10) {
                    luckBonus = randomNumberToTwo(monsterLoot[i].statLow, monsterLoot[i].statHigh)
                    prefixNum++
                }
                if (randomNumber(0, monster.statChance) <= 50) {
                    moneyIncrease = randomNumberToTwo(monsterLoot[i].statLow, monsterLoot[i].statHigh)
                    prefixNum++
                }
                if (randomNumber(0, monster.statChance) <= 50) {
                    lifeSteal = randomNumberToTwo(monsterLoot[i].statLow, monsterLoot[i].statHigh)
                    prefixNum++
                }
                //Gets the correct prefix
                if (prefixNum === 6) {
                    prefix = 'Mythic '
                } else if (prefixNum === 5) {
                    prefix = 'Legendary '
                } else if (prefixNum === 4) {
                    prefix = 'Epic '
                } else if (prefixNum === 3) {
                    prefix = 'Rare '
                } else if (prefixNum === 2) {
                    prefix = 'Magic '
                } else {
                    prefix = ''
                }
                //Create object
                let droppedWeapon = {
                    prefix: prefix,
                    name: prefix + monsterLoot[i].name,
                    cost: monsterLoot[i].cost * +prefixNum,
                    stack: monsterLoot[i].stack,
                    damageBonus: damageBonus ? damageBonus : 0,
                    speedBonus: speedBonus ? speedBonus : 0,
                    luckBonus: luckBonus ? luckBonus : 0,
                    moneyIncrease: moneyIncrease ? Math.round(moneyIncrease) : 0,
                    lifeSteal: lifeSteal ? lifeSteal / 2 : 0,
                    damage: damageBonus ? +damageBonus + +monsterLoot[i].damage : monsterLoot[i].damage,
                    type: monsterLoot[i].type,
                    amount: monsterLoot[i].amount ? monsterLoot[i].amount : 1,
                    icon: monsterLoot[i].icon,
                    count: monsterLoot[i].count,
                    id: Math.random().toString(36)
                }
                dropArray.push(droppedWeapon)
            }
        } else if (monsterLoot[i].type === "armour") {
            //spin between 0 and the loots dropCeil
            spin = randomNumber(0, monsterLoot[i].dropCeil)
            //spins for stats
            if (spin <= luck) {
                if (randomNumber(0, monster.statChance) <= 10) {
                    damageBonus = randomNumberToTwo(monsterLoot[i].statLow, monsterLoot[i].statHigh)
                    prefixNum++
                }
                if (randomNumber(0, monster.statChance) <= 10) {
                    speedBonus = randomNumberToTwo(monsterLoot[i].statLow, monsterLoot[i].statHigh)
                    prefixNum++
                }
                if (randomNumber(0, monster.statChance) <= 10) {
                    luckBonus = randomNumberToTwo(monsterLoot[i].statLow, monsterLoot[i].statHigh)
                    prefixNum++
                }
                if (randomNumber(0, monster.statChance) <= 50) {
                    moneyIncrease = randomNumberToTwo(monsterLoot[i].statLow, monsterLoot[i].statHigh)
                    prefixNum++
                }
                if (randomNumber(0, monster.statChance) <= 50) {
                    lifeSteal = randomNumberToTwo(monsterLoot[i].statLow, monsterLoot[i].statHigh)
                    prefixNum++
                }
                //Gets the correct prefix
                if (prefixNum === 6) {
                    prefix = 'Mythic '
                } else if (prefixNum === 5) {
                    prefix = 'Legendary '
                } else if (prefixNum === 4) {
                    prefix = 'Epic '
                } else if (prefixNum === 3) {
                    prefix = 'Rare '
                } else if (prefixNum === 2) {
                    prefix = 'Magic '
                } else {
                    prefix = ''
                }
                //Create object
                let droppedWeapon = {
                    prefix: prefix,
                    name: prefix + monsterLoot[i].name,
                    cost: monsterLoot[i].cost * +prefixNum,
                    stack: monsterLoot[i].stack,
                    damageBonus: damageBonus ? damageBonus : 0,
                    speedBonus: speedBonus ? speedBonus : 0,
                    luckBonus: luckBonus ? luckBonus : 0,
                    damage: damageBonus ? +damageBonus + +monsterLoot[i].damage : monsterLoot[i].damage,
                    type: monsterLoot[i].type,
                    amount: monsterLoot[i].amount ? monsterLoot[i].amount : 1,
                    icon: monsterLoot[i].icon,
                    count: monsterLoot[i].count,
                    id: Math.random().toString(36)
                }
                dropArray.push(droppedWeapon)
            }
        }
    }

    return dropArray


}

export default lootDrop