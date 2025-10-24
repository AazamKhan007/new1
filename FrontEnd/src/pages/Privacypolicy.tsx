import React from 'react';

const PrivacyPolicy: React.FC = () => {
  const lastUpdated = 'October 9, 2025';

  const dataRetention = [
    { type: 'Account Data', period: 'Active period + 12 months', action: 'Anonymized' },
    { type: 'Transaction Data', period: '7 years (for legal compliance)', action: 'Anonymized' },
    { type: 'Support Data', period: '2 years', action: 'Anonymized' },
    { type: 'Technical Logs', period: '90 days', action: 'Deleted/Anonymized' },
    { type: 'Consent Records', period: 'Until consent is withdrawn', action: 'Deleted/Anonymized' },
  ];

  const legalBases = [
    { purpose: 'Account setup & service delivery', basis: 'Contractual Necessity' },
    { purpose: 'Payment processing', basis: 'Contractual Necessity / Legal Obligation' },
    { purpose: 'Marketing communications', basis: 'Consent' },
    { purpose: 'Security & fraud detection', basis: 'Legitimate Interests' },
    { purpose: 'Analytics & service improvement', basis: 'Legitimate Interests' },
    { purpose: 'Legal compliance (e.g., tax)', basis: 'Legal Obligation' },
    { purpose: 'Blood donation (sensitive data)', basis: 'Explicit Consent' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 bg-white text-gray-800">
      
      {/* HEADER SECTION */}
      <header className="mb-10 text-center border-b pb-4">
        <h1 className="text-4xl font-extrabold text-indigo-700 sm:text-5xl">
          CampSum Privacy Policy
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          <strong>Last Updated:</strong> {lastUpdated}
        </p>
      </header>

      {/* INTRODUCTION */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Introduction</h2>
        <p className="text-gray-700 leading-relaxed">
          Welcome to CampSum. This Privacy Policy explains how CampSum Global Enterprises ("CampSum," "we," "our," or "us") collects, uses, shares, and protects your  personal information  when you use our services (collectively, the " Services ").
        </p>
        <p className="mt-3 p-4 bg-indigo-50 border-l-4 border-indigo-400 text-sm text-gray-700">
          We are committed to handling your data transparently and complying with applicable data protection laws, including  India's DPDPA , the  EU/UK GDPR , and relevant U.S. laws.
        </p>
      </section>

      {/* 1. Who We Are and Our Role */}
      <section className="mb-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold text-indigo-700 mb-3">1. Who We Are and Our Role</h3>
        <p className="text-gray-700">
          CampSum Global Enterprises is a legal entity registered in India. For data protection purposes, we act as the  Data Fiduciary  (India's DPDPA) and the  Data Controller  (EU/UK GDPR) for the personal information we process.
        </p>
      </section>

      {/* 2. The Information We Collect and Why */}
      <section className="mb-8">
        <h3 className="text-2xl font-semibold text-indigo-700 mb-4 border-b pb-2">2. The Information We Collect and Why</h3>
        <p className="text-gray-700 mb-4">
          We adhere to the principle of  data minimization , collecting only the information necessary to provide and secure our Services.
        </p>
        
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-100 text-indigo-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Examples</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Primary Purposes</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">A. Provided Directly</td>
                <td className="px-6 py-4">Name, email, university, address, reviews, messages.</td>
                <td className="px-6 py-4">Account management, service fulfillment, support.</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">B. Collected Automatically</td>
                <td className="px-6 py-4">IP address, cookie IDs, device identifiers, pages visited.</td>
                <td className="px-6 py-4">Security, fraud prevention, platform optimization.</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">C. From Third Parties</td>
                <td className="px-6 py-4">Google Login profile, payment processor metadata.</td>
                <td className="px-6 py-4">Authentication, secure payment processing.</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">D. Geolocation Data</td>
                <td className="px-6 py-4">Device GPS or IP address (with consent).</td>
                <td className="px-6 py-4">Showing relevant local services (e.g., jobs, tiffin).</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-yellow-50">
                <td className="px-6 py-4 font-medium text-red-700">F. Sensitive Personal Info</td>
                <td className="px-6 py-4 text-red-700">Blood group (for donation feature  only ).</td>
                <td className="px-6 py-4 text-red-700">Facilitate blood donation appointments (with  explicit consent ).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Our Legal Basis for Processing Information */}
      <section className="mb-8">
        <h3 className="text-2xl font-semibold text-indigo-700 mb-4 border-b pb-2">3. Our Legal Basis for Processing Information</h3>
        <ul className="list-disc ml-6 space-y-3 text-gray-700">
          <li>
             For users in India:  Our basis is primarily  Consent , which must be free, specific, informed, and unambiguous. We may also rely on "Legitimate Uses" (e.g., legal obligations) under the DPDPA.
          </li>
          <li>
             For users in the EU/UK (GDPR):  We rely on  Contractual Necessity ,  Consent ,  Legitimate Interests  (security, analytics), and  Legal Obligation . Sensitive data requires  Explicit Consent .
          </li>
        </ul>
      </section>

      {/* 4. Cookies and Tracking Technologies */}
      <section className="mb-8">
        <h3 className="text-2xl font-semibold text-indigo-700 mb-4 border-b pb-2">4. Cookies and Tracking Technologies</h3>
        <p className="text-gray-700 leading-relaxed">
          Currently, CampSum uses only  essential cookies  necessary for basic website functioning.
        </p>
        <p className="mt-3 p-4 bg-indigo-100 rounded-lg text-sm text-gray-800">
           Future Policy:  Should we introduce non-essential cookies (analytics, advertising), we will implement a consent banner with equally prominent  "Accept"  and  "Reject"  options, and non-essential cookies will not be placed without your affirmative consent.
        </p>
      </section>

      {/* 5. How We Share Your Information */}
      <section className="mb-8">
        <h3 className="text-2xl font-semibold text-indigo-700 mb-4 border-b pb-2">5. How We Share Your Information</h3>
        <p className="text-gray-700 mb-4 font-bold text-lg text-red-600">
          We do not sell your personal information.
        </p>
        <p className="text-gray-700 mb-4">
          We only share data with third parties for operational purposes, ensuring they adhere to strict  Data Processing Agreements (DPAs) :
        </p>
        <ul className="list-disc ml-6 space-y-1 text-gray-700">
          <li> Razorpay & Stripe:  Payment Processing (Name, transaction metadata).</li>
          <li> Google:  Cloud storage, authentication, maps functionality (Limited user info, location data).</li>
          <li> Supabase:  Database hosting and authentication (Account data, usage logs).</li>
        </ul>
      </section>

      {/* 6. Data Retention and Deletion */}
      <section className="mb-8">
        <h3 className="text-2xl font-semibold text-indigo-700 mb-4 border-b pb-2">6. Data Retention and Deletion</h3>
        <p className="text-gray-700 mb-4">
          We retain your personal information only as long as necessary. Our retention schedule is as follows:
        </p>
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Data Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Retention Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action After Expiry</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm">
              {dataRetention.map((item) => (
                <tr key={item.type} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{item.type}</td>
                  <td className="px-6 py-4">{item.period}</td>
                  <td className="px-6 py-4">{item.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 8. Your Privacy Rights and Choices */}
      <section className="mb-8 p-6 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
        <h3 className="text-2xl font-semibold text-indigo-700 mb-4">8. Your Privacy Rights and Choices</h3>
        <p className="text-gray-700 font-medium">
          You generally have the right to  access ,  correct ,  delete , and  object to  certain processing of your information.
        </p>
        <p className="mt-3 text-gray-700">
          To exercise any of your rights, please contact us at:
          <br />
          <strong className="text-indigo-600">admin@campsum.com</strong>
        </p>
        <p className="mt-2 text-sm text-gray-600">
          We will respond within legally required timeframes (typically 30 days) after verifying your identity.
        </p>
      </section>

      {/* 9. How We Protect Your Information */}
      <section className="mb-8">
        <h3 className="text-2xl font-semibold text-indigo-700 mb-4 border-b pb-2">9. How We Protect Your Information</h3>
        <p className="text-gray-700 mb-3">
          We use technical and organizational measures consistent with industry standards to protect your data:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li> Encryption:  Data is encrypted both  at rest  and  in transit .</li>
          <li> Access Controls:  Role-based access and the principle of  least privilege .</li>
          <li> Monitoring:  Logging and alert systems for threat detection.</li>
          <li> Incident Response:  Documented plan for notifying you and authorities in the event of a breach.</li>
        </ul>
      </section>
      
      {/* 10. Children's Privacy */}
      <section className="mb-10 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
        <h3 className="text-xl font-semibold text-red-700 mb-2">10. Children's Privacy</h3>
        <p className="text-red-700 font-medium">
          Our Services are strictly limited to individuals who are  18 years of age or older . We do not knowingly collect personal information from children under 18.
        </p>
      </section>

      {/* 12. Contact Us & Grievance Officer */}
      <section className="mb-10 p-6 bg-green-50 rounded-lg border-l-4 border-green-500">
        <h3 className="text-2xl font-semibold text-green-700 mb-3">12. Contact Us & Grievance Officer</h3>
        <p className="text-green-700 font-medium">Grievance Officer (India - DPDPA Compliance):</p>
        <ul className="ml-4 space-y-1 text-green-700">
          <li> Name:  Atul Kumar Dubey</li>
          <li> Email:  admin@campsum.com</li>
        </ul>
      </section>

      {/* --- JURISDICTION-SPECIFIC INFORMATION --- */}
      <div className="my-10 border-t-4 border-double border-indigo-300"></div>

      <h2 className="text-3xl font-bold text-gray-900 mb-6">Jurisdiction-Specific Information</h2>

      {/* Users in India */}
      <section className="mb-8 p-6 bg-indigo-50 rounded-lg">
        <h3 className="text-2xl font-semibold text-indigo-700 mb-3">For Users in India (DPDPA)</h3>
        <p className="text-gray-700 mb-3">
          In addition to general rights, the DPDPA grants:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li> Right to Grievance Redressal:  Grievances will be acknowledged within 7 days and resolved within 30 days.</li>
          <li> Right to Nominate:  You can nominate an individual to exercise your rights upon death or incapacity.</li>
        </ul>
      </section>

      {/* Users in the EU/UK */}
      <section className="mb-8 p-6 bg-indigo-50 rounded-lg">
        <h3 className="text-2xl font-semibold text-indigo-700 mb-3">For Users in the European Union (EU) and United Kingdom (UK) (GDPR)</h3>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li> Right to Data Portability:  Right to receive and transmit your personal data to another controller.</li>
          <li> Right to Object:  Right to object to processing based on legitimate interests.</li>
          <li> Right to Lodge a Complaint:  Right to complain to your local Data Protection Authority (e.g., ICO).</li>
        </ul>

        <h4 className="text-xl font-bold text-gray-800 mt-5 mb-2">Lawful Bases for Processing (EU/UK)</h4>
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Purpose</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Lawful Basis</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm">
              {legalBases.map((item) => (
                <tr key={item.purpose} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{item.purpose}</td>
                  <td className="px-6 py-4 font-medium">{item.basis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Users in the United States (California) */}
      <section className="mb-8 p-6 bg-indigo-50 rounded-lg">
        <h3 className="text-2xl font-semibold text-indigo-700 mb-3">For Users in the United States (California - CCPA/CPRA)</h3>
        <p className="text-gray-700 mb-3">
          This section applies if we expand services to your region, granting rights including:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li> Right to Know  (what information we collect).</li>
          <li> Right to Delete. </li>
          <li> Right to Opt-Out of Sale/Sharing  (if applicable -  we do not sell your data ).</li>
          <li> Right to Correct  inaccurate information.</li>
        </ul>
      </section>

      {/* FOOTER */}
      <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
        <p>We reserve the right to update this policy. Your continued use of the Services constitutes acceptance of the latest version.</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;