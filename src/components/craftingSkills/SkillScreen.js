import { useRootStore } from "../../provider/RootStoreProvider";

const SkillScreen = (skill, level) => {
    const {
        heroActionStore: { tanning, tanningProgress }
    } = useRootStore();
    const {
        heroInventoryStore: { heroItemsInv }
    } = useRootStore();

    const findTannables = heroItemsInv.map((heroItemsInv) => (
        <div
            key={Math.random().toString(36)}
            className="HeroInventory__equipment"
        >
            <div
                key={Math.random().toString(36)}
                className="HeroInventory__equipmentName"
            >
                {heroItemsInv.name}
            </div>
            <img
                className="HeroInventory__image"
                src={heroItemsInv.icon}
                alt="icon"
                title={`Name: ${heroItemsInv.name} \nCount: ${heroItemsInv.count} Cost: ${heroItemsInv.cost}`}
            />
            <div className="HeroInventory__buttonContainer">
                <div
                    className="HeroInventory__count"
                    key={Math.random().toString(36)}
                >
                    {heroItemsInv.count}
                </div>
            </div>
        </div>
    ));

    return (
        <div className="skillScreen__container">
            <div className="skillScreen__title">{skill}</div>
            <div className="skillScreen__level">{level}</div>
            <div className="skillScreen__inventory">{findTannables}</div>
            <div
                className="skillScreen__clicker"
                onClick={tanningProgress("click")}
            >
                Click Here
            </div>
        </div>
    );
};

export default SkillScreen;
