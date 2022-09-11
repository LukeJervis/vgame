import { observer } from "mobx-react";
import { useRootStore } from "../../provider/RootStoreProvider";
import slimeImage from "../images/SlimeTransparent.png";
import "./patrolBattle.css";

const PatrolBattle = (props) => {
    const {
        heroActionStore: { patrolBattleAttack, monsterHealth, monsterLevel, monsterName },
    } = useRootStore();

    return (
        <div className="patrolBattle__container">
            <div className="PatrolBattle--attack" onClick={() => patrolBattleAttack()}>
                <div className="patrolBattle__infoCollection">
                    <div className="patrolBattle__areaName">{props.location}</div>
                    <div className="PatrolBattle__monsterName">{monsterName}</div>
                    <div className="PatrolBattle__monsterLevel">Level: {monsterLevel}</div>
                    <div className="PatrolBattle__monsterHealth">Health: {monsterHealth}</div>
                    <div>
                        <img src={props.monsterImage} height="200px" alt="Monster" />
                    </div>
                </div>
                <div className="patrolBattle__attackArea">Click box to attack</div>
            </div>
        </div>
    );
};

export default observer(PatrolBattle);
