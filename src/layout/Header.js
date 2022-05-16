import HeroLevelDisplay from "../components/HeroLevelDisplay";
import Counter from "../components/Counter";
import HeroMoney from "../components/HeroMoney";
import { useRootStore } from "../provider/RootStoreProvider";
import { observer } from "mobx-react";
import "./header.css";
import { useEffect } from "react";

const Header = () => {
    const {
        heroStatsStore: { equipedPet },
    } = useRootStore();

    let equipedPetName = equipedPet.name ? equipedPet.name : "None";

    // useEffect(() => {
    //     if (!equipedPet) {
    //         equipedPetName = "None";
    //     } else {
    //         equipedPetName = equipedPet.name;
    //     }
    // }, [equipedPet]);

    return (
        <div className="header__container">
            <div className="header__title">Game Name</div>
            <table className="header__table">
                <tr>
                    <th>
                        <HeroLevelDisplay />
                    </th>
                    <th>Equiped Pet</th>
                </tr>
                <tr>
                    <td>
                        <Counter />
                    </td>
                    <td>{equipedPetName}</td>
                </tr>
                <tr>
                    <td>
                        <HeroMoney />
                    </td>
                    <td>some stats</td>
                </tr>
            </table>
        </div>
    );
};

export default observer(Header);
