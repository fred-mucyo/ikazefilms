import React from "react";
import { FileText } from "lucide-react";
import "./LegalPages.css";

const CONFIG = {
  appName: "Hashye",
  contactEmail: "hashyeonline@gmail.com",
  effectiveDate: "August 20, 2025",
  companyName: "Hashye",
  jurisdiction: "Rwanda",
  arbitrationVenue: "Kigali, Rwanda",
};

function Card({ children }) {
  return <div className="card">{children}</div>;
}
function CardContent({ children }) {
  return <div className="card-content">{children}</div>;
}

export default function TermsOfService() {
  const C = CONFIG;
  return (
    <main className="legal-main">
      <header className="legal-header">
        <div className="icon-box indigo">
          <FileText size={22} />
        </div>
        <div>
          <h1 className="legal-title">Terms of Service</h1>
          <p className="legal-subtitle">Effective {C.effectiveDate} · For {C.appName}</p>
        </div>
      </header>

      <Card>
        <CardContent>
          <section className="legal-section">
            <p>Welcome to <strong>{C.appName}</strong>. By accessing or using our platform, you agree to these Terms of Service.</p>
            <h2>1. Eligibility</h2>
            <p>You must be at least 13 years old to use {C.appName}.</p>
            <h2>2. Account Responsibility</h2>
            <p>You are responsible for all activity under your account.</p>
            <h2>3. Use of Content</h2>
            <p>{C.appName} provides movies and shows for personal, non-commercial use only.</p>
            <h2>4. User Conduct</h2>
            <ul>
              <li>No bypassing security or DRM measures.</li>
              <li>No malicious code or scraping.</li>
              <li>No IP rights infringement.</li>
            </ul>
            <h2>5. Intellectual Property</h2>
            <p>All designs and materials belong to {C.companyName} or licensors.</p>
            <h2>6. Disclaimers</h2>
            <p>The service is provided “as is” without warranties.</p>
            <h2>7. Limitation of Liability</h2>
            <p>{C.companyName} is not liable for indirect or consequential damages.</p>
            <h2>8. Termination</h2>
            <p>We may suspend/terminate accounts if rules are broken.</p>
            <h2>9. Governing Law</h2>
            <p>These Terms are governed by {C.jurisdiction}, venue {C.arbitrationVenue}.</p>
            <h2>10. Contact</h2>
            <p>Email: <a href={`mailto:${C.contactEmail}`}>{C.contactEmail}</a></p>
          </section>
        </CardContent>
      </Card>
    </main>
  );
}
