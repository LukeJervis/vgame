import { useRootStore } from "../provider/RootStoreProvider";
import { observer } from "mobx-react";
import "./skills.css";

const Skills = () => {
    const {
        skillStore: { passiveSkillScreen, activeSkillScreen },
    } = useRootStore();
    const {
        countStore: { tanning, smelting, woodCutting },
    } = useRootStore();

    const passiveSkill = (name, skill) => {
        passiveSkillScreen(name, skill);
    };

    const attackSkill = (name, skill) => {
        activeSkillScreen(name, skill);
    };

    let skillsArray = [tanning, smelting, woodCutting];

    const skillInfo = skillsArray.map((skill) => (
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
        </div>
    );
};

export default observer(Skills);
