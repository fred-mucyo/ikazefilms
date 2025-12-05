//         <div className="icon-box green">
//           <Shield size={22} />
//         </div>
//         <div>
//           <h1 className="legal-title">Privacy Policy</h1>
//           <p className="legal-subtitle">
//             Effective {C.effectiveDate} · For {C.appName}
//           </p>
//         </div>
//       </header>

//       <Card>
//         <CardContent>
//           <section className="legal-section">
//             <p>
//               At <strong>{C.appName}</strong>, your privacy matters.
//             </p>
//             <h2>1. Information We Collect</h2>
//             <ul>
//               <li>Account details: email, name, login.</li>
//               <li>Usage data: pages visited, videos streamed.</li>
//               <li>Device info: browser, IP, OS.</li>
//               <li>Cookies for session/analytics.</li>
//             </ul>
//             <h2>2. How We Use Information</h2>
//             <ul>
//               <li>To operate and improve {C.appName}.</li>
//               <li>To personalize your experience.</li>
//               <li>For safety and compliance.</li>
//             </ul>
//             <h2>3. Sharing of Information</h2>
//             <p>
//               We don’t sell data. Shared only with trusted providers or when
//               required by law.
//             </p>
//             <h2>4. Data Retention</h2>
//             <p>Data is kept only as long as necessary or required legally.</p>
//             <h2>5. Your Rights</h2>
//             <ul>
//               <li>Access, update, or delete your data.</li>
//               <li>Opt out of cookies/emails.</li>
//             </ul>
//             <h2>6. Security</h2>
//             <p>We use safeguards but no system is 100% secure.</p>
//             <h2>7. Children</h2>
//             <p>{C.appName} is not for children under 13.</p>
//             <h2>8. Changes</h2>
//             <p>We may update this policy; continued use = acceptance.</p>
//             <h2>9. Contact</h2>
//             <p>
//               <Mail size={14} />{' '}
//               <a href={`mailto:${C.contactEmail}`}>{C.contactEmail}</a> ·{' '}
//               <Building2 size={14} /> {C.companyAddress} · <Globe size={14} />{' '}
//               <a href={C.websiteUrl}>{C.websiteUrl}</a>
//             </p>
//           </section>
//         </CardContent>
//       </Card>
//     </main>
//   );
// }

import React from 'react';
import { Shield, Mail, Globe, Building2 } from 'lucide-react';

import './LegalPages.css';

const CONFIG = {
  appName: 'IkazeFilms',
  contactEmail: 'support@ikazefilms.online',
  effectiveDate: 'August 20, 2025',
  companyAddress: 'Kigali, Rwanda',
  websiteUrl: 'https://ikazefilms.online',
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
          <p className="legal-subtitle">
            Effective {C.effectiveDate} · For {C.appName}
          </p>
        </div>
      </header>

      <Card>
        <CardContent>
          <section className="legal-section">
            <p>
              At <strong>{C.appName}</strong>, we respect your privacy and are
              committed to protecting your personal information. This policy
              explains what we collect, how we use it, and your rights regarding
              your data.
            </p>

            <h2>1. Information We Collect</h2>
            <ul>
              <li>
                Account details such as your name, email address, and login
                data.
              </li>
              <li>
                Usage data including pages visited, content viewed, and actions
                taken.
              </li>
              <li>
                Device information such as browser type, operating system, and
                IP address.
              </li>
              <li>
                Cookies and similar technologies for analytics and session
                management.
              </li>
            </ul>

            <h2>2. How We Use Information</h2>
            <ul>
              <li>To operate, maintain, and improve {C.appName}.</li>
              <li>
                To personalize your experience and provide relevant content.
              </li>
              <li>To ensure security and comply with legal obligations.</li>
            </ul>

            <h2>3. Sharing of Information</h2>
            <p>
              We do not sell your personal information. Data may be shared only
              with trusted service providers who assist us in operating our
              platform, or when required by law.
            </p>

            <h2>3.1 Google AdSense and Cookies</h2>
            <p>
              {C.appName} uses <strong>Google AdSense</strong> to display ads.
              Google uses cookies and similar technologies to serve ads based on
              your previous visits to this and other websites. These cookies
              help deliver relevant advertising and measure ad performance.
            </p>
            <p>
              You can learn more about how Google uses your information by
              visiting{' '}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google’s Advertising Policies
              </a>
              . You can opt out of personalized ads at{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Ad Settings
              </a>
              .
            </p>

            <h2>4. Data Retention</h2>
            <p>
              We retain data only for as long as necessary to fulfill the
              purposes outlined in this policy or as required by law.
            </p>

            <h2>5. Your Rights</h2>
            <ul>
              <li>Access, correct, or delete your personal information.</li>
              <li>
                Opt out of cookies, analytics, or marketing communications.
              </li>
              <li>Withdraw consent for data processing at any time.</li>
            </ul>

            <h2>6. Security</h2>
            <p>
              We implement appropriate safeguards to protect your data. However,
              no online system can be guaranteed to be completely secure.
            </p>

            <h2>7. Children’s Privacy</h2>
            <p>
              {C.appName} is not directed at children under 13. We do not
              knowingly collect personal information from minors.
            </p>

            <h2>8. Policy Updates</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page, and continued use of our services
              means you accept the updated policy.
            </p>

            <h2>9. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy,
              you can reach us at:
            </p>
            <p>
              <Mail size={14} />{' '}
              <a href={`mailto:${C.contactEmail}`}>{C.contactEmail}</a> ·{' '}
              <Building2 size={14} /> {C.companyAddress} · <Globe size={14} />{' '}
              <a href={C.websiteUrl}>{C.websiteUrl}</a>
            </p>
          </section>
        </CardContent>
      </Card>
    </main>
  );
}
