"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QrCode } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { Class } from "@/lib/types";
import { supabase } from '@/lib/supabaseClient';
import QRCodeGenerator from '@/components/common/QRCodeGenerator';
import { useAuth } from "@/components/layout/AuthContext";

const QR_SCAN_SECONDS = 40;
const PASSKEY_SECONDS = 20;

export default function GenerateQRPage() {
  const [selectedClass, setSelectedClass] = useState<string | undefined>(undefined);
  const [classes, setClasses] = useState<Class[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const [phase, setPhase] = useState<'initial' | 'qr' | 'passkey' | 'finished'>('initial');
  const [passkey, setPasskey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);
  
  const timerRef = useRef<NodeJS.Timeout>();
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
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (phase === 'initial' || phase === 'finished' || !sessionId) {
      return;
    }

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          if (phase === 'qr') {
            startPasskeyPhase();
          } else {
            setPhase('finished');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, sessionId]);

  const startQrPhase = () => {
    setPhase('qr');
    setCountdown(QR_SCAN_SECONDS);
  };

  const startPasskeyPhase = async () => {
    if (!sessionId) return;

    const { data: passkeyData, error: passkeyError } = await supabase.rpc('generate_passkey', {
      p_session_id: sessionId,
    });

    if (passkeyError) {
      setError('Failed to generate passkey.');
      return;
    }

    setPasskey(passkeyData);
    setPhase('passkey');
    setCountdown(PASSKEY_SECONDS);
  };

  useEffect(() => {
    if (!sessionId) return;
    
    const channel = supabase
      .channel('attendance_updates')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'attendance_records' }, (payload) => {
        const newRecord = payload.new as { id: string; session_id: string; [key: string]: any };
        if (newRecord && newRecord.session_id === sessionId) {
          setAttendanceRecords(prev => {
            const existing = prev.find(r => r.id === newRecord.id);
            if (existing) {
              return prev.map(r => r.id === newRecord.id ? newRecord : r);
            }
            return [...prev, newRecord];
          });
        }
      })
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
      const { data, error } = await supabase.rpc('create_session', {
        p_class_id: selectedClass
      });

      if (error) {
        throw error;
      }
      
      setSessionId(data);
      startQrPhase();
      setAttendanceRecords([]);
    } catch (err: any) {
      console.error('Error generating QR code:', err);
      setError(err.message || 'Failed to generate QR code. Please try again.');
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
            {phase === 'qr' && sessionId && (
              <div className="flex flex-col items-center gap-4 text-center">
                <QRCodeGenerator sessionId={sessionId} />
                <div className='space-y-1'>
                  <p className="font-semibold">Session for {classes.find(c => c.id === selectedClass)?.name}</p>
                  <p className="text-sm text-muted-foreground">Scan QR within {countdown} seconds</p>
                </div>
              </div>
            )}
            {phase === 'passkey' && passkey && (
              <div className="flex flex-col items-center gap-4 text-center">
                <p className="text-2xl font-bold">Enter Passkey</p>
                <p className="text-6xl font-mono tracking-widest">{passkey}</p>
                <p className="text-sm text-muted-foreground">Enter within {countdown} seconds</p>
              </div>
            )}
            {phase === 'initial' && (
              <div className="w-[300px] h-[300px] bg-secondary rounded-lg flex flex-col items-center justify-center border-2 border-dashed">
                <QrCode className="w-16 h-16 text-muted-foreground" />
                <p className="mt-4 text-sm text-muted-foreground text-center px-4">
                  QR code will appear here once generated.
                </p>
              </div>
            )}
            {phase === 'finished' && (
              <div className="w-[300px] h-[300px] bg-secondary rounded-lg flex flex-col items-center justify-center border-2 border-dashed">
                <p className="text-2xl font-bold">Session Finished</p>
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
