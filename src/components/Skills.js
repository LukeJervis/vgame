import { useRootStore } from "../provider/RootStoreProvider";

const Skills = () => {
  const {
    skillStore: { skillScreen },
  } = useRootStore();

  return (
    <div className="skills__container">
      <button onClick={() => skillScreen()} className="skills__button">
        Tanning
      </button>
    </div>
  );
};

export default Skills;
