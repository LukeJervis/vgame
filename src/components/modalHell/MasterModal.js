import "./masterModal.css";

const MasterModal = ({ children, title, buttonName }) => {
  // const heroInventoryModal = document.querySelector(".heroInventory__modal");

  const openModal = () => {
    document.getElementById(`masterModal__${title}`).style.display = "block";
  };

  const closeModal = () => {
    document.getElementById(`masterModal__${title}`).style.display = "none";
  };

  // window.onclick = function(event) {
  //     if (event.target === heroInventoryModal) {
  //         document.getElementById('heroInventory__modal').style.display = "none";
  //     }
  // }

  return (
    <div className="masterModal">
      <button id="masterModal__Button" onClick={openModal}>
        {buttonName}
      </button>
      <div id={`masterModal__${title}`} className="masterModal__modal">
        <div className="masterModal__modal--open">
          <span className="masterModal__modal--close" onClick={closeModal}>
            &times;
          </span>
          <div className="masterModal__modalContents">
            {title}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterModal;
