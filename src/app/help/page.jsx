export const metadata = {
  title: 'Help Center - MeasureMint',
  description: 'MeasureMint Help Center - Guides, FAQ, and Support',
};

export default function HelpCenter() {
  // Render help center directly in JSX for better Next.js compatibility
  const htmlContent = `
    <h1>📚 MeasureMint Help Center</h1>
    <p>Welcome to the MeasureMint Help Center! Find quick answers, tutorials, and troubleshooting tips.</p>
    
    <h2>🚀 Quick Start (30 seconds)</h2>
    <ol>
      <li><strong>Open the app</strong> in your Miro board (click the Apps panel, search "MeasureMint")</li>
      <li><strong>Set calibration</strong> - Click a known distance on your image and enter its actual measurement</li>
      <li><strong>Start measuring</strong> - Click two points anywhere to measure distance</li>
      <li><strong>Done!</strong> Switch units anytime, measurements update automatically</li>
    </ol>
    
    <h2>📖 Documentation</h2>
    <p>For comprehensive documentation, see our <a href="https://github.com/measuremint/MeasureMint/blob/main/docs/USER_GUIDE.md" target="_blank">User Guide</a></p>
    
    <h2>❓ Frequently Asked Questions</h2>
    
    <h3>General Questions</h3>
    <p><strong>Q: Do I need to select an image before measuring?</strong><br/>
    A: No! MeasureMint works anywhere on your Miro board. Just calibrate and measure.</p>
    
    <p><strong>Q: Can multiple people use the same calibration?</strong><br/>
    A: Yes! Once calibrated, anyone on the board can take measurements using that calibration.</p>
    
    <p><strong>Q: Do measurements save with the board?</strong><br/>
    A: Yes! Measurement lines and captions are standard Miro elements that save automatically.</p>
    
    <h3>Calibration Questions</h3>
    <p><strong>Q: How accurate is MeasureMint?</strong><br/>
    A: Accuracy depends on your calibration. With accurate calibration and high-quality images, measurements are typically within 1-2% of actual dimensions.</p>
    
    <p><strong>Q: Do I need to recalibrate for each measurement?</strong><br/>
    A: No! Calibrate once per image/scale. All measurements use that calibration.</p>
    
    <h3>Measurement Questions</h3>
    <p><strong>Q: Can I change units after measuring?</strong><br/>
    A: Absolutely! Switch units anytime - all measurements update automatically.</p>
    
    <p><strong>Q: Can I measure curved lines?</strong><br/>
    A: Yes! Use Multi-Point Distance and click points along the curve.</p>
    
    <h2>🔧 Troubleshooting</h2>
    
    <h3>Calibration Issues</h3>
    <p><strong>Problem:</strong> "Calibration failed" error</p>
    <ul>
      <li>Ensure you clicked two different points</li>
      <li>Make sure you entered a valid number</li>
      <li>Check that the known distance is not zero</li>
      <li>Try drawing a new calibration line</li>
    </ul>
    
    <h3>Measurement Issues</h3>
    <p><strong>Problem:</strong> Can't create measurements</p>
    <ul>
      <li>Ensure calibration is set first</li>
      <li>Check that you're clicking on the board</li>
      <li>Zoom in for better precision</li>
      <li>Try clicking directly on the image</li>
    </ul>
    
    <h2>📧 Contact Support</h2>
    <p>Need more help? We're here for you!</p>
    
    <div style="background: #f1f5f9; border-radius: 8px; padding: 1.5em; margin: 1.5em 0;">
      <h3 style="margin-top: 0;">📧 Email Support</h3>
      <p><strong>Email:</strong> <a href="mailto:support@measuremint.app">support@measuremint.app</a></p>
      <p><strong>Response time:</strong> Within 24 hours (business days)</p>
      <p><strong>Best for:</strong> Technical issues, bug reports, feature requests</p>
    </div>
    
    <div style="background: #f1f5f9; border-radius: 8px; padding: 1.5em; margin: 1.5em 0;">
      <h3 style="margin-top: 0;">🐛 Report a Bug</h3>
      <p><strong>GitHub Issues:</strong> <a href="https://github.com/measuremint/MeasureMint/issues" target="_blank">github.com/measuremint/MeasureMint/issues</a></p>
      <p>Include: Browser, Miro plan, steps to reproduce, screenshots</p>
    </div>
    
    <h2>🌍 Supported Units</h2>
    <ul>
      <li><strong>Feet (ft)</strong> - US/Imperial</li>
      <li><strong>Inches (in)</strong> - US/Imperial</li>
      <li><strong>Meters (m)</strong> - Metric</li>
      <li><strong>Centimeters (cm)</strong> - Metric</li>
      <li><strong>Millimeters (mm)</strong> - Metric</li>
      <li><strong>Yards (yd)</strong> - US/Imperial</li>
      <li><strong>Miles (mi)</strong> - US/Imperial</li>
      <li><strong>Kilometers (km)</strong> - Metric</li>
    </ul>
    
    <h2>📚 Additional Resources</h2>
    <ul>
      <li><a href="https://github.com/measuremint/MeasureMint/blob/main/docs/USER_GUIDE.md" target="_blank">User Guide</a></li>
      <li><a href="https://github.com/measuremint/MeasureMint/blob/main/docs/TECHNICAL.md" target="_blank">Technical Documentation</a></li>
      <li><a href="https://github.com/measuremint/MeasureMint" target="_blank">GitHub Repository</a></li>
    </ul>
    
    <hr style="margin: 3em 0; border: none; border-top: 2px solid #e2e8f0;">
    
    <p style="text-align: center; color: #64748b;">
      <strong>Last Updated:</strong> November 3, 2025 &nbsp;|&nbsp; 
      <strong>Version:</strong> 2.0.0 &nbsp;|&nbsp; 
      <strong>Support:</strong> <a href="mailto:support@measuremint.app">support@measuremint.app</a>
    </p>
  `;
  
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          body {
            margin: 0;
            padding: 0;
            background: #f8fafc;
          }
          
          .help-center-container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 40px 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.7;
            color: #1e293b;
            background: white;
            min-height: 100vh;
          }
          
          .help-center-container h1 {
            font-size: 3em;
            margin-bottom: 0.3em;
            color: #0f172a;
            border-bottom: 3px solid #3b82f6;
            padding-bottom: 0.3em;
          }
          
          .help-center-container h2 {
            font-size: 2em;
            margin-top: 2em;
            margin-bottom: 0.7em;
            color: #1e293b;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 0.3em;
          }
          
          .help-center-container h3 {
            font-size: 1.5em;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
            color: #334155;
          }
          
          .help-center-container h4 {
            font-size: 1.2em;
            margin-top: 1.2em;
            margin-bottom: 0.5em;
            color: #475569;
            font-weight: 600;
          }
          
          .help-center-container p {
            margin-bottom: 1.2em;
            color: #475569;
          }
          
          .help-center-container ul, .help-center-container ol {
            margin-bottom: 1.2em;
            padding-left: 2em;
          }
          
          .help-center-container li {
            margin-bottom: 0.6em;
            color: #475569;
          }
          
          .help-center-container a {
            color: #3b82f6;
            text-decoration: none;
            border-bottom: 1px solid transparent;
            transition: border-color 0.2s;
          }
          
          .help-center-container a:hover {
            border-bottom-color: #3b82f6;
          }
          
          .help-center-container code {
            background: #f1f5f9;
            padding: 0.2em 0.4em;
            border-radius: 3px;
            font-size: 0.9em;
            color: #e11d48;
            font-family: 'Monaco', 'Courier New', monospace;
          }
          
          .help-center-container pre {
            background: #0f172a;
            color: #e2e8f0;
            padding: 1.5em;
            border-radius: 8px;
            overflow-x: auto;
            margin-bottom: 1.5em;
          }
          
          .help-center-container pre code {
            background: transparent;
            color: #e2e8f0;
            padding: 0;
          }
          
          .help-center-container blockquote {
            border-left: 4px solid #3b82f6;
            padding-left: 1.5em;
            margin-left: 0;
            color: #64748b;
            font-style: italic;
          }
          
          .help-center-container hr {
            border: none;
            border-top: 2px solid #e2e8f0;
            margin: 3em 0;
          }
          
          .help-center-container table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 1.5em;
          }
          
          .help-center-container th,
          .help-center-container td {
            border: 1px solid #e2e8f0;
            padding: 0.75em;
            text-align: left;
          }
          
          .help-center-container th {
            background: #f1f5f9;
            font-weight: 600;
            color: #1e293b;
          }
          
          .help-center-container strong {
            color: #0f172a;
            font-weight: 600;
          }
          
          /* Emoji styling */
          .help-center-container h2:has(+ hr),
          .help-center-container h1:first-child {
            display: flex;
            align-items: center;
            gap: 0.3em;
          }
          
          /* Back to top button */
          .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #3b82f6;
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
            transition: transform 0.2s, box-shadow 0.2s;
          }
          
          .back-to-top:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
          }
          
          /* Search box placeholder */
          .search-box {
            background: #f1f5f9;
            border: 2px solid #cbd5e1;
            border-radius: 8px;
            padding: 1em;
            margin-bottom: 2em;
            display: flex;
            align-items: center;
            gap: 0.5em;
          }
          
          .search-box::before {
            content: "🔍";
            font-size: 1.2em;
          }
          
          @media (max-width: 768px) {
            .help-center-container {
              padding: 20px 15px;
            }
            
            .help-center-container h1 {
              font-size: 2em;
            }
            
            .help-center-container h2 {
              font-size: 1.5em;
            }
            
            .help-center-container h3 {
              font-size: 1.3em;
            }
            
            .back-to-top {
              bottom: 20px;
              right: 20px;
              width: 40px;
              height: 40px;
            }
          }
        `
      }} />
      <div className="help-center-container">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        <a href="#" className="back-to-top" title="Back to top">↑</a>
      </div>
    </>
  );
}
