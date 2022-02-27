import HeroEquipmentShop from '../components/HeroEquipmentShop'
import HeroInventoryModal from '../components/HeroInventoryModal'
import HeroXpStatExchangeModal from '../components/modalHell/HeroXpStatExchangeModal'
import MasterModal from '../components/modalHell/MasterModal'
import HeroPetXpStatExchangeModal from '../components/modalHell/HeroPetXpStatExchangeModal'
import PetShop from '../components/PetShop'
import BattleLocations from '../components/BattleLocations'
import Apothecary from '../components/Apothecary'
import TrainingYard from '../components/statSchools/TrainingYard'

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
                <MasterModal buttonName='Patrol Areas' title='Patrol Areas'>
                    <BattleLocations />
                </MasterModal>
            </div>
            <div className='navBar__button'>
                <MasterModal buttonName='Apothecary' title='Apothecary'>
                    <Apothecary />
                </MasterModal>
            </div>
            <div className='navBar__button'>
                <MasterModal buttonName='Training Yard' title='Training Yard'>
                    <TrainingYard />
                </MasterModal>
            </div>
        </div>
    )
}

export default NavBar