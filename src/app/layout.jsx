import React from 'react'; 
import Script from 'next/script'; 
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Noto_Sans_Arabic } from 'next/font/google';

import { MiroSDKInit } from '../components/SDKInit'; 
import './globals.css';

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans-arabic',
  display: 'swap',
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});

export const metadata = {
  title: 'MeasureMint - Make Exact Measurements on Miro',
  description: 'Professional measurement and calibration tool for architects, engineers, and construction professionals. Set scale once, measure anything with precision on Miro.',
}

export default function RootLayout({ children }) {
    return ( <html lang="en" className={notoSansArabic.variable}> 
      <body> 
        <Script  src="https://miro.com/app/static/sdk/v2/miro.js"  strategy="beforeInteractive" /> 
        <MiroSDKInit /> 
        {children}
        <Analytics />
        <SpeedInsights />
        
        {/* Microsoft Clarity - Heatmap and Session Recording */}
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <Script id="clarity-script" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
            `}
          </Script>
        )}
      </body> 
    </html> ); 
} 
