import { useRootStore } from "../../provider/RootStoreProvider";
import { observer } from "mobx-react";

const SkillScreen = ({ level, skillName }) => {
    const {
        skillStore: { tanningProgress, tanTime, tanningProgressState, tanning },
    } = useRootStore();
    const {
        countStore: { tanningExperienceNeeded, tanningExperience },
    } = useRootStore();
    const {
        heroActionStore: { patrolBattleStart },
    } = useRootStore();
    const {
        heroInventoryStore: { heroItemsInv },
    } = useRootStore();

    const tannables = heroItemsInv.filter((heroItem) => heroItem.skill === "tannable");

    const skillItems = tannables.map((heroItemsInv) => (
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
                    <button key={Math.random().toString(36)} onClick={() => tanning(heroItemsInv)}>
                        Use
                    </button>
                </div>
            </div>
        </div>
    ));

    return (
        <div className="skillScreen__container">
            <div className="skillScreen__title">{skillName}</div>
            <div className="skillScreen__level">
                {skillName} Level: {level}
            </div>
            <div className="skillScreen__xp">
                {skillName} XP: {tanningExperience}
            </div>
            <div className="skillScreen__xpNeeded">XP Needed: {tanningExperienceNeeded}</div>
            <div className="skillScreen__timer">Progress: {tanningProgressState}</div>
            <div className="skillScreen__timer">Progress Needed: {tanTime}</div>
            <div className="skillScreen__inventory">{skillItems}</div>
            <div className="skillScreen__clicker" onClick={() => tanningProgress("click")}>
                Click Here
            </div>
            <button className="skillScreen__back" onClick={() => patrolBattleStart()}>
                Back
            </button>
        </div>
    );
};

export default observer(SkillScreen);
