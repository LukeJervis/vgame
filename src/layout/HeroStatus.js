import { observer } from "mobx-react-lite";
import { useRootStore } from "../provider/RootStoreProvider";
import "./heroStatus.css";

const HeroStatus = () => {
    const {
        heroStatsStore: { maxHealth, health, equipedHeroWeapon, equipedPet },
    } = useRootStore();

    const displayPet = equipedPet.name ? equipedPet.name : "None";

    return (
        <div className="heroStatus__container">
            <div className="heroStatus__health">
                Health: {health}/{maxHealth}
            </div>
            <div className="heroStatus__weapon">Eqiuped weapon: {equipedHeroWeapon.name}</div>
            <div className="heroStatus__pet">Equiped pet: {displayPet}</div>
        </div>
    );
};

export default observer(HeroStatus);
