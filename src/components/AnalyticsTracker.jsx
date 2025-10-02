// src/components/AnalyticsTracker.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.MODE === 'production' && window.gtag) {
      window.gtag('config', 'G-0YR8SHQ9N0', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}
