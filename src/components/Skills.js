import { useRootStore } from "../provider/RootStoreProvider";

const Skills = () => {
    const {
        skillStore: { skillScreen },
    } = useRootStore();

    const handleClick = (name, skill) => {
        skillScreen(name, skill);
    };

    return (
        <div className="skills__container">
            <button onClick={() => handleClick("Tanning", "tannable")} className="skills__button">
                Tanning
            </button>
            <button onClick={() => handleClick("Smelting", "smeltable")} className="skills__button">
                Smelting
            </button>
        </div>
    );
};

export default Skills;
