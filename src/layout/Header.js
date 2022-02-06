import HeroLevelDisplay from "../components/HeroLevelDisplay"
import Counter from "../components/Counter"
import HeroMoney from "../components/HeroMoney"

const Header = () => {

    return (
        <div className="header__container">
            <div className="header__title">
                Game Name
            </div>
            <div className="header__heroLevel">
                <HeroLevelDisplay />
            </div>
            <div className="header__heroExperience">
                <Counter />
            </div>
            <div className="header__heroMoney">
                <HeroMoney />
            </div>
        </div>
    )

}

export default Header