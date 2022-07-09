import { useRootStore } from "../provider/RootStoreProvider";

const Skills = () => {
    const {
        skillStore: { passiveSkillScreen, activeSkillScreen },
    } = useRootStore();

    const passiveSkill = (name, skill) => {
        passiveSkillScreen(name, skill);
    };

    const attackSkill = (name, skill) => {
        activeSkillScreen(name, skill);
    };

    return (
        <div className="skills__container">
            <button onClick={() => passiveSkill("Tanning", "tannable")} className="skills__button">
                Tanning
            </button>
            <button onClick={() => passiveSkill("Smelting", "smeltable")} className="skills__button">
                Smelting
            </button>
            <button onClick={() => attackSkill("woodCutting", "Wood Cutting")} className="skills__button">
                Wood Cutting
            </button>
        </div>
    );
};

export default Skills;
