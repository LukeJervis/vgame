import { useRootStore } from "../../provider/RootStoreProvider"
import { observer } from "mobx-react"

const TrainingYard = () => {
    const { countStore: { heroMoney } } = useRootStore()
    const { heroStatsStore: { strength, speed, constitution, statTrain } } = useRootStore()

    const train = (stat, amount, cost) => {
        if (heroMoney > cost) {
            statTrain(stat, amount, cost)
        } else {
            console.log('Not enough money!');
        }
    }

    const cost = 50

    return (
        <div className="TrainingYard__container">
            <div className="TrainingYard__skills">
                <div className="TrainingYard__strength">
                    <div className="TrainingYard__strength--display">
                        {strength}
                    </div>
                    <button onClick={() => train('strength', cost, 50)}>Strength</button>
                    <div className="TrainingYard__strength--cost">
                        Cost: {cost} Iron
                    </div>
                </div>
                <div className="TrainingYard__speed">
                    <div className="TrainingYard__speed--display">
                        {speed}
                    </div>
                    <button onClick={() => train('speed', cost, 50)}>Speed</button>
                    <div className="TrainingYard__speed--cost">
                        Cost: {cost} Iron
                    </div>
                </div>
                <div className="TrainingYard__constitution">
                    <div className="TrainingYard__constitution--display">
                        {constitution}
                    </div>
                    <button onClick={() => train('constitution', cost, 50)}>Constitution</button>
                    <div className="TrainingYard__constitution--cost">
                        Cost: {cost} Iron
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(TrainingYard)