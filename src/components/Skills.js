import { useRootStore } from "../provider/RootStoreProvider";
import { observer } from "mobx-react";
import "./skills.css";

const Skills = () => {
    const {
        skillStore: { passiveSkillScreen, activeSkillScreen, craftingScreen },
    } = useRootStore();
    const {
        countStore: { skills },
    } = useRootStore();

    const passiveSkill = (name) => {
        passiveSkillScreen(name);
    };

    const attackSkill = (name) => {
        activeSkillScreen(name);
    };

    const craftSkill = () => {
        craftingScreen("Weapon Crafting");
    };

    const skillInfo = skills.map((skill) => (
        <div key={Math.random().toString(36)} className="skills__listContainer">
            <div key={Math.random().toString(36)} className="skills__skillN">
                {skill.name}
            </div>
            <div key={Math.random().toString(36)} className="skills__skill">
                Level:
                {skill.level}
            </div>
            <div key={Math.random().toString(36)} className="skills__skill">
                Experience:
                {skill.experience}
            </div>
            <div key={Math.random().toString(36)} className="skills__skill">
                Experience Needed:
                {skill.experienceNeeded}
            </div>
        </div>
    ));

    return (
        <div className="skills__container">
            <div className="skills__statsContainer">
                <div className="skills__stats">{skillInfo}</div>
            </div>
            <div className="skills__buttons">
                <button onClick={() => passiveSkill("Tanning")} className="skills__button">
                    Tanning
                </button>
                <button onClick={() => passiveSkill("Smelting")} className="skills__button">
                    Smelting
                </button>
                <button onClick={() => attackSkill("Wood Cutting")} className="skills__button">
                    Wood Cutting
                </button>
                <button onClick={() => craftSkill("Weapon Crafting")} className="skills__button">
                    Weapon Crafting
                </button>
            </div>
        </div>
    );
};

export default observer(Skills);
