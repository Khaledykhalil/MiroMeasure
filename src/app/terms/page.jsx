import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: 'Terms of Service - MeasureMint',
  description: 'Terms of Service for MeasureMint - Professional Measurement Tool for Miro',
};

export default function TermsOfService() {
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
              href="/panel"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Launch App
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 md:px-6 py-16 md:py-24">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4 text-foreground">Terms of Service</h1>
          <p className="text-lg text-muted-foreground">Effective Date: November 8, 2025 | Last Updated: November 8, 2025</p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">Agreement to Terms</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              By accessing or using MeasureMint ("the Service," "our App"), you agree to be bound by these Terms of Service 
              ("Terms"). If you do not agree to these Terms, do not use the Service.
            </p>
            <p className="text-muted-foreground leading-relaxed"><strong>Contact Information:</strong></p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li><strong>Website:</strong> <a href="https://measuremint.app" className="text-primary hover:underline">https://measuremint.app</a></li>
              <li><strong>Support:</strong> <a href="mailto:support@measuremint.app" className="text-primary hover:underline">support@measuremint.app</a></li>
              <li><strong>Developer:</strong> Khaled Khalil</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">1. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              MeasureMint is a professional measurement and calibration tool designed for use within Miro boards. The Service provides:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Precise scale calibration for technical drawings</li>
              <li>Distance measurement tools</li>
              <li>Imperial and Metric unit support (8 unit types)</li>
              <li>Visual measurement markers on Miro boards</li>
              <li>Measurement history and unit conversion tables</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">2. Eligibility</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">To use MeasureMint, you must:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Be at least 13 years of age (or 16 in the European Economic Area)</li>
              <li>Have a valid Miro account</li>
              <li>Have the legal authority to enter into these Terms</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">3. License and Access</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-foreground">3.1 License Grant</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Access and use MeasureMint through your Miro account</li>
              <li>Use the measurement tools for your personal or business purposes</li>
              <li>Place measurement markers on your own Miro boards</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-foreground">3.2 Restrictions</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">You agree NOT to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>❌ Modify, reverse engineer, or decompile the Service</li>
              <li>❌ Remove copyright or proprietary notices</li>
              <li>❌ Use the Service for illegal or unauthorized purposes</li>
              <li>❌ Violate any applicable laws or regulations</li>
              <li>❌ Interfere with or disrupt the Service</li>
              <li>❌ Attempt to gain unauthorized access to systems or data</li>
              <li>❌ Use automated tools to access the Service (bots, scrapers)</li>
              <li>❌ Resell or redistribute the Service without permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">4. Intellectual Property</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-foreground">4.1 Our Rights</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              All rights, title, and interest in MeasureMint, including:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Source code, algorithms, and architecture</li>
              <li>Design, interface, and user experience</li>
              <li>Trademarks, logos, and branding</li>
              <li>Documentation and help materials</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Are owned by Khaled Khalil / MeasureMint and protected by copyright, trademark, and other intellectual property laws.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-foreground mt-6">4.2 Your Content</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You retain all rights to your Miro boards and content. By using MeasureMint, you grant us permission to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Access your Miro boards (only to provide measurement functionality)</li>
              <li>Place measurement markers and annotations on your boards</li>
              <li>Store calibration settings associated with your boards</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              We do not claim ownership of your board content or measurements.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">5. Privacy and Data Protection</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Your privacy is important to us. Our collection and use of your information is governed by our Privacy Policy, 
              available at:
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <a href="https://measuremint.app/privacy" className="text-primary hover:underline font-semibold">https://measuremint.app/privacy</a>
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By using the Service, you also agree to our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">6. Account and Security</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-foreground">6.1 Miro Authentication</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              MeasureMint uses Miro's OAuth authentication. You are responsible for:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Maintaining the security of your Miro account</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us of unauthorized access</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-foreground">6.2 Account Termination</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You may terminate your use of MeasureMint at any time by:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Revoking OAuth access in your Miro account settings</li>
              <li>Uninstalling the app from your Miro workspace</li>
              <li>Contacting <a href="mailto:support@measuremint.app" className="text-primary hover:underline">support@measuremint.app</a></li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              We may suspend or terminate your access if you violate these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">7. Service Availability</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-foreground">7.1 Uptime and Maintenance</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We strive to provide reliable service but cannot guarantee:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Uninterrupted or error-free operation</li>
              <li>Specific uptime percentages</li>
              <li>Compatibility with all devices or browsers</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              We may perform maintenance, updates, or improvements that temporarily interrupt service.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-foreground mt-6">7.2 Service Modifications</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">We reserve the right to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Modify, suspend, or discontinue features</li>
              <li>Update the Service for improvements or security</li>
              <li>Change pricing or features (with notice)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">8. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.</strong>
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We disclaim all warranties, including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Merchantability or fitness for a particular purpose</li>
              <li>Accuracy or reliability of measurements</li>
              <li>Non-infringement of third-party rights</li>
              <li>That the Service will meet your requirements</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              <strong>Professional Use:</strong> While MeasureMint is designed for professional use by architects, engineers, 
              and construction professionals, you are responsible for verifying all measurements independently for critical applications.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">9. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</strong>
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">We shall not be liable for:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Indirect, incidental, special, consequential, or punitive damages</li>
              <li>Loss of profits, revenue, data, or business opportunities</li>
              <li>Damages arising from measurement errors or miscalculations</li>
              <li>Service interruptions or data loss</li>
              <li>Third-party actions or Miro platform issues</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong>Maximum Liability:</strong> Our total liability shall not exceed the amount you paid for the Service 
              in the 12 months preceding the claim (or $100 if the Service was free).
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong>Exceptions:</strong> Some jurisdictions do not allow limitation of liability for personal injury or 
              certain warranties, so these limitations may not apply to you.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">10. Indemnification</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You agree to indemnify, defend, and hold harmless MeasureMint, its developers, and affiliates from any claims, 
              damages, losses, or expenses (including attorney fees) arising from:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Your use or misuse of the Service</li>
              <li>Violation of these Terms</li>
              <li>Violation of any rights of third parties</li>
              <li>Your Miro board content</li>
              <li>Misuse of measurements for critical applications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">11. User Conduct</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You agree to use MeasureMint responsibly and professionally. Prohibited conduct includes:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Uploading malicious code or viruses</li>
              <li>Harassing or abusing other users or support staff</li>
              <li>Making false or misleading support claims</li>
              <li>Attempting to circumvent security measures</li>
              <li>Using the Service for fraudulent purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">12. Third-Party Services</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-foreground">12.1 Miro Integration</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              MeasureMint operates within the Miro platform. Your use is also subject to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Miro's Terms of Service: <a href="https://miro.com/legal/terms-of-service/" className="text-primary hover:underline">https://miro.com/legal/terms-of-service/</a></li>
              <li>Miro's Privacy Policy: <a href="https://miro.com/legal/privacy-policy/" className="text-primary hover:underline">https://miro.com/legal/privacy-policy/</a></li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-foreground">12.2 External Links</h3>
            <p className="text-muted-foreground leading-relaxed">
              The Service may contain links to third-party websites. We are not responsible for their content, privacy practices, or terms.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">13. Payment and Pricing</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-foreground">13.1 Current Pricing</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              MeasureMint is currently offered free of charge. We reserve the right to introduce paid features or 
              subscriptions in the future with:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>At least 30 days advance notice</li>
              <li>Option to continue using free features (if available)</li>
              <li>Grandfathered pricing for early users (at our discretion)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-foreground">13.2 Future Paid Features</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">If we introduce paid features:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Pricing will be displayed clearly before purchase</li>
              <li>Payments processed through secure third-party processors</li>
              <li>Refund policy will be provided at time of purchase</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">14. Dispute Resolution</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-foreground">14.1 Informal Resolution</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Before filing a legal claim, you agree to contact us at <a href="mailto:support@measuremint.app" className="text-primary hover:underline">support@measuremint.app</a> to 
              resolve the dispute informally. We will attempt to resolve within 60 days.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-foreground">14.2 Class Action Waiver</h3>
            <p className="text-muted-foreground leading-relaxed">
              You agree to bring claims individually, not as part of class action, collective action, or representative proceeding.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">15. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may modify these Terms at any time. When we do:
            </p>
            <p className="text-muted-foreground leading-relaxed mb-2"><strong>Notice:</strong></p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Updated "Last Updated" date at the top</li>
              <li>Email notification (if you've provided contact info)</li>
              <li>Prominent in-app notification for material changes</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              <strong>Your Acceptance:</strong> Continued use after changes constitutes acceptance. If you disagree with 
              changes, please discontinue use and contact us.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">16. Termination</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-foreground">16.1 By You</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">You may terminate at any time by:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Uninstalling MeasureMint from Miro</li>
              <li>Revoking OAuth access</li>
              <li>Ceasing to use the Service</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-foreground">16.2 By Us</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">We may suspend or terminate your access if you:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Violate these Terms</li>
              <li>Engage in fraudulent or illegal activity</li>
              <li>Abuse the Service or harm other users</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-foreground">16.3 Effect of Termination</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">Upon termination:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Your license to use MeasureMint ends immediately</li>
              <li>We will delete your OAuth tokens</li>
              <li>Measurement data on your Miro boards remains under your control</li>
              <li>Sections that survive termination: IP rights, disclaimers, limitations of liability, dispute resolution</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">17. Contact and Legal Notices</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong>For Questions About These Terms:</strong>
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong>Email:</strong> <a href="mailto:support@measuremint.app" className="text-primary hover:underline">support@measuremint.app</a><br />
              <strong>Subject:</strong> Terms of Service Inquiry<br />
              <strong>Response time:</strong> 3-5 business days
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong>For Copyright Claims (DMCA):</strong> Contact <a href="mailto:support@measuremint.app" className="text-primary hover:underline">support@measuremint.app</a> with 
              subject "DMCA Takedown Request"
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">18. Acknowledgment</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              BY USING MEASUREMINT, YOU ACKNOWLEDGE THAT:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>✅ You have read and understood these Terms</li>
              <li>✅ You agree to be bound by these Terms</li>
              <li>✅ You have read our Privacy Policy</li>
              <li>✅ You are authorized to use the Service</li>
              <li>✅ You will use the Service responsibly and professionally</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              If you do not agree to these Terms, do not use MeasureMint.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              <strong>Version:</strong> 1.0<br />
              <strong>Effective Date:</strong> November 8, 2025<br />
              <strong>Last Reviewed:</strong> November 8, 2025
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              © 2025 MeasureMint. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              <strong>Questions?</strong> Contact <a href="mailto:support@measuremint.app" className="text-primary hover:underline">support@measuremint.app</a>
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
