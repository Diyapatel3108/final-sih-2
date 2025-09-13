
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import jwt from 'jsonwebtoken';

// This secret should be in your environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';

export async function GET(req: NextRequest) {
    const token = req.nextUrl.searchParams.get('token');
    const studentId = req.nextUrl.searchParams.get('studentId');

    if (!token || !studentId) {
        return NextResponse.json({ error: 'Token and Student ID are required' }, { status: 400 });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { sessionData: { sessionId: string; classId: string; }; iat: number; exp: number; };
        
        const { sessionId, classId } = decoded.sessionData;

        // Optional: Check if token is expired (already handled by jwt.verify)
        if (Date.now() >= decoded.exp * 1000) {
            return NextResponse.json({ error: 'QR Code has expired.' }, { status: 410 });
        }

        // Record attendance
        const { error } = await supabase.from('attendance').insert({
            session_id: sessionId,
            student_id: studentId,
            class_id: classId,
            status: 'scanned',
        });

        if (error) {
            // Handle potential unique constraint violation if student tries to scan twice
            if (error.code === '23505') {
                return NextResponse.json({ message: 'Attendance already marked for this session.' }, { status: 200 });
            }
            throw error;
        }

        return NextResponse.json({ message: 'Attendance successfully marked as scanned.' });

    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return NextResponse.json({ error: 'Invalid or expired QR Code.' }, { status: 401 });
        }
        console.error('Verification error:', error);
        return NextResponse.json({ error: 'An unexpected error occurred during verification.' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
  const { sessionId, studentId, passkey } = await req.json();

  if (!sessionId || !studentId || !passkey) {
    return NextResponse.json({ error: 'Session ID, Student ID, and Passkey are required' }, { status: 400 });
  }

  const { data: attendance, error: attendanceError } = await supabase
    .from('attendance')
    .select('passkey')
    .eq('session_id', sessionId)
    .eq('student_id', studentId)
    .single();

  if (attendanceError || !attendance) {
    return NextResponse.json({ error: 'Student has not scanned the QR code for this session' }, { status: 404 });
  }

  // In a real scenario, the passkey should be hashed and compared.
  // This is a simplified example.
  if (attendance.passkey === passkey) {
    const { error: updateError } = await supabase
      .from('attendance')
      .update({ status: 'verified' })
      .eq('session_id', sessionId)
      .eq('student_id', studentId);

    if (updateError) {
      return NextResponse.json({ error: 'Failed to confirm attendance' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Attendance confirmed!' });
  } else {
    return NextResponse.json({ error: 'Invalid passkey' }, { status: 401 });
  }
}
