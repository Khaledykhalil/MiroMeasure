'use client';

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

export function ClarityInit() {
  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_CLARITY_ID;
    
    if (!projectId) {
      console.warn('Clarity: NEXT_PUBLIC_CLARITY_ID not set');
      return;
    }

    try {
      Clarity.init(projectId);
      
      // Check if Clarity loaded after a short delay
      setTimeout(() => {
        if (typeof window !== 'undefined' && window.clarity) {
          console.log('Clarity: Successfully initialized');
        } else {
          console.warn('Clarity: Script may be blocked by ad blocker or CSP');
        }
      }, 2000);
    } catch (error) {
      console.error('Clarity: Initialization error', error);
    }
  }, []);

  return null;
}

