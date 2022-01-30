import HeroXpStatExchange from '../HeroXpStatExchange'
import './heroXpStatExchangeModal.css'

const HeroXpStatExchangeModal = () => {
    // const heroInventoryModal = document.querySelector(".heroInventory__modal");

    const openModal = () => {
        document.getElementById("HeroXpStatExchangeModal__modal").style.display = "block";
    }

    const closeModal = () => {
        document.getElementById("HeroXpStatExchangeModal__modal").style.display = "none";
    }

    // window.onclick = function(event) {
    //     if (event.target === heroInventoryModal) {
    //         document.getElementById('heroInventory__modal').style.display = "none";
    //     }
    // }

    return (
        <div className="HeroXpStatExchangeModal">
            <button id="HeroXpStatExchangeModal__Button" onClick={openModal}>Stats</button>
            <div id="HeroXpStatExchangeModal__modal" className="HeroXpStatExchangeModal__modal">
                <div className="HeroXpStatExchangeModal__modal--open">
                    <span className="HeroXpStatExchangeModal__modal--close" onClick={closeModal}>&times;</span>
                    <div className="HeroXpStatExchangeModal__modalContents">
                        Stats
                        <HeroXpStatExchange />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroXpStatExchangeModal