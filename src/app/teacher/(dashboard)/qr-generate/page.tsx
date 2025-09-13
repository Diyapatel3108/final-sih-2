
"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QrCode } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { Class } from '@/lib/types';

import { supabase } from '@/lib/supabaseClient';

const QR_EXPIRATION_SECONDS = 60;

export default function GenerateQRPage() {
  const [selectedClass, setSelectedClass] = useState<string | undefined>(undefined);
  const [classes, setClasses] = useState<Class[]>([]);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [sessionInfo, setSessionInfo] = useState<{ id: string; className: string } | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const [passkey, setPasskey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [scannedStudents, setScannedStudents] = useState<any[]>([]);
  
  const countdownIntervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const fetchClasses = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase.from('classes').select('*').eq('teacher_id', user.id);
        if (data) {
          setClasses(data);
        }
      }
    };
    fetchClasses();
  }, []);

  useEffect(() => {
    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      countdownIntervalRef.current = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
      if (qrCodeUrl) {
          setQrCodeUrl(null); // Expire the QR code
          setSessionInfo(null);
      } else if (qrCodeUrl) {
        setQrCodeUrl(null); // Expire the QR code
        setSessionInfo(null);
        // After QR code expires, generate and show passkey for 20 seconds
        const newPasskey = Math.random().toString(36).substring(2, 8).toUpperCase();
        setPasskey(newPasskey);
        setCountdown(20);
      } else if (passkey) {
        setPasskey(null); // Expire the passkey
      }
    }

    return () => {
        if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current);
        }
    };
  }, [countdown, qrCodeUrl, passkey]);

 useEffect(() => {
   if (sessionInfo) {
     const channel = supabase
       .channel(`attendance:${sessionInfo.id}`)
       .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'attendance', filter: `session_id=eq.${sessionInfo.id}` }, (payload) => {
         setScannedStudents((prev) => [...prev, payload.new]);
       })
       .subscribe();

     return () => {
       supabase.removeChannel(channel);
     };
   }
 }, [sessionInfo]);


  const handleGenerateQR = async () => {
    if (!selectedClass) {
        setError("Please select a class first.");
        return;
    }
    const classDetails = classes.find(c => c.id === selectedClass);
    if (!classDetails) {
        setError("Could not find the selected class details.");
        return;
    }

    setIsLoading(true);
    setError(null);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    try {
      const response = await fetch('/api/session/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ class_id: selectedClass }),
      });

      if (!response.ok) {
        throw new Error('Failed to create session');
      }

      const { sessionId } = await response.json();
      
      const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(sessionId)}`;
      
      setQrCodeUrl(qrApiUrl);
      setSessionInfo({ id: sessionId, className: classDetails.name });
      setCountdown(60);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred while generating the QR code.');
      setQrCodeUrl(null);
      setSessionInfo(null);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate QR Code</CardTitle>
          <CardDescription>Select a class to generate a unique, time-limited QR code for attendance.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <div className="w-full max-w-sm space-y-4">
            <Select onValueChange={setSelectedClass} value={selectedClass} disabled={isLoading || countdown > 0}>
              <SelectTrigger>
                <SelectValue placeholder="Select a class..." />
              </SelectTrigger>
              <SelectContent>
                {classes.map((cls) => (
                  <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleGenerateQR} disabled={!selectedClass || isLoading || countdown > 0} className="w-full">
              <QrCode className="mr-2 h-4 w-4" />
              {isLoading ? 'Generating...' : (countdown > 0 ? `Expires in ${countdown}s` : 'Generate QR Code')}
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="w-full max-w-sm">
                <div />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="w-full flex flex-col items-center justify-center p-4 min-h-[320px]">
            {qrCodeUrl ? (
                <div className="flex flex-col items-center gap-4 text-center">
                    <Image src={qrCodeUrl} alt="Generated QR Code" width={300} height={300} priority />
                    <div className='space-y-1'>
                        <p className="font-semibold">Session for {sessionInfo?.className}</p>
                        <p className="text-sm text-muted-foreground">Expires in {countdown} seconds</p>
                    </div>
                </div>
             ) : passkey ? (
                <div className="flex flex-col items-center gap-4 text-center">
                    <p className="text-2xl font-bold">Passkey</p>
                    <p className="text-4xl font-mono tracking-widest">{passkey}</p>
                    <p className="text-sm text-muted-foreground">Expires in {countdown} seconds</p>
                </div>
             ) : (
                 <div className="w-[300px] h-[300px] bg-secondary rounded-lg flex flex-col items-center justify-center border-2 border-dashed">
                    <QrCode className="w-16 h-16 text-muted-foreground" />
                    <p className="mt-4 text-sm text-muted-foreground text-center px-4">
                         {sessionInfo ? 'QR Code expired. Generate a new one.' : 'QR code will appear here once generated.'}
                    </p>
                 </div>
             )}
          </div>
        </CardContent>
      </Card>
      <div className="mt-8 w-full max-w-md">
        <Card>
            <CardHeader>
                <CardTitle>Live Scans</CardTitle>
                <CardDescription>Students who have successfully scanned the QR code.</CardDescription>
            </CardHeader>
            <CardContent>
                {scannedStudents.length > 0 ? (
                    <ul>
                        {scannedStudents.map((student) => (
                            <li key={student.id}>{student.student_name}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-muted-foreground">No students have scanned the QR code yet.</p>
                )}
            </CardContent>
        </Card>
    </div>
    </div>
  );
}
