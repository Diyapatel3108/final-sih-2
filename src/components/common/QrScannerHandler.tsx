"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function QrScannerHandler({ handleToken }: { handleToken: (token: string) => void }) {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      handleToken(token);
    }
  }, [token, handleToken]);

  return null;
}