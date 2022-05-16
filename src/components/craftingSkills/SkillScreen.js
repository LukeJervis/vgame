import { useRootStore } from "../../provider/RootStoreProvider";

const SkillScreen = (props) => {
    const {
        skillStore: { tanningProgress, tanTime, tanningProgressState, skillItems },
    } = useRootStore();
    const {
        countStore: { tanningExperienceNeeded, tanningExperience },
    } = useRootStore();
    const {
        heroActionStore: { patrolBattleStart },
    } = useRootStore();

    return (
        <div className="skillScreen__container">
            <div className="skillScreen__title">{props.skill}</div>
            <div className="skillScreen__level">Tanning Level: {props.level}</div>
            <div className="skillScreen__xp">Tanning XP: {tanningExperience}</div>
            <div className="skillScreen__xpNeeded">XP Needed: {tanningExperienceNeeded}</div>
            <div className="skillScreen__timer">Complete at: {tanningProgressState}</div>
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

export default SkillScreen;
