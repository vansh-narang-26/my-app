import React from 'react';
import "./Modal.css"

const Modal = ({ isOpen, onClose, children, slots }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          {children}
          <button
            onClick={() => {
              // console.log("Slots value:", slots);
              if (slots) {
                window.location.href = "https://nexastack.ai/";
              } else {
                onClose();
              }
            }}
            className="modal-close-btn font-work-sans-regular"
          >
            Close
          </button>

        </div>
      </div>
    </div>
  );
};

export default Modal
