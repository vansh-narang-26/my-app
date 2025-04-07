import React from 'react';
import "./Modal.css"

const Modal = ({ isOpen, onClose, children, slots }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          {children}
          <button
            onClick={() => {
              if (!slots || slots.length === 0) {
                // Redirect to the same page
                window.location.href = window.location.href;
              } else {
                // Redirect to NexaStack
                window.location.href = "https://nexastack.ai/";
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
