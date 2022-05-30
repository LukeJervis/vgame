import HeroLevelDisplay from "../components/HeroLevelDisplay";
import Counter from "../components/Counter";
import HeroMoney from "../components/HeroMoney";
import { useRootStore } from "../provider/RootStoreProvider";
import { observer } from "mobx-react";
import "./header.css";

const Header = () => {
    return (
        <div className="header__container">
            <div className="header__title">Game Name</div>
            <table className="header__table">
                <tbody>
                    <tr>
                        <th>
                            <HeroLevelDisplay />
                        </th>
                    </tr>
                    <tr>
                        <td>
                            <Counter />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <HeroMoney />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default observer(Header);
