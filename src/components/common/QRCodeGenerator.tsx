"use client";

import React from 'react';
import QRCode from 'react-qr-code';

interface QRCodeGeneratorProps {
  sessionId: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ sessionId }) => {
  if (!sessionId) {
    return null;
  }

  return (
    <div style={{ background: 'white', padding: '16px' }}>
      <QRCode value={sessionId} />
    </div>
  );
};

export default QRCodeGenerator;