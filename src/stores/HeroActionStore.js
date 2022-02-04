import { makeAutoObservable } from "mobx";
import Clicker from "../components/Clicker";

class HeroActionStore {

    selectedActionArea = <Clicker />

    constructor(store) {
        this.allStores = store
        makeAutoObservable(this);
    }

    actionAreaChange = (newArea) => {
        if (!newArea) {
            this.selectedActionArea = <Clicker />
        }
        this.selectedActionArea = newArea
    }

}

export default HeroActionStore