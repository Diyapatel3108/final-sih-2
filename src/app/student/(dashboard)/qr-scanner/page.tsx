
"use client";

import { useState, Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useAuth } from '@/components/layout/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import QRCodeScanner from '@/components/common/QRCodeScanner';

const QRScannerComponent = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [scannerActive, setScannerActive] = useState(false);
  const [phase, setPhase] = useState<'initial' | 'scanning' | 'passkey' | 'finished'>('initial');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [passkey, setPasskey] = useState('');
  const { toast } = useToast();
  const { user } = useAuth();

  const handleScan = async (scannedSessionId: string) => {
    if (scannedSessionId) {
      setSessionId(scannedSessionId);
      setScannerActive(false);
      setPhase('passkey');
    }
  };

  const handleInitialSubmit = async () => {
    if (!sessionId || !enrollmentNumber) return;

    try {
      const { error } = await supabase.rpc('mark_attendance', {
        p_session_id: sessionId,
        p_enrollment_number: enrollmentNumber,
      });

      if (error) throw error;
      
      toast({ title: "Scan successful", description: "Waiting for passkey." });
    } catch (err: any) {
      setError(err.message || "Failed to mark attendance.");
    }
  };
  
  const handlePasskeySubmit = async () => {
    if (!sessionId || !passkey) return;

    try {
      const { error } = await supabase.rpc('validate_passkey', {
        p_session_id: sessionId,
        p_submitted_passkey: passkey,
      });

      if (error) throw error;

      setSuccess(true);
      toast({ title: "Attendance Marked", description: "Your attendance has been successfully recorded." });
      setPhase('finished');
    } catch (err: any) {
      setError(err.message || "Failed to validate passkey.");
    }
  };

  const startScanner = () => {
    setError('');
    setSuccess(false);
    setScannerActive(true);
    setPhase('scanning');
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
          
          {phase === 'initial' && (
            <div className="flex flex-col items-center justify-center gap-4">
              <Camera className="w-16 h-16 text-muted-foreground" />
              <Button onClick={startScanner}>Start Scanner</Button>
            </div>
          )}
          {phase === 'scanning' && (
            <div className="w-full relative" style={{ paddingTop: '100%' }}>
              <div className="absolute top-0 left-0 w-full h-full">
                <QRCodeScanner onScan={handleScan} />
              </div>
              <Button onClick={() => setPhase('initial')} className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">Cancel</Button>
            </div>
          )}
          {phase === 'passkey' && (
            <div className="space-y-4">
              <Input placeholder="Your Enrollment Number" value={enrollmentNumber} onChange={(e) => setEnrollmentNumber(e.target.value)} />
              <Button onClick={handleInitialSubmit} className="w-full">Submit Enrollment Number</Button>
              <Input placeholder="Enter Passkey" value={passkey} onChange={(e) => setPasskey(e.target.value)} />
              <Button onClick={handlePasskeySubmit} className="w-full">Submit Passkey</Button>
            </div>
          )}
          {phase === 'finished' && (
            <p>Attendance marked successfully!</p>
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
