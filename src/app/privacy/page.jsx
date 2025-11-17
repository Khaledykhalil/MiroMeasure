import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: 'Privacy Policy - MeasureMint',
  description: 'Privacy Policy for MeasureMint - Professional Measurement Tool for Miro',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="border-b border-border">
        <div className="max-w-5xl mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/m%20%284%29-XzDzv9Zm6fNYs6Gi2fa9quAcZaLSof.png"
              alt="MeasureMint"
              width={40}
              height={40}
              className="transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-foreground">MeasureMint</span>
              <span className="text-[10px] tracking-widest text-muted-foreground uppercase">
                Professional Measurement Tool
              </span>
            </div>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/support" className="text-sm text-muted-foreground hover:text-foreground">
              Support
            </Link>
            <Link
              href="/waitlist"
              className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Join Waitlist
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 md:px-6 py-16 md:py-24">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4 text-foreground">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground">Effective Date: November 8, 2025 | Last Updated: November 8, 2025</p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Welcome to MeasureMint ("we," "our," or "us"). We are committed to protecting your privacy and ensuring 
              transparency about how we collect, use, and safeguard your information. This Privacy Policy explains our 
              practices regarding data collection when you use our measurement application for Miro boards.
            </p>
            <p className="text-muted-foreground leading-relaxed"><strong>Contact Information:</strong></p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li><strong>Company:</strong> MeasureMint</li>
              <li><strong>Website:</strong> <a href="https://measuremint.app" className="text-primary hover:underline">https://measuremint.app</a></li>
              <li><strong>Support Email:</strong> <a href="mailto:support@measuremint.app" className="text-primary hover:underline">support@measuremint.app</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">1. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-foreground">1.1 Information You Provide</h3>
            <p className="text-muted-foreground leading-relaxed mb-2"><strong>Miro Authentication:</strong></p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Miro user ID (for authentication and authorization)</li>
              <li>Miro board access permissions</li>
              <li>OAuth tokens (securely encrypted and stored)</li>
            </ul>

            <p className="text-muted-foreground leading-relaxed mb-2"><strong>Support Requests:</strong></p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Name and email address (when you contact support)</li>
              <li>Support inquiry details and correspondence</li>
              <li>Technical information about issues you report</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-foreground">1.2 Information Automatically Collected</h3>
            <p className="text-muted-foreground leading-relaxed mb-2"><strong>Usage Data:</strong></p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Measurement interactions (calibration points, distance measurements)</li>
              <li>Unit preferences (Imperial vs Metric)</li>
              <li>Feature usage patterns (anonymized)</li>
              <li>Application performance metrics</li>
            </ul>

            <p className="text-muted-foreground leading-relaxed mb-2"><strong>Technical Data:</strong></p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>IP address (anonymized for analytics)</li>
              <li>Device type</li>
              <li>Session duration</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-foreground">1.3 Information We Do NOT Collect</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>❌ We do not read, access, or store your Miro board content</li>
              <li>❌ We do not collect personal identification beyond what's required for authentication</li>
              <li>❌ We do not track you across other websites or applications</li>
              <li>❌ We do not sell or rent your personal information to third parties</li>
              <li>❌ We do not use cookies for advertising or tracking purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">2. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use the collected information for the following purposes:
            </p>

            <p className="text-muted-foreground leading-relaxed mb-2"><strong>Service Delivery:</strong></p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Authenticate your access to MeasureMint through Miro</li>
              <li>Save your measurement preferences and calibration settings</li>
              <li>Place measurement markers on your Miro boards</li>
              <li>Provide accurate distance calculations</li>
            </ul>

            <p className="text-muted-foreground leading-relaxed mb-2"><strong>Service Improvement:</strong></p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Analyze usage patterns to improve features</li>
              <li>Identify and fix technical issues</li>
              <li>Optimize application performance</li>
              <li>Develop new measurement tools</li>
            </ul>

            <p className="text-muted-foreground leading-relaxed mb-2"><strong>Communication:</strong></p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Respond to your support inquiries</li>
              <li>Send important service updates or security notices</li>
              <li>Notify you of new features (if you opt-in)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">3. Data Storage and Security</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-foreground">3.1 Where We Store Data</h3>
            <p className="text-muted-foreground leading-relaxed mb-2"><strong>OAuth Tokens:</strong></p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Stored in encrypted SQLite database on our secure servers</li>
              <li>Located in: United States (Vercel infrastructure)</li>
              <li>Encrypted at rest using AES-256 encryption</li>
            </ul>

            <p className="text-muted-foreground leading-relaxed mb-2"><strong>Measurement Data:</strong></p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Stored temporarily in browser session storage</li>
              <li>Calibration settings saved to Miro board metadata</li>
              <li>No permanent server-side storage of measurement data</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-foreground">3.2 Security Measures</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We implement industry-standard security practices:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>✅ <strong>Encryption in Transit:</strong> All data transmitted over HTTPS/TLS 1.3</li>
              <li>✅ <strong>Encryption at Rest:</strong> Sensitive data encrypted using AES-256</li>
              <li>✅ <strong>Access Controls:</strong> Limited access to production systems</li>
              <li>✅ <strong>Regular Updates:</strong> Security patches applied promptly</li>
              <li>✅ <strong>Secure Infrastructure:</strong> Hosted on Vercel with enterprise-grade security</li>
              <li>✅ <strong>No Plain Text Storage:</strong> Passwords and tokens never stored in plain text</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">4. Data Sharing and Disclosure</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-foreground">4.1 Third-Party Services</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use the following third-party services:
            </p>

            <div className="space-y-4 mb-4">
              <div>
                <p className="text-muted-foreground leading-relaxed"><strong>Miro Platform:</strong></p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li><strong>Purpose:</strong> Core app functionality, authentication, board access</li>
                  <li><strong>Data Shared:</strong> User ID, OAuth tokens, board IDs</li>
                  <li><strong>Privacy Policy:</strong> <a href="https://miro.com/legal/privacy-policy/" className="text-primary hover:underline">https://miro.com/legal/privacy-policy/</a></li>
                </ul>
              </div>

              <div>
                <p className="text-muted-foreground leading-relaxed"><strong>Vercel (Hosting):</strong></p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li><strong>Purpose:</strong> Application hosting and delivery</li>
                  <li><strong>Data Shared:</strong> Technical logs, performance metrics</li>
                  <li><strong>Privacy Policy:</strong> <a href="https://vercel.com/legal/privacy-policy" className="text-primary hover:underline">https://vercel.com/legal/privacy-policy</a></li>
                </ul>
              </div>

              <div>
                <p className="text-muted-foreground leading-relaxed"><strong>Resend (Email Delivery):</strong></p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li><strong>Purpose:</strong> Support email delivery</li>
                  <li><strong>Data Shared:</strong> Name, email address, support inquiry content</li>
                  <li><strong>Privacy Policy:</strong> <a href="https://resend.com/legal/privacy-policy" className="text-primary hover:underline">https://resend.com/legal/privacy-policy</a></li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-foreground">4.2 When We May Disclose Information</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may disclose your information only in these limited circumstances:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>With Your Consent:</strong> When you explicitly authorize us to share data</li>
              <li><strong>Legal Requirements:</strong> To comply with court orders, subpoenas, or legal processes</li>
              <li><strong>Safety and Security:</strong> To protect rights, property, or safety of MeasureMint, users, or public</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets (you will be notified)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">5. Data Retention</h2>
            <div className="space-y-4">
              <div>
                <p className="text-muted-foreground leading-relaxed mb-2"><strong>OAuth Tokens:</strong></p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Retained while you have an active session</li>
                  <li>Automatically deleted when you revoke access in Miro</li>
                  <li>Deleted upon your request</li>
                </ul>
              </div>

              <div>
                <p className="text-muted-foreground leading-relaxed mb-2"><strong>Measurement Data:</strong></p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Calibration settings stored in Miro board metadata (under your control)</li>
                  <li>Session data cleared when you close your browser</li>
                  <li>No long-term server-side retention</li>
                </ul>
              </div>

              <div>
                <p className="text-muted-foreground leading-relaxed mb-2"><strong>Support Correspondence:</strong></p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Retained for 2 years for customer service purposes</li>
                  <li>Deleted upon request (subject to legal obligations)</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">6. Your Rights and Choices</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You have the following rights regarding your personal information:
            </p>

            <h3 className="text-xl font-semibold mb-3 text-foreground">6.1 Access and Portability</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
              <li><strong>Right to Portability:</strong> Receive your data in a structured, machine-readable format</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-foreground">6.2 Correction and Deletion</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
              <li><strong>Right to Revoke:</strong> Revoke Miro OAuth access at any time</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-foreground">6.3 How to Exercise Your Rights</h3>
            <p className="text-muted-foreground leading-relaxed mb-2">
              To exercise any of these rights, contact us at:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Email:</strong> <a href="mailto:support@measuremint.app" className="text-primary hover:underline">support@measuremint.app</a></li>
              <li><strong>Subject Line:</strong> "Privacy Rights Request"</li>
              <li><strong>Response Time:</strong> Within 30 days</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">7. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              MeasureMint is not intended for use by children under the age of 13 (or 16 in the European Economic Area). 
              We do not knowingly collect personal information from children. If you believe we have collected information 
              from a child, please contact us immediately at <a href="mailto:support@measuremint.app" className="text-primary hover:underline">support@measuremint.app</a>, 
              and we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">8. International Data Transfers</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              MeasureMint is operated from the United States. If you access our service from outside the United States, 
              your information may be transferred to, stored, and processed in the United States.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-2"><strong>For EU/EEA Users:</strong></p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>We comply with applicable data protection laws</li>
              <li>Data transfers use appropriate safeguards (Standard Contractual Clauses)</li>
              <li>You have rights under GDPR (see Section 6)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">9. California Privacy Rights (CCPA)</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you are a California resident, you have additional rights:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li><strong>Right to Know:</strong> What personal information we collect, use, and share</li>
              <li><strong>Right to Delete:</strong> Request deletion of your personal information</li>
              <li><strong>Right to Opt-Out:</strong> Opt-out of sale of personal information (Note: We do not sell personal information)</li>
              <li><strong>Right to Non-Discrimination:</strong> Equal service regardless of privacy rights exercise</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              <strong>To Exercise California Rights:</strong> Email <a href="mailto:support@measuremint.app" className="text-primary hover:underline">support@measuremint.app</a> with 
              "California Privacy Rights Request" in the subject line.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">10. EU/UK Privacy Rights (GDPR)</h2>
            <p className="text-muted-foreground leading-relaxed mb-2"><strong>Legal Basis for Processing:</strong></p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li><strong>Consent:</strong> For optional features and communications</li>
              <li><strong>Contract Performance:</strong> To provide the MeasureMint service</li>
              <li><strong>Legitimate Interests:</strong> Service improvement, security, analytics</li>
              <li><strong>Legal Obligation:</strong> Compliance with applicable laws</li>
            </ul>

            <p className="text-muted-foreground leading-relaxed mb-2"><strong>Additional GDPR Rights:</strong></p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Right to lodge a complaint with your supervisory authority</li>
              <li>Right to withdraw consent at any time</li>
              <li>Right to data portability in machine-readable format</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">11. Cookies and Tracking</h2>
            <p className="text-muted-foreground leading-relaxed mb-2"><strong>Essential Cookies:</strong></p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Session authentication (required for service)</li>
              <li>User preferences (unit settings, UI state)</li>
            </ul>

            <p className="text-muted-foreground leading-relaxed mb-2"><strong>Analytics (Optional):</strong></p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Vercel Analytics: Privacy-friendly, cookieless analytics</li>
              <li>No cross-site tracking or advertising cookies</li>
            </ul>

            <p className="text-muted-foreground leading-relaxed">
              <strong>Your Control:</strong> You can disable cookies in your browser settings. Disabling cookies may limit functionality.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">12. Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may update this Privacy Policy periodically to reflect changes in our practices, legal or regulatory 
              requirements, or new features. When we make significant changes, we will notify you via email (if you've 
              provided contact information) or through a prominent notice in the application.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Continued use of MeasureMint after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">13. Security Incident Response</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              In the unlikely event of a data breach:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>We will notify affected users within 72 hours</li>
              <li>We will provide details about the incident and affected data</li>
              <li>We will outline steps taken to prevent future incidents</li>
              <li>We will comply with applicable breach notification laws</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">14. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have questions, concerns, or requests regarding this Privacy Policy:
            </p>
            <p className="text-muted-foreground leading-relaxed mb-2">
              <strong>Email:</strong> <a href="mailto:support@measuremint.app" className="text-primary hover:underline">support@measuremint.app</a><br />
              <strong>Subject:</strong> Privacy Policy Inquiry<br />
              <strong>Website:</strong> <a href="https://measuremint.app/privacy" className="text-primary hover:underline">https://measuremint.app/privacy</a><br />
              <strong>Response Time:</strong> We aim to respond within 3-5 business days
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">15. Acknowledgment</h2>
            <p className="text-muted-foreground leading-relaxed">
              By using MeasureMint, you acknowledge that you have read and understood this Privacy Policy and agree to 
              its terms. If you do not agree, please do not use our service.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              <strong>Version:</strong> 1.0<br />
              <strong>Effective Date:</strong> November 8, 2025<br />
              <strong>Last Reviewed:</strong> November 8, 2025
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-16 pt-8 border-t border-border">
          <Link href="/" className="text-primary hover:underline text-lg">
            ← Back to Home
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="max-w-5xl mx-auto px-5 md:px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2025 MeasureMint. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/support" className="text-sm text-muted-foreground hover:text-foreground">
                Support
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
