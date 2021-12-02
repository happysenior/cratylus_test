import React from "react";
import Modal from "react-modal";
import "./colorModal.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "300px",
    height: "300px",
    backgroundColor: "rgba(0,0,0,0.75)",
  },
};

const colors = [
  "#ffffff",
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#00ffff"
];

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#color-modal");

export default function ColorModal({
  isOpen,
  setIsOpen,
  setFirstColor,
  setSecondColor,
  firstColor,
  secondColor,
}) {
  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="color-body">
        <div className="color-group">
          <label>Left</label>
          <div className="colors">
            <div
              className="color-div default"
              style={{ backgroundColor: firstColor }}
              onClick={(e) => setFirstColor(firstColor)}
              key='first'
            ></div>
            {colors.map((color) => (
              <div
                className="color-div"
                style={{ backgroundColor: color }}
                onClick={(e) => setFirstColor(color)}
                key={`first-${color}`}
              ></div>
            ))}
          </div>
        </div>
        <div className="color-group">
          <label>right</label>
          <div className="colors">
            <div
              className="color-div default"
              style={{ backgroundColor: secondColor }}
              onClick={(e) => setSecondColor(secondColor)}
              key='second'
            ></div>
            {colors.map((color) => (
              <div
                className="color-div"
                style={{ backgroundColor: color }}
                onClick={(e) => setSecondColor(color)}
                key={`second-${color}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
