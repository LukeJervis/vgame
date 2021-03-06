import { useRootStore } from "../../provider/RootStoreProvider";
import { observer } from "mobx-react";
import "./trainingYard.css";

const TrainingYard = () => {
    const {
        countStore: { heroMoney },
    } = useRootStore();
    const {
        heroStatsStore: { strength, speed, constitution, statTrain },
    } = useRootStore();

    const train = (stat, amount, cost) => {
        if (heroMoney >= cost) {
            statTrain(stat, amount, cost);
        } else {
            console.log("Not enough money!");
        }
    };

    const cost = 50;

    return (
        <div className="TrainingYard__container">
            <div className="TrainingYard__skills">
                Train for a 0.1 increase.
                <div className="TrainingYard__strength">
                    <div className="TrainingYard__strength--display">Strength: {strength}</div>
                    <button onClick={() => train("strength", 0.1, cost)}>Strength</button>
                    <div className="TrainingYard__strength--cost">Cost: {cost} Iron</div>
                </div>
                <div className="TrainingYard__speed">
                    <div className="TrainingYard__speed--display">Speed: {speed}</div>
                    <button onClick={() => train("speed", 0.1, cost)}>Speed</button>
                    <div className="TrainingYard__speed--cost">Cost: {cost} Iron</div>
                </div>
                <div className="TrainingYard__constitution">
                    <div className="TrainingYard__constitution--display">Constitution: {constitution}</div>
                    <button onClick={() => train("constitution", 0.1, cost)}>Constitution</button>
                    <div className="TrainingYard__constitution--cost">Cost: {cost} Iron</div>
                </div>
            </div>
        </div>
    );
};

export default observer(TrainingYard);
