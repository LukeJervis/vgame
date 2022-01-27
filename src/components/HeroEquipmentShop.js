import { observer } from "mobx-react-lite"
import './heroEquipmentShop.css'
import HeroWeaponShop from './HeroWeaponShop'

const HeroEquipmentShop = () => {

    // const heroEquipmentShopModal = document.querySelector(".heroEquipmentShop__modal");

    const openModal = () => {
        document.getElementById('heroEquipmentShop__modal').style.display = "block";
    }

    const closeModal = () => {
        document.getElementById('heroEquipmentShop__modal').style.display = "none";
    }

    // window.onclick = function(event) {
    //     if (event.target === heroEquipmentShopModal) {
    //         document.getElementById('heroEquipmentShop__modal').style.display = "none";
    //     }
    // }

    return (
        <div className="heroEquipmentShop">
            <button id='heroEquipmentShop__Button' onClick={openModal}>shop</button>
            <div id='heroEquipmentShop__modal' className="heroEquipmentShop__modal">
                <div className="heroEquipmentShop__modal--open">
                    <span className="heroEquipmentShop__modal--close" onClick={closeModal}>&times;</span>
                    <div className="heroEquipmentShop__modalContents">
                        Da fuck you want?
                        <HeroWeaponShop />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(HeroEquipmentShop)