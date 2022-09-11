import { useRootStore } from "../../provider/RootStoreProvider";
import { observer } from "mobx-react";
import trees from "../monsters/trees.json";

const SkillObjectChoice = () => {
    const {
        skillStore: { activeSkilling, skillName },
    } = useRootStore();

    const {
        countStore: { skills },
    } = useRootStore();

    const locationText = () => {
        if (skillName === "Wood Cutting") {
            return "Choose your tree";
        }
    };

    const selectedSkill = skills.find((skill) => skill.name === skillName);

    const treeSelection = trees.filter((tree) => tree.level <= selectedSkill.level);

    const skillItems = treeSelection.map((tree) => (
        <div key={Math.random().toString(36)} className="HeroInventory__equipment">
            <div key={Math.random().toString(36)} className="HeroInventory__equipmentName">
                {tree.name}
            </div>
            <img className="HeroInventory__image" src={tree.icon} alt="icon" />
            <div className="HeroInventory__buttonContainer">
                <button key={Math.random().toString(36)} onClick={() => activeSkilling(tree)}>
                    Choose
                </button>
            </div>
        </div>
    ));

    return (
        <div className="SkillObjectChoice__container">
            <div className="SkillObjectChoice__header">{skillName}</div>
            <div className="SkillObjectChoice__description">{locationText()}</div>
            <div className="SkillObjectChoice__choiceContainer">
                <div className="SkillObjectChoice__choice">{skillItems}</div>
            </div>
        </div>
    );
};

export default observer(SkillObjectChoice);
