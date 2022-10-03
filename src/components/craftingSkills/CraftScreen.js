import { useRootStore } from "../../provider/RootStoreProvider";
import { observer } from "mobx-react";
import "./craftScreen.css";

const CraftScreen = () => {
    const {
        skillStore: { skillProgress, skillTime, skillProgressState, skilling, skillName, skillSlots },
    } = useRootStore();
    const {
        countStore: { skills },
    } = useRootStore();
    const {
        heroActionStore: { patrolBattleStart },
    } = useRootStore();
    const {
        heroInventoryStore: { heroItemsInv },
    } = useRootStore();

    const selectedSkill = skills.find((skill) => skill.name === skillName);
    const numberSlots = selectedSkill.slots;
    const skillables = heroItemsInv.filter((heroItem) => heroItem.type === "item");

    const openSlots = () => {
        for (let i = 0; i < numberSlots; i++) {
            <div>
                <div className="craftScreen__slot" src={""} alt="slot 1">
                    {skillSlots[i]}
                </div>
            </div>;
        }
    };

    const skillItems = skillables.map((heroItemsInv) => (
        <div key={Math.random().toString(36)} className="HeroInventory__equipment">
            <div key={Math.random().toString(36)} className="HeroInventory__equipmentName">
                {heroItemsInv.name}
            </div>
            <img
                className="HeroInventory__image"
                src={heroItemsInv.icon}
                alt="icon"
                title={`Name: ${heroItemsInv.name} \nCount: ${heroItemsInv.count} Cost: ${heroItemsInv.cost}`}
            />
            <div className="HeroInventory__buttonContainer">
                <div className="HeroInventory__count" key={Math.random().toString(36)}>
                    {heroItemsInv.count}
                    <button key={Math.random().toString(36)} onClick={() => skilling(heroItemsInv)}>
                        Use
                    </button>
                </div>
            </div>
        </div>
    ));

    return (
        <div className="skillScreen__container">
            <div className="skillScreen__title">{skillName.name}</div>
            <div className="skillScreen__level">
                {skillName.name} Level: {skillName.level}
            </div>
            <div className="skillScreen__xp">
                {skillName} XP: {selectedSkill.experience}
            </div>

            <div className="skillScreen__xpNeeded">XP Needed: {selectedSkill.experienceNeeded}</div>
            <div className="skillScreen__timer">Progress: {skillProgressState}</div>
            <div className="skillScreen__timer">Progress Needed: {skillTime}</div>
            <div className="skillScreen__inventory">{skillItems}</div>
            <div>{openSlots}</div>
            <div className="skillScreen__clicker" onClick={() => skillProgress("click")}>
                Click Here
            </div>
            <button className="skillScreen__back" onClick={() => patrolBattleStart()}>
                Back
            </button>
        </div>
    );
};

export default observer(CraftScreen);
