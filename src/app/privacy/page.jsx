import { promises as fs } from 'fs';
import path from 'path';

export const metadata = {
  title: 'Privacy Policy - MeasureMint',
  description: 'Privacy Policy for MeasureMint Miro App',
};

export default async function PrivacyPolicy() {
  const filePath = path.join(process.cwd(), 'privacy-policy.html');
  const htmlContent = await fs.readFile(filePath, 'utf8');
  
  // Extract the body content from the HTML
  const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const content = bodyMatch ? bodyMatch[1] : htmlContent;
  
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .privacy-terms-container {
            max-width: 900px;
            margin: 0 auto;
            padding: 40px 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          
          .privacy-terms-container h1 {
            font-size: 2.5em;
            margin-bottom: 0.5em;
            color: #1a1a1a;
          }
          
          .privacy-terms-container h2 {
            font-size: 1.8em;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
            color: #2a2a2a;
          }
          
          .privacy-terms-container h3 {
            font-size: 1.4em;
            margin-top: 1.2em;
            margin-bottom: 0.4em;
            color: #3a3a3a;
          }
          
          .privacy-terms-container p {
            margin-bottom: 1em;
          }
          
          .privacy-terms-container ul {
            margin-bottom: 1em;
            padding-left: 2em;
          }
          
          .privacy-terms-container li {
            margin-bottom: 0.5em;
          }
          
          .privacy-terms-container a {
            color: #0066cc;
            text-decoration: none;
          }
          
          .privacy-terms-container a:hover {
            text-decoration: underline;
          }
          
          @media (max-width: 768px) {
            .privacy-terms-container {
              padding: 20px 15px;
            }
            
            .privacy-terms-container h1 {
              font-size: 2em;
            }
            
            .privacy-terms-container h2 {
              font-size: 1.5em;
            }
          }
        `
      }} />
      <div className="privacy-terms-container">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </>
  );
}
