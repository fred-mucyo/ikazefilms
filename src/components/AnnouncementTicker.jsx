import React from 'react';
import './AnnouncementTicker.css';
import announcementConfig from '../config/announcement.json';

const AnnouncementTicker = () => {
  const message = announcementConfig.message || '';

  return (
    <div className="announcement-ticker" aria-label="Site announcements">
      <div className="ticker-inner">
        <div className="ticker-content">
          <span>{message}</span>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementTicker;
