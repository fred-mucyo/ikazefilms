import React from 'react';
import { FileText, Mail } from 'lucide-react';
import './LegalPages.css';

const CONFIG = {
  appName: 'Hashye.online',
  contactEmail: 'hashyeonline@gmail.com',
  effectiveDate: 'August 20, 2025',
  companyName: 'Hashye.online',
  jurisdiction: 'Rwanda',
  arbitrationVenue: 'Kigali, Rwanda',
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
          <p className="legal-subtitle">
            Effective {C.effectiveDate} · For {C.appName}
          </p>
        </div>
      </header>

      <Card>
        <CardContent>
          <section className="legal-section">
            <p>
              Welcome to <strong>{C.appName}</strong>. By accessing or using our
              platform, you agree to the following Terms of Service. Please read
              them carefully.
            </p>

            <h2>1. Eligibility</h2>
            <p>You must be at least 13 years old to use {C.appName}.</p>

            <h2>2. Account Responsibility</h2>
            <p>
              You are responsible for maintaining the confidentiality of your
              account and password, and for all activities that occur under your
              account. Notify us immediately of any unauthorized access.
            </p>

            <h2>3. Use of Content</h2>
            <p>
              {C.appName} provides movies and shows for personal, non-commercial
              use only. You may not copy, reproduce, distribute, or modify
              content without written permission.
            </p>

            <h2>4. User Conduct</h2>
            <ul>
              <li>
                Do not attempt to bypass security, DRM, or access controls.
              </li>
              <li>Do not upload, share, or spread malicious code or spam.</li>
              <li>
                Do not infringe on any copyright, trademark, or intellectual
                property rights.
              </li>
            </ul>

            <h2>5. Intellectual Property</h2>
            <p>
              All site content, branding, logos, and designs are the property of{' '}
              {C.companyName} or its licensors. Unauthorized use is prohibited.
            </p>

            <h2>6. Disclaimers</h2>
            <p>
              The service is provided “as is” and “as available” without
              warranties of any kind, either express or implied. We make no
              guarantee of uninterrupted or error-free access.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              {C.companyName} and its affiliates are not liable for any
              indirect, incidental, consequential, or punitive damages arising
              from the use of our platform.
            </p>

            <h2>8. Termination</h2>
            <p>
              We may suspend or terminate your access to {C.appName} at any
              time, with or without notice, if you violate these terms or
              applicable laws.
            </p>

            <h2>9. Governing Law & Dispute Resolution</h2>
            <p>
              These Terms are governed by the laws of {C.jurisdiction}. Any
              disputes arising under these Terms shall be resolved through
              arbitration in {C.arbitrationVenue}.
            </p>

            <h2>10. Changes to These Terms</h2>
            <p>
              We may update these Terms of Service from time to time. Updates
              will take effect upon posting to this page. Continued use of{' '}
              {C.appName} constitutes your acceptance of any changes.
            </p>

            <h2>11. Contact</h2>
            <p>
              If you have questions about these Terms, you can contact us at:
            </p>
            <p>
              <Mail size={14} />{' '}
              <a href={`mailto:${C.contactEmail}`}>{C.contactEmail}</a>
            </p>
          </section>
        </CardContent>
      </Card>
    </main>
  );
}
