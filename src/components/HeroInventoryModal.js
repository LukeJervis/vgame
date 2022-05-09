import { observer } from "mobx-react-lite";
import "./heroInventoryModal.css";
import HeroInventory from "./HeroInventory";

const HeroInventoryModal = () => {
  // const heroInventoryModal = document.querySelector(".heroInventory__modal");

  const openModal = () => {
    document.getElementById("heroInventory__modal").style.display = "block";
  };

  const closeModal = () => {
    document.getElementById("heroInventory__modal").style.display = "none";
  };

  // window.onclick = function(event) {
  //     if (event.target === heroInventoryModal) {
  //         document.getElementById('heroInventory__modal').style.display = "none";
  //     }
  // }

  return (
    <div className="heroInventory">
      <button id="heroInventory__Button" onClick={openModal}>
        Inventory
      </button>
      <div id="heroInventory__modal" className="heroInventory__modal">
        <div className="heroInventory__modal--open">
          <span className="heroInventory__modal--close" onClick={closeModal}>
            &times;
          </span>
          <div className="heroInventory__modalContents">
            Inventory
            <HeroInventory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(HeroInventoryModal);
