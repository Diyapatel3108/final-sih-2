"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const BarcodeScanner = dynamic(() => import("react-qr-barcode-scanner"), { ssr: false });

interface QRCodeScannerProps {
  onScan: (data: string) => void;
}

const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onScan }) => {
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <BarcodeScanner
        width={500}
        height={500}
        onUpdate={(err, result) => {
          if (result) {
            onScan(result.getText());
          }
        }}
        onError={(err) => {
          if (err) {
            if (typeof err === 'string') {
              setError(err);
            } else {
              setError(err.message);
            }
          }
        }}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default QRCodeScanner;