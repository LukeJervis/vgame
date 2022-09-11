import ironCoinLogo from "./images/IronCoinTransparent.png";
import copperCoinLogo from "./images/CopperCoinTransparent.png";
import silverCoinLogo from "./images/SilverCoinTransparent.png";
import goldCoinLogo from "./images/GoldCoinTransparent.png";
import { useRootStore } from "../provider/RootStoreProvider";
import "./helpers.css";

export const heroMoneyConverter = (amount) => {
    const ironCoin = amount.toString().slice(-2) <= 0 ? 0 : amount.toString().slice(-2);
    const copperCoin = amount.toString().slice(-4, -2) <= 0 ? 0 : amount.toString().slice(-4, -2);
    const silverCoin = amount.toString().slice(-6, -4) <= 0 ? 0 : amount.toString().slice(-6, -4);
    const goldCoin = amount.toString().slice(-8, -6) <= 0 ? 0 : amount.toString().slice(-8, -6);

    return (
        <div className="heroMoneyConverter__container">
            <img src={ironCoinLogo} className="heroMoneyConverter__coin" height="20px" alt="Iron Coin" /> {ironCoin}
            <img src={copperCoinLogo} className="heroMoneyConverter__coin" height="20px" alt="Iron Coin" /> {copperCoin}
            <img src={silverCoinLogo} className="heroMoneyConverter__coin" height="20px" alt="Iron Coin" /> {silverCoin}
            <img src={goldCoinLogo} className="heroMoneyConverter__coin" height="20px" alt="Iron Coin" /> {goldCoin}
        </div>
    );
};

export const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
};

export const randomNumberToTwo = (min, max) => {
    return (Math.random() * (max - min) + min).toFixed(2);
};
