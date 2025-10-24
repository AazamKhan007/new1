import React from 'react';

const TermsOfService: React.FC = () => {
  const effectiveDate = '1 November 2025';

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 bg-white text-gray-800">
      
      {/* HEADER SECTION */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-indigo-700 sm:text-5xl">
          Terms of Service for CampSum
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          <strong>Effective Date:</strong> {effectiveDate}
        </p>
      </header>

      {/* PART A: GENERAL TERMS */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-900 border-b-2 pb-2 border-indigo-200">
          Part A: General Terms Applicable to All Users
        </h2>

        {/* 1. Introduction and Agreement to Terms */}
        <div className="section-content">
          <h3 className="text-2xl font-semibold text-indigo-700 mb-3">1. Introduction and Agreement to Terms</h3>
          <p className="mt-4 text-gray-700 leading-relaxed">
            These Terms of Service ("Terms") constitute a legally binding agreement between you ("You," "User") and  CampSum Global Enterprises  ("CampSum," "we," "us," or "our"). CampSum Global Enterprises is a Micro Enterprise registered in India under the Ministry of Micro, Small and Medium Enterprises (MSME). This document governs your access to and use of the CampSum platform, including our websites, mobile applications, software, and all associated services (collectively, the " Platform " or " Services ").
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed">
            This document is an electronic record in terms of India's Information Technology Act, 2000, and the rules thereunder. By accessing, browsing, registering for, or using the Platform in any manner, you acknowledge that you have read, understood, and agree to be bound by these Terms and our  Privacy Policy , which is incorporated herein by reference. If you do not agree to these Terms, you must not access or use the Platform.
          </p>
          <p className="mt-4 text-sm text-gray-500 italic bg-indigo-50 p-3 rounded-lg border-l-4 border-indigo-400">
            The act of agreeing to these Terms alongside the Privacy Policy is a critical component of establishing a transparent and lawful basis for the processing of your personal data... By binding these two documents at the point of user agreement, CampSum creates a unified and legally defensible "consent event" that satisfies requirements under both contract law and data protection law.
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed">
            CampSum reserves the right to amend, modify, or update these Terms at any time, at its sole discretion. We will provide notice of significant changes by posting the revised Terms on the Platform or through other communication channels. Your continued use of the Platform after such changes have been posted constitutes your acceptance of the revised Terms.
          </p>
        </div>

        {/* 2. Definitions */}
        <div className="section-content">
          <h3 className="text-2xl font-semibold text-indigo-700 mb-3">2. Definitions</h3>
          <p className="mb-3 text-gray-700">For the purposes of these Terms, the following definitions shall apply:</p>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>
              <strong>Platform:</strong> Refers to CampSum’s websites, web applications, and mobile interfaces, including all software, data, and content.
            </li>
            <li>
              <strong>User:</strong> Any person or entity that accesses or uses the Platform. This includes  Students ,  Business Partners , and  General Visitors .
            </li>
            <li>
              <strong>Content:</strong> All text, graphics, images, and other forms of information. Categorized as:  CampSum Content  (proprietary) and  User-Generated Content (UGC)  (posted by a User).
            </li>
            <li>
              <strong>Third-Party Provider:</strong> An independent entity offering goods or services to Students via the Platform (e.g., landlords, employers, meal services).
            </li>
            <li>
              <strong>Services:</strong> The full suite of functionalities provided, including the discount directory, job board, accommodation finder, and marketplace.
            </li>
          </ul>
        </div>

        {/* 3. Eligibility and Account Security */}
        <div className="section-content">
          <h3 className="text-2xl font-semibold text-indigo-700 mb-3">3. Eligibility and Account Security</h3>
          <ul className="list-disc ml-6 space-y-4 text-gray-700 leading-relaxed">
            <li>
              <strong>Age of Majority:</strong> You must be at least  18 years of age  and competent to enter into a legally binding contract under the Indian Contract Act, 1872. The Platform is strictly not intended for individuals under 18.
            </li>
            <li>
              <strong>Account Creation and Responsibility:</strong> You agree to provide true, accurate, and complete information. You are solely responsible for safeguarding your account password.
            </li>
          </ul>
        </div>

        {/* 4. The CampSum Platform: Role as an Intermediary */}
        <div className="section-content">
          <h3 className="text-2xl font-semibold text-indigo-700 mb-3">4. The CampSum Platform: Scope of Services and Role as an Intermediary</h3>
          <p className="mt-4 text-gray-700 leading-relaxed">
            The CampSum Platform functions as a  neutral venue  and technology service connecting Students with Third-Party Providers.
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-700 leading-relaxed">
            <li>
               No Party to Transactions:  CampSum is  not a party  to any agreement for goods or services offered by a Third-Party Provider.
            </li>
            <li>
               Disclaimer of Control:  We do not control, verify, or endorse the quality, safety, or legality of any UGC, including listings or job descriptions.
            </li>
            <li>
               User Responsibility:  You are solely responsible for your interactions and must conduct your own  due diligence  before entering any transaction.
            </li>
          </ul>
          <p className="mt-4 text-sm text-gray-500 italic bg-gray-50 p-3 rounded-lg">
            This contractual definition of CampSum's role as an "intermediary" is a critical legal shield designed to align with "safe harbor" provisions in laws like  India's IT Act, Section 79  and the  U.S. Communications Decency Act, Section 230 .
          </p>
        </div>
      </section>

      {/* Separator */}
      <div className="my-10 border-t border-gray-200"></div>
      
      {/* PART B: CONTENT AND PLATFORM-SPECIFIC TERMS */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-900 border-b-2 pb-2 border-indigo-200">
          Part B: Content and Platform-Specific Terms
        </h2>

        {/* 7. User-Generated Content (UGC) */}
        <div className="section-content">
          <h3 className="text-2xl font-semibold text-indigo-700 mb-3">7. User-Generated Content (UGC)</h3>
          <ul className="list-disc ml-6 space-y-2 text-gray-700 leading-relaxed">
            <li>
               Your Ownership and Responsibility:  You retain ownership of your UGC but are solely responsible for it.
            </li>
            <li>
               License Grant to CampSum:  By posting UGC, you grant CampSum a non-exclusive, worldwide, royalty-free, perpetual, and transferable license to use, reproduce, modify, and display your UGC for operating and promoting the Services.
            </li>
            <li>
               Content Moderation and Takedown Policy:  CampSum has the  right, but not the obligation , to monitor or remove UGC that violates these Terms, allowing us to comply with global laws like the  EU's Digital Services Act  and  India's IT Rules .
            </li>
          </ul>
        </div>

        {/* 8. Terms for Specific Services */}
        <div className="section-content">
          <h3 className="text-2xl font-semibold text-indigo-700 mb-4">8. Terms for Specific Services</h3>
          
          <h4 className="text-xl font-bold text-gray-800 mt-5 mb-2">Marketplace for New and Used Accessories:</h4>
          <p className="text-gray-700">The Marketplace is a  peer-to-peer venue . CampSum is not a party to any transaction. Disputes must be resolved directly between the buyer and seller. Misleading listings are prohibited.</p>
          
          <h4 className="text-xl font-bold text-gray-800 mt-5 mb-2">Accommodation and Roommate Finder:</h4>
          <p className="text-gray-700">CampSum is  not a real estate broker . We do not inspect properties or conduct background checks. All arrangements are made at your own risk. We disclaim all liability for disputes or damages.</p>
          
          <h4 className="text-xl font-bold text-gray-800 mt-5 mb-2">Service Connectors (Tiffin, Meal Services, etc.):</h4>
          <p className="text-gray-700">CampSum acts solely as a  discovery and connection platform . Your service contract is directly with the Third-Party Provider. We make no warranties regarding the quality, hygiene, or safety of the food or services.</p>
        </div>
      </section>

      {/* Separator */}
      <div className="my-10 border-t border-gray-200"></div>

      {/* PART C: COMMERCIAL AND LEGAL TERMS */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-900 border-b-2 pb-2 border-indigo-200">
          Part C: Commercial and Legal Terms
        </h2>

        {/* 9. Fees, Payments, and Subscriptions */}
        <div className="section-content">
          <h3 className="text-2xl font-semibold text-indigo-700 mb-3">9. Fees, Payments, and Subscriptions</h3>
          <p className="text-gray-700 leading-relaxed">
            Core features are currently  free for Student Users . Fees apply to  Business Partners  for premium listings or advertisements. All payments are processed through secure  third-party payment gateways  (e.g., Razorpay, Stripe), and CampSum does not store full payment details.
          </p>
          <div className="mt-6 overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-gray-50">
                Service Structure Overview
              </caption>
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Feature</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Student User (Free)</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Business Partner (Premium)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">Job Postings (Post)</td>
                  <td className="px-6 py-4 whitespace-nowrap">N/A</td>
                  <td className="px-6 py-4 whitespace-nowrap">10 per month</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">Access to Student Profiles/CVs</td>
                  <td className="px-6 py-4 whitespace-nowrap">N/A</td>
                  <td className="px-6 py-4 whitespace-nowrap">Full Access</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">Cost</td>
                  <td className="px-6 py-4 whitespace-nowrap">Free</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    INR: ₹9999/month, UK: £499/month, EU: €499/month, US: $499/month
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 11. Disclaimers, Limitation of Liability, and Indemnification */}
        <div className="section-content">
          <h3 className="text-2xl font-semibold text-indigo-700 mb-3">11. Disclaimers, Limitation of Liability, and Indemnification</h3>
          <p className="mt-4 text-gray-700 leading-relaxed">
             General Disclaimer:  TO THE FULLEST EXTENT PERMITTED BY LAW, THE PLATFORM AND SERVICES ARE PROVIDED  "AS IS"  AND  "AS AVAILABLE"  WITHOUT ANY WARRANTIES OF ANY KIND.
          </p>
          <p className="mt-4 p-4 bg-red-50 text-red-700 font-mono rounded-lg border-l-4 border-red-500 text-sm">
             Limitation of Liability:  IN NO EVENT SHALL CAMPSUM BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES. CAMPSUM'S TOTAL AGGREGATE LIABILITY SHALL NOT EXCEED THE GREATER OF: (A) THE FEES PAID BY YOU IN THE SIX (6) MONTHS PRIOR TO THE LIABILITY; OR (B) FIVE THOUSAND INDIAN RUPEES (INR 5,000).
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed">
             Indemnification:  You agree to  defend, indemnify, and hold harmless  CampSum against all claims, damages, and expenses arising from your violation of these Terms or any third-party right.
          </p>
        </div>

        {/* 13. Governing Law and Dispute Resolution */}
        <div className="section-content">
          <h3 className="text-2xl font-semibold text-indigo-700 mb-3">13. Governing Law and Dispute Resolution</h3>
          <p className="mt-4 text-gray-700 leading-relaxed">
            These Terms shall be governed by the laws of the  Republic of India .
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Any legal action shall be brought exclusively in the competent courts of  Mirzapur, Uttar Pradesh, India . You agree to first attempt to resolve any dispute informally by contacting our Grievance Officer.
          </p>
        </div>

        {/* 14. Grievance Redressal Mechanism */}
        <div className="section-content">
          <h3 className="text-2xl font-semibold text-indigo-700 mb-3">14. Grievance Redressal Mechanism</h3>
          <p className="text-gray-700">
            In compliance with Indian IT and E-Commerce Rules, we have established a grievance redressal mechanism.
          </p>
          <div className="mt-3 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
            <p className="font-medium text-green-800">Grievance Officer Contact:</p>
            <p className="text-green-700"><strong>Name:</strong> Atul Kumar Dubey</p>
            <p className="text-green-700"><strong>Email:</strong> admin@campsum.com</p>
            <p className="text-sm mt-1 text-green-700">
              We will acknowledge receipt of your complaint within  48 hours  and aim to resolve it within  one month .
            </p>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="my-10 border-t border-gray-200"></div>

      {/* PART D: JURISDICTIONAL ANNEXES */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-900 border-b-2 pb-2 border-indigo-200">
          Part D: Jurisdictional Annexes
        </h2>

        {/* 16. Annex A: EU and UK */}
        <div className="section-content">
          <h3 className="text-2xl font-semibold text-indigo-700 mb-3">16. Annex A: Additional Terms for Users in the European Union (EU) and United Kingdom (UK)</h3>
          <p className="text-gray-700">
            These terms apply if you are an EU/UK resident. In case of conflict, this Annex prevails.
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-700 mt-3">
            <li>
               Data Subject Rights (GDPR):  You have the right to Access, Rectification, Erasure ('Right to be Forgotten'), Restriction of Processing, Data Portability, and Objection.
            </li>
            <li>
               Digital Services Act (DSA):  CampSum is committed to transparency in content moderation and providing access to an effective internal complaint-handling system.
            </li>
          </ul>
        </div>

        {/* 17. Annex B: United States */}
        <div className="section-content">
          <h3 className="2xl font-semibold text-indigo-700 mb-3">17. Annex B: Additional Terms for Users in the United States</h3>
          <p className="text-gray-700">
            These terms apply if you are a U.S. resident.
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-700 mt-3">
            <li>
               California Consumer Privacy Act (CCPA/CPRA):  California residents have specific rights, including the Right to Know, Delete, Correct, and Opt-Out of Sale/Sharing.
            </li>
            <li>
               Communications Decency Act:  CampSum is protected as an "interactive computer service" and is not treated as the publisher of User-Generated Content (47 U.S.C. § 230).
            </li>
          </ul>
        </div>
      </section>
      
      {/* FOOTER */}
      <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
        <p>This document constitutes the entire agreement between you and CampSum Global Enterprises.</p>
        <p>Your continued use of the Platform signifies acceptance of these Terms.</p>
      </footer>
    </div>
  );
};

export default TermsOfService;