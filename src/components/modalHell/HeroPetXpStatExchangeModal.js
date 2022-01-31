import HeroPetXpStatExchange from '../HeroPetXpStatExchange'
import './heroPetXpStatExchangeModal.css'

const HeroPetXpStatExchangeModal = () => {
    // const heroInventoryModal = document.querySelector(".heroInventory__modal");

    const openModal = () => {
        document.getElementById("HeroPetXpStatExchangeModal__modal").style.display = "block";
    }

    const closeModal = () => {
        document.getElementById("HeroPetXpStatExchangeModal__modal").style.display = "none";
    }

    // window.onclick = function(event) {
    //     if (event.target === heroInventoryModal) {
    //         document.getElementById('heroInventory__modal').style.display = "none";
    //     }
    // }

    return (
        <div className="HeroPetXpStatExchangeModal">
            <button id="HeroPetXpStatExchangeModal__Button" onClick={openModal}>Pet Stats</button>
            <div id="HeroPetXpStatExchangeModal__modal" className="HeroPetXpStatExchangeModal__modal">
                <div className="HeroPetXpStatExchangeModal__modal--open">
                    <span className="HeroPetXpStatExchangeModal__modal--close" onClick={closeModal}>&times;</span>
                    <div className="HeroPetXpStatExchangeModal__modalContents">
                        Pet Stats
                        <HeroPetXpStatExchange />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroPetXpStatExchangeModal