import HeroEquipmentShop from '../components/HeroEquipmentShop'
import HeroInventoryModal from '../components/HeroInventoryModal'

const NavBar = () => {

    return (
        <div className="navBar__container">
            <div className='navBar__heroInventoryModal'>
                <HeroInventoryModal />
            </div>
            <div className="navBar__heroEquipmentShop">
                <HeroEquipmentShop />
            </div>
        </div>
    )

}

export default NavBar