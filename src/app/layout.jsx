import React from 'react'; 
import Script from 'next/script'; 
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { MiroSDKInit } from '../components/SDKInit'; 

export default function RootLayout({ children }) {
    return ( <html> 
      <body> 
        <Script  src="https://miro.com/app/static/sdk/v2/miro.js"  strategy="beforeInteractive" /> 
        <MiroSDKInit /> 
        {children}
        <Analytics />
        <SpeedInsights />
      </body> 
    </html> ); 
} 
