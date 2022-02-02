import HeroEquipmentShop from '../components/HeroEquipmentShop'
import HeroInventoryModal from '../components/HeroInventoryModal'
import HeroXpStatExchangeModal from '../components/modalHell/HeroXpStatExchangeModal'
import MasterModal from '../components/modalHell/MasterModal'
import HeroPetXpStatExchangeModal from '../components/modalHell/HeroPetXpStatExchangeModal'
import PetShop from '../components/PetShop'
import BattleLocations from '../components/BattleLocations'

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
            <div className='navBar__button'>
                <MasterModal buttonName='Pet Shop' title='Pet Shop'>
                    <PetShop />
                </MasterModal>
            </div>
            <div className='navBar__button'>
                <HeroPetXpStatExchangeModal />
            </div>
            <div className='navBar__button'>
                <MasterModal>
                    <BattleLocations buttonName='Patrol Areas' title='Patrol Areas'/>
                </MasterModal>
            </div>
        </div>
    )

}

export default NavBar