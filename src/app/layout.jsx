import React from 'react'; 
import Script from 'next/script'; 
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Noto_Sans_Arabic, Noto_Sans_JP, Noto_Sans_SC, Noto_Sans_TC, Noto_Sans_KR } from 'next/font/google';

import { MiroSDKInit } from '../components/SDKInit'; 
import { ClarityInit } from '../components/ClarityInit';
import './globals.css';

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans-arabic',
  display: 'swap',
  fallback: ['Arial Unicode MS', 'Tahoma', 'Geeza Pro', 'Arabic Typesetting', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
  preload: true,
  fallback: ['Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', 'Meiryo', 'MS PGothic', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans-sc',
  display: 'swap',
  preload: true,
  fallback: ['Hiragino Sans GB', 'Microsoft YaHei', 'SimHei', 'SimSun', 'STHeiti', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans-tc',
  display: 'swap',
  preload: true,
  fallback: ['Microsoft JhengHei', 'PMingLiU', 'Apple LiGothic', 'Apple LiSung', 'STHeiti', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans-kr',
  display: 'swap',
  preload: true,
  fallback: ['Nanum Gothic', 'Malgun Gothic', 'Apple SD Gothic Neo', 'AppleGothic', 'Gulim', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});

export const metadata = {
  title: 'MeasureMint - Make Exact Measurements on Miro',
  description: 'Professional measurement and calibration tool for architects, engineers, and construction professionals. Set scale once, measure anything with precision on Miro.',
}

export default function RootLayout({ children }) {
    return ( <html lang="en" className={`${notoSansArabic.variable} ${notoSansJP.variable} ${notoSansSC.variable} ${notoSansTC.variable} ${notoSansKR.variable}`}> 
      <body> 
        <Script  src="https://miro.com/app/static/sdk/v2/miro.js"  strategy="beforeInteractive" /> 
        <MiroSDKInit /> 
        {children}
        <Analytics />
        <SpeedInsights />
        <ClarityInit />
      </body> 
    </html> ); 
} 
