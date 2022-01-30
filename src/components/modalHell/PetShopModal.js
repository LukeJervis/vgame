import PetShop from '../PetShop'
import './petShopModal.css'

const PetShopModal = () => {
    // const heroInventoryModal = document.querySelector(".heroInventory__modal");

    const openModal = () => {
        document.getElementById("petShopModal__modal").style.display = "block";
    }

    const closeModal = () => {
        document.getElementById("petShopModal__modal").style.display = "none";
    }

    // window.onclick = function(event) {
    //     if (event.target === heroInventoryModal) {
    //         document.getElementById('heroInventory__modal').style.display = "none";
    //     }
    // }

    return (
        <div className="petShopModal">
            <button id="petShopModal__Button" onClick={openModal}>Pet Shop</button>
            <div id="petShopModal__modal" className="petShopModal__modal">
                <div className="petShopModal__modal--open">
                    <span className="petShopModal__modal--close" onClick={closeModal}>&times;</span>
                    <div className="petShopModal__modalContents">
                        Pet Shop
                        <PetShop />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PetShopModal