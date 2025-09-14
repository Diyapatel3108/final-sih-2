"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QrCode } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { Class } from "@/lib/types";
import QRCode from 'qrcode';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from "@/components/layout/AuthContext";

const QR_EXPIRATION_SECONDS = 60;

export default function GenerateQRPage() {
  const [selectedClass, setSelectedClass] = useState<string | undefined>(undefined);
  const [classes, setClasses] = useState<Class[]>([]);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const [passkey, setPasskey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);
  
  const countdownIntervalRef = useRef<NodeJS.Timeout>();
  const { user } = useAuth();

  useEffect(() => {
    const fetchClasses = async () => {
      if (user) {
        const { data, error } = await supabase.from('classes').select('*').eq('teacher_id', user.id);
        if (data) {
          setClasses(data);
        } else if (error) {
            console.error("Error fetching classes: ", error)
        }
      }
    };
    fetchClasses();
  }, [user]);

  useEffect(() => {
    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, []);

  const startCountdown = () => {
    setCountdown(QR_EXPIRATION_SECONDS);
    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current as NodeJS.Timeout);
          setQrCode(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (!sessionId) return;
    
    const channel = supabase
      .channel(`attendance-${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'attendance',
          filter: `session_id=eq.${sessionId}`
        },
        (payload) => {
          setAttendanceRecords(prev => [...prev, payload.new]);
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('Realtime connected');
        } else if (status === 'CHANNEL_ERROR') {
          console.error('Realtime connection error');
          setError('Realtime connection failed');
        }
      });
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId]);


  const handleGenerateQR = async () => {
    if (!selectedClass) {
      setError('Please select a class');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Create session
      const response = await fetch('/api/session/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ class_id: selectedClass })
      });
      
      if (!response.ok) {
        const errorBody = await response.text();
        console.error('Failed to create session:', errorBody);
        throw new Error('Failed to create session');
      }

      const { sessionId, token } = await response.json();
      
      setSessionId(sessionId);
      
      // Generate QR code with token
      const qrDataUrl = await QRCode.toDataURL(token, {
        width: 200,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
      
      setQrCode(qrDataUrl);
      startCountdown();
      setAttendanceRecords([]);
    } catch (err) {
      console.error('Error generating QR code:', err);
      setError('Failed to generate QR code. Please try again.');
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
            {qrCode ? (
                <div className="flex flex-col items-center gap-4 text-center">
                    <Image src={qrCode} alt="Generated QR Code" width={300} height={300} priority />
                    <div className='space-y-1'>
                        <p className="font-semibold">Session for {classes.find(c => c.id === selectedClass)?.name}</p>
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
                         {sessionId ? 'QR Code expired. Generate a new one.' : 'QR code will appear here once generated.'}
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
                {attendanceRecords.length > 0 ? (
                    <ul>
                        {attendanceRecords.map((student: any) => (
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
