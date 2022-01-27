
export const heroMoneyConverter = (amount) => {
    const ironCoin = (amount.toString().slice(-2) <= 0) ? 0 : amount.toString().slice(-2)
    const copperCoin = (amount.toString().slice(-4, -2) <= 0) ? 0 : amount.toString().slice(-4, -2)
    const silverCoin = (amount.toString().slice(-6, -4) <= 0) ? 0 : amount.toString().slice(-6, -4)
    const goldCoin = (amount.toString().slice(-8, -6) <= 0) ? 0 : amount.toString().slice(-8, -6)
        return `Iron Coins: ${ironCoin} - Copper Coins: ${copperCoin} - Silver Coins: ${silverCoin} - Gold Coins: ${goldCoin}`
}