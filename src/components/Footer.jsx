
import { Route, Link } from "react-router-dom";
import React from 'react'
import './Footer.css'

import TermsOfService from "../LegalPages/TermsOfServices";
import PrivacyPolicy from "../LegalPages/PrivacyPolicy";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="brand-logo">
            <span className="logo-icon">🎬</span>
            <span className="logo-text">Hashye.online</span>
          </div>
          <p className="brand-tagline">Unlimited Movies & TV Shows</p>
        </div>

        <div className="footer-links">
  <Link to="/terms" className="footer-link">Terms of Service</Link>
  <Link to="/privacy" className="footer-link">Privacy Policy</Link>
          <a href="https://www.instagram.com/hashye.online/" target="_blank" rel="noreferrer" className="footer-link">IG</a>
          <a href="https://www.tiktok.com/@hashye.online?_t=ZM-8z7Yvtk9IJh&_r=1" target="_blank" rel="noreferrer" className="footer-link">TikTok</a>



<a href="https://whatsapp.com/channel/0029Vb62TIr7tkj7u17XUa3v" target="_blank" rel="noreferrer" className="footer-link">Whatsapp</a>



        </div>

        <div className="footer-copy">
          <span>© {new Date().getFullYear()} Hashye.online  All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}



export default Footer


