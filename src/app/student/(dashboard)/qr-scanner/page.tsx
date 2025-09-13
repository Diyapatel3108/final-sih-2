
"use client";

import { useState, useEffect, useCallback, Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/components/layout/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import QrScanner from 'react-qr-scanner';
import QrScannerHandler from '@/components/common/QrScannerHandler';
import Link from 'next/link';
import { Input } from '@/components/ui/input';

type ScanStatus = 'idle' | 'scanning' | 'processing' | 'success' | 'failure';

export default function QrScannerPage() {
  const [status, setStatus] = useState<ScanStatus>('idle');
  const [passkeyValue, setPasskeyValue] = useState('');
  const { toast } = useToast();

  const { user, loading } = useAuth();
  const handleScannedToken = useCallback(async (token: string) => {
    setStatus('processing');

    if (!user) {
        setStatus('failure');
        toast({ variant: 'destructive', title: 'Not Authenticated', description: 'You must be logged in to mark attendance.' });
        return;
    }

    try {
      const response = await fetch(`/api/attendance/verify?token=${token}&studentId=${user.id}`);
      if (response.ok) {
        setStatus('success');
        toast({ title: "Success!", description: "Attendance marked. You may be asked for a passkey." });
      } else {
        const data = await response.json();
        setStatus('failure');
        toast({ variant: 'destructive', title: 'Verification Failed', description: data.error || 'Please try again.' });
      }
    } catch (error) {
      setStatus('failure');
      toast({ variant: 'destructive', title: 'Network Error', description: 'Could not connect to the server.' });
    }
  }, [user, toast]);



  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-muted/40 p-4 sm:p-8">
      <Suspense fallback={<div>Loading...</div>}>
        <QrScannerHandler handleToken={handleScannedToken} />
      </Suspense>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Mark Attendance</CardTitle>
          <CardDescription>Scan the QR code from your teacher.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <div className="w-full aspect-square bg-secondary rounded-lg flex items-center justify-center border-2 border-dashed overflow-hidden">
            {status === 'scanning' ? (
              <QrScanner
                delay={300}
                onError={(error: any) => {
                  console.error(error);
                  toast({ variant: 'destructive', title: 'Scanner Error', description: 'Could not access the camera.' });
                  setStatus('idle');
                } }
                onScan={(data: any) => {
                  if (data) {
                    handleScannedToken(data.text);
                  }
                } }
                style={{ width: '100%' }} />
            ) : (
              <div className="flex flex-col items-center justify-center gap-4">
                <Camera className="w-16 h-16 text-muted-foreground" />
                <p>
                  {status === 'processing' && 'Verifying...'}
                  {status === 'success' && 'Attendance Marked!'}
                  {status === 'failure' && 'Verification Failed.'}
                  {status === 'idle' && 'Ready to scan'}
                </p>
              </div>
            )}
          </div>
          
          <Button
            disabled={status === 'processing'}
            size="lg"
            className="w-full"
            onClick={() => {
              if (status === 'idle' || status === 'failure') {
                setStatus('scanning');
              } else {
                setStatus('idle');
              }
            }}
          >
            {status === 'scanning' ? 'Scanning...' : (status === 'idle' ? 'Start Scan' : 'Try Again')}
          </Button>

          {status === 'success' && (
            <div className="w-full animate-in fade-in duration-500 space-y-2">
              <Input 
                type="text" 
                placeholder="Enter Passkey (if required)" 
                value={passkeyValue} 
                onChange={(e) => setPasskeyValue(e.target.value)} 
              />
              <Button className="w-full">Submit Passkey</Button>
            </div>
          )}

          <Button variant="outline" asChild className="w-full">
            <Link href="/student/dashboard"><ArrowLeft className="mr-2 h-4 w-4" />Back to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
