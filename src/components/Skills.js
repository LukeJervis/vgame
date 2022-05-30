import { useRootStore } from "../provider/RootStoreProvider";

const Skills = () => {
    const {
        skillStore: { skillScreen },
    } = useRootStore();

    const handleClick = (skillName) => {
        skillScreen(skillName);
    };

    return (
        <div className="skills__container">
            <button onClick={() => handleClick("Tanning")} className="skills__button">
                Tanning
            </button>
        </div>
    );
};

export default Skills;
