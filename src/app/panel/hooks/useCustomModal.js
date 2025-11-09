/**
 * Custom hook for managing modal state (replaces browser alerts/confirms)
 */

import { useState } from 'react';

export function useCustomModal() {
  const [customModal, setCustomModal] = useState({
    show: false,
    title: '',
    message: '',
    type: 'alert', // 'alert' or 'confirm'
    onConfirm: null,
    onCancel: null
  });

  const showAlert = (message, title = 'MeasureMint') => {
    return new Promise((resolve) => {
      setCustomModal({
        show: true,
        title,
        message,
        type: 'alert',
        onConfirm: () => {
          setCustomModal(prev => ({ ...prev, show: false }));
          resolve();
        },
        onCancel: null
      });
    });
  };

  const showConfirm = (message, title = 'MeasureMint') => {
    return new Promise((resolve) => {
      setCustomModal({
        show: true,
        title,
        message,
        type: 'confirm',
        onConfirm: () => {
          setCustomModal(prev => ({ ...prev, show: false }));
          resolve(true);
        },
        onCancel: () => {
          setCustomModal(prev => ({ ...prev, show: false }));
          resolve(false);
        }
      });
    });
  };

  return {
    customModal,
    showAlert,
    showConfirm
  };
}

