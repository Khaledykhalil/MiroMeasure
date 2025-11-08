import React from 'react'; 
import Script from 'next/script'; 
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { MiroSDKInit } from '../components/SDKInit'; 
import './globals.css';

export const metadata = {
  title: 'MeasureMint - Make Exact Measurements on Miro',
  description: 'Professional measurement and calibration tool for architects, engineers, and construction professionals. Set scale once, measure anything with precision on Miro.',
}

export default function RootLayout({ children }) {
    return ( <html lang="en"> 
      <body> 
        <Script  src="https://miro.com/app/static/sdk/v2/miro.js"  strategy="beforeInteractive" /> 
        <MiroSDKInit /> 
        {children}
        <Analytics />
        <SpeedInsights />
      </body> 
    </html> ); 
} 
