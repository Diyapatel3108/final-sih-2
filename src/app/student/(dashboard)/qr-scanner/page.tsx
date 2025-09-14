
"use client";

import { useState, Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/components/layout/AuthContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Input } from '@/components/ui/input';

const QrScanner = dynamic(() => import('react-qr-scanner'), { ssr: false }) as React.ComponentType<any>;

const QRScannerComponent = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [scannerActive, setScannerActive] = useState(false);
  const { user } = useAuth();

  const handleScan = async (result: { text: string } | null) => {
    if (result) {
      try {
        setScannerActive(false);
        const token = result.text;
        
        const response = await fetch(
          `/api/attendance/verify?token=${encodeURIComponent(token)}&studentId=${user?.id}`,
          { method: 'GET' }
        );
        
        const data = await response.json();
        
        if (response.ok) {
          setSuccess(true);
          setError('');
        } else {
          setError(data.error || 'Attendance verification failed');
        }
      } catch (err) {
        console.error('Error verifying attendance:', err);
        setError('Failed to verify attendance. Please try again.');
      }
    }
  };

  const handleError = (error: any) => {
    console.error('QR Scanner error:', error);
    if (error.name === 'NotAllowedError') {
      setError('Camera permission denied. Please allow camera access.');
    } else if (error.name === 'NotFoundError') {
      setError('No camera found on this device.');
    } else {
      setError('Error accessing camera: ' + error.message);
    }
  };

  const startScanner = () => {
    setError('');
    setSuccess(false);
    setScannerActive(true);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-muted/40 p-4 sm:p-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Mark Attendance</CardTitle>
          <CardDescription>Scan the QR code from your teacher.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          {error && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
          {success && <Alert variant="default"><AlertTitle>Success</AlertTitle><AlertDescription>Attendance recorded successfully!</AlertDescription></Alert>}
          
          {!scannerActive ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <Camera className="w-16 h-16 text-muted-foreground" />
              <Button onClick={startScanner}>Start Scanner</Button>
            </div>
          ) : (
            <div className="w-full aspect-square bg-secondary rounded-lg flex items-center justify-center border-2 border-dashed overflow-hidden">
              <QrScanner
                onScan={handleScan}
                onError={handleError}
                constraints={{ video: { facingMode: 'environment' } }}
                style={{ width: '100%' }}
              />
              <Button onClick={() => setScannerActive(false)} className="mt-4">Stop Scanner</Button>
            </div>
          )}
           <Button variant="outline" asChild className="w-full">
            <Link href="/student/dashboard"><ArrowLeft className="mr-2 h-4 w-4" />Back to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default function QrScannerPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QRScannerComponent />
    </Suspense>
  );
}
