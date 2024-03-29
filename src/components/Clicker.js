import { useRootStore } from "../provider/RootStoreProvider";
import { observer } from "mobx-react";
import "./clicker.css";

const Clicker = () => {
    const {
        countStore: { experienceIncrease },
    } = useRootStore();
    const {
        heroStatsStore: { heroAttackAmount },
    } = useRootStore();

    const heroAttack = () => {
        experienceIncrease(heroAttackAmount);
    };

    return (
        <div className="clicker__container">
            <div className="clicker__button" onClick={heroAttack}>
                Attack
            </div>
        </div>
    );
};

export default observer(Clicker);
