import HeroEquipmentShop from '../components/HeroEquipmentShop'
import HeroInventoryModal from '../components/HeroInventoryModal'
import HeroXpStatExchangeModal from '../components/modalHell/HeroXpStatExchangeModal'
import './navBar.css'

const NavBar = () => {

    return (
        <div className="navBar__container">
            <div className='navBar__button'>
                <HeroInventoryModal />
            </div>
            <div className="navBar__button">
                <HeroEquipmentShop />
            </div>
            <div className='navBar__button'>
                <HeroXpStatExchangeModal />
            </div>
        </div>
    )

}

export default NavBar