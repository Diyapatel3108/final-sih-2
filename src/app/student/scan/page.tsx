
"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader, QrCode } from 'lucide-react';

// A wrapper component to allow use of useSearchParams
function ScanPageComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const studentId = 'student123'; // In a real app, this would come from user auth

  const [passkey, setPasskey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(!!token); // Only load if a token is present

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const verifyTokenAndGetPasskey = async () => {
      setLoading(true);
      setError(null);
      setPasskey(null);
      try {
        const response = await fetch(`/api/auth/token?token=${token}&studentId=${studentId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to verify token');
        }

        setPasskey(data.passkey);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    verifyTokenAndGetPasskey();
  }, [token, studentId]);

  const handleScanNew = () => {
    router.push('/student/scan');
  };

  let content;
  if (loading) {
    content = (
      <div className="flex flex-col items-center justify-center space-y-4">
        <Loader className="w-12 h-12 animate-spin text-primary" />
        <p className="text-muted-foreground">Verifying your QR code...</p>
      </div>
    );
  } else if (error) {
    content = (
      <div className="flex flex-col items-center justify-center space-y-4 text-destructive">
        <XCircle className="w-12 h-12" />
        <p className="font-semibold">Scan Failed</p>
        <p className="text-sm text-center">{error}.<br />This QR code may be expired or invalid.</p>
        <Button variant="default" onClick={handleScanNew}>Scan New Code</Button>
      </div>
    );
  } else if (passkey) {
    content = (
      <div className="flex flex-col items-center justify-center space-y-4 text-green-600">
        <CheckCircle className="w-12 h-12" />
        <p className="font-semibold">Success!</p>
        <p className="text-lg">Your passkey is:</p>
        <div className="p-4 bg-primary/10 border-2 border-dashed border-primary/50 rounded-lg">
          <p className="text-4xl font-bold tracking-widest text-primary">{passkey}</p>
        </div>
      </div>
    );
  } else {
    content = (
      <div className="flex flex-col items-center justify-center space-y-4">
        <QrCode className="w-12 h-12 text-muted-foreground" />
        <p className="text-muted-foreground">Ready to scan a new QR code.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Attendance Passkey</CardTitle>
          <CardDescription>Scan the QR code presented by your teacher.</CardDescription>
        </CardHeader>
        <CardContent className="text-center min-h-[180px] flex items-center justify-center">
          {content}
        </CardContent>
      </Card>
    </div>
  );
}

// Wrap the component in Suspense as required by Next.js when using useSearchParams
export default function ScanQRPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ScanPageComponent />
        </Suspense>
    )
}
