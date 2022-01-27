

const MasterModal = (props) => {
    // const heroInventoryModal = document.querySelector(".heroInventory__modal");

    const openModal = () => {
        document.getElementById(`${props}__modal`).style.display = "block";
    }

    const closeModal = () => {
        document.getElementById(`${props}__modal`).style.display = "none";
    }

    // window.onclick = function(event) {
    //     if (event.target === heroInventoryModal) {
    //         document.getElementById('heroInventory__modal').style.display = "none";
    //     }
    // }

    return (
        <div className={`${props}`}>
            <button id={`${props}__Button`} onClick={openModal}>Inventory</button>
            <div id={`${props}__modal`} className={`${props}__modal`}>
                <div className="modal--open">
                    <span className="modal--close" onClick={closeModal}>&times;</span>
                    <div className="modalContents">
                        Inventory
                        <{props} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MasterModal