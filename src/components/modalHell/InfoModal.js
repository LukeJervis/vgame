import "./infoModal.css";
import { observer } from "mobx-react";
import { useRootStore } from "../../provider/RootStoreProvider";
import { useEffect, useState } from "react";
import { heroMoneyConverter } from "../helpers";
import { isString } from "lodash";

const InfoModal = () => {
    const {
        heroActionStore: {
            monsterName,
            monsterLevel,
            monsterXp,
            monsterMoneyDrop,
            monsterDeath,
            patrolBattleStart,
            location,
            levelMin,
            levelMax,
            MIA,
            FBIA,
            underAttack,
            lootDisplay,
            lootDropReset,
            skillBattleStart,
        },
    } = useRootStore();

    const {
        heroStatsStore: { heroDeath, health },
    } = useRootStore();

    const [buttonBoolean, setButtonBoolean] = useState(true);

    useEffect(() => {
        if (monsterDeath) {
            const openModal = () => {
                document.getElementById(`infoModal__${monsterName}`).style.display = "block";
            };
            openModal();
            buttonTimer();
        } else if (heroDeath) {
            const openModal = () => {
                document.getElementById(`infoModal__${monsterName}`).style.display = "block";
            };
            openModal();
            buttonTimer();
        }
    }, [monsterDeath, heroDeath]);

    const closeModal = () => {
        document.getElementById(`infoModal__${monsterName}`).style.display = "none";
    };

    const handleContinueButton = () => {
        if (underAttack) {
            console.log("Still in battle");
        } else if (health <= 0) {
            console.log("You is dead brah");
        } else if (!isString(location)) {
            //check if location is skill
            setButtonBoolean(true);
            skillBattleStart(location);
        } else {
            setButtonBoolean(true);
            patrolBattleStart(location, levelMin, levelMax, MIA, FBIA);
        }
        closeModal();
        lootDropReset();
    };

    const handleBackButton = () => {
        setButtonBoolean(true);
        patrolBattleStart();
        closeModal();
        lootDropReset();
    };

    const buttonTimer = () => {
        setTimeout(toggleDisabled, 1000);
    };

    const toggleDisabled = () => {
        setButtonBoolean(false);
    };

    const lootDrop = lootDisplay.map((heroItemsInv) => (
        <div key={Math.random().toString(36)} className="infoModal__HeroInventory__equipment">
            <div key={Math.random().toString(36)} className="infoModal__HeroInventory__equipmentName">
                {heroItemsInv.name}
            </div>
            <img
                className="HeroInventory__image"
                src={heroItemsInv.icon}
                alt="icon"
                title={`Name: ${heroItemsInv.name} \nCount: ${heroItemsInv.count} Cost: ${heroItemsInv.cost}`}
            />
            <div className="infoModal__HeroInventory__buttonContainer">
                <div className="infoModal__HeroInventory__count" key={Math.random().toString(36)}>
                    {heroItemsInv.count}
                </div>
            </div>
        </div>
    ));

    if (monsterDeath) {
        return (
            <div className="infoModal">
                <div id={`infoModal__${monsterName}`} className="infoModal__modal">
                    <div className="infoModal__modal--open">
                        <div className="infoModal__modalContents">{`You killed ${monsterName} level: ${monsterLevel}!`}</div>
                        <div className="infoModal__patrolWin__xpReward">{`You gained ${monsterXp} XP `}</div>
                        <div className="infoModal__patrolWin__moneyReward">
                            {heroMoneyConverter(monsterMoneyDrop)} Gained.
                        </div>
                        <div className="infoModal__patrolWin__lootDrop">{lootDrop}</div>
                        <button
                            className="PatrolBattle__continueButton"
                            disabled={buttonBoolean}
                            onClick={() => handleContinueButton()}
                        >
                            Continue
                        </button>
                        <button
                            className="PatrolBattle__backButton"
                            disabled={buttonBoolean}
                            onClick={() => handleBackButton()}
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>
        );
    } else if (heroDeath) {
        return (
            <div className="infoModal">
                <div id={`infoModal__${monsterName}`} className="infoModal__modal">
                    <div className="infoModal__modal--open">
                        <div className="infoModal__modalContents">
                            {`You were killed by ${monsterName} level: ${monsterLevel}!`}
                        </div>
                        <div className="infoModal__patrolWin__moneyLoss"></div>
                        <button
                            className="PatrolBattle__backButton"
                            disabled={buttonBoolean}
                            onClick={() => handleBackButton()}
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>
        );
    } else {
        return <></>;
    }
};

export default observer(InfoModal);
