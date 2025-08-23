// src/legalPages/PrivacyPolicy.jsx
import React from "react";
import { Shield, Mail, Globe, Building2 } from "lucide-react";
import "./LegalPages.css";

const CONFIG = {
  appName: "Hashye",
  contactEmail: "hashyeonline@gmail.com",
  effectiveDate: "August 20, 2025",
  companyAddress: "Kigali, Rwanda",
  websiteUrl: "https://hashye.com",
};

function Card({ children }) {
  return <div className="card">{children}</div>;
}
function CardContent({ children }) {
  return <div className="card-content">{children}</div>;
}

export default function PrivacyPolicy() {
  const C = CONFIG;
  return (
    <main className="legal-main">
      <header className="legal-header">
        <div className="icon-box green">
          <Shield size={22} />
        </div>
        <div>
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-subtitle">Effective {C.effectiveDate} · For {C.appName}</p>
        </div>
      </header>

      <Card>
        <CardContent>
          <section className="legal-section">
            <p>At <strong>{C.appName}</strong>, your privacy matters.</p>
            <h2>1. Information We Collect</h2>
            <ul>
              <li>Account details: email, name, login.</li>
              <li>Usage data: pages visited, videos streamed.</li>
              <li>Device info: browser, IP, OS.</li>
              <li>Cookies for session/analytics.</li>
            </ul>
            <h2>2. How We Use Information</h2>
            <ul>
              <li>To operate and improve {C.appName}.</li>
              <li>To personalize your experience.</li>
              <li>For safety and compliance.</li>
            </ul>
            <h2>3. Sharing of Information</h2>
            <p>We don’t sell data. Shared only with trusted providers or when required by law.</p>
            <h2>4. Data Retention</h2>
            <p>Data is kept only as long as necessary or required legally.</p>
            <h2>5. Your Rights</h2>
            <ul>
              <li>Access, update, or delete your data.</li>
              <li>Opt out of cookies/emails.</li>
            </ul>
            <h2>6. Security</h2>
            <p>We use safeguards but no system is 100% secure.</p>
            <h2>7. Children</h2>
            <p>{C.appName} is not for children under 13.</p>
            <h2>8. Changes</h2>
            <p>We may update this policy; continued use = acceptance.</p>
            <h2>9. Contact</h2>
            <p>
              <Mail size={14} /> <a href={`mailto:${C.contactEmail}`}>{C.contactEmail}</a> ·{" "}
              <Building2 size={14} /> {C.companyAddress} ·{" "}
              <Globe size={14} /> <a href={C.websiteUrl}>{C.websiteUrl}</a>
            </p>
          </section>
        </CardContent>
      </Card>
    </main>
  );
}
