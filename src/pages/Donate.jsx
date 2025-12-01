import React from 'react';
import '../styles/Donate.css';

const Donate = () => {
  return (
    <div className="donate-page">
      <div className="donate-page-card">
        <h1 className="donate-page-title">Support Hashye.online</h1>
        <p className="donate-page-intro">
          Hashye.online is free to use and maintained with love. If you enjoy the
          platform and want to support future improvements, you can donate using
          the details below:
        </p>

        <div className="donate-page-methods">
          <div className="donate-page-method">
            <h2>Mobile Money</h2>
            <p>
              <strong>Number:</strong> 07XX XXX XXX
            </p>
            <p>
              <strong>Name:</strong> Your Name Here
            </p>
          </div>

          <div className="donate-page-method">
            <h2>Bank Transfer</h2>
            <p>
              <strong>Account Name:</strong> Hashye Online
            </p>
            <p>
              <strong>IBAN / Account No:</strong> 0000 0000 0000
            </p>
          </div>
        </div>

        <p className="donate-page-note">
          Any amount is appreciated and helps keep the service online and
          improving. Thank you for your support!
        </p>
      </div>
    </div>
  );
};

export default Donate;
