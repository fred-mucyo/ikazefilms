import React from 'react';

const DonateModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="donate-modal-backdrop" onClick={onClose}>
      <div
        className="donate-modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="donate-modal-header">
          <h2 className="donate-modal-title">Support IkazeFilms</h2>
          <button type="button" className="donate-modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="donate-modal-body">
          <p>
            IkazeFilms is free to use and maintained with love. If you enjoy the
            platform and want to support future improvements, you can donate using
            the details below:
          </p>
          <div className="donate-methods">
            <div className="donate-method">
              <h3>Mobile Money</h3>
              <p>
                <strong>Number:</strong> 07XX XXX XXX
              </p>
              <p>
                <strong>Name:</strong> Your Name Here
              </p>
            </div>
            <div className="donate-method">
              <h3>Bank Transfer</h3>
              <p>
                <strong>Account Name:</strong> IkazeFilms
              </p>
              <p>
                <strong>IBAN / Account No:</strong> 0000 0000 0000
              </p>
            </div>
          </div>
          <p className="donate-note">
            Any amount is appreciated and helps keep the service online and
            improving. Thank you for your support!
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonateModal;
