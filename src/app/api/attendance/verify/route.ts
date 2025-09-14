
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import jwt from 'jsonwebtoken';

// This secret should be in your environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const studentId = searchParams.get('studentId');

  if (!token || !studentId) {
    return NextResponse.json({ error: 'Missing token or student ID' }, { status: 400 });
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { sessionId: string; classId: string; };
    const { sessionId, classId } = decoded;
    
    // Check if session exists and is active
    const { data: session, error: sessionError } = await supabase
      .from('sessions')
      .select('*')
      .eq('id', sessionId)
      .single();
      
    if (sessionError || !session) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 404 });
    }
    
    // Check if student already recorded attendance
    const { data: existingRecord } = await supabase
      .from('attendance')
      .select('*')
      .eq('session_id', sessionId)
      .eq('student_id', studentId);
      
    if (existingRecord && existingRecord.length > 0) {
      return NextResponse.json({ error: 'Attendance already recorded' }, { status: 409 });
    }
    
    // Get student details
    const { data: student } = await supabase
      .from('students')
      .select('name, roll_number')
      .eq('id', studentId)
      .single();
      
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }
    
    // Record attendance
    const { data: attendance, error: attendanceError } = await supabase
      .from('attendance')
      .insert({
        session_id: sessionId,
        student_id: studentId,
        class_id: classId,
        student_name: student.name,
        roll_number: student.roll_number,
        status: 'present',
        timestamp: new Date().toISOString()
      })
      .select()
      .single();
      
    if (attendanceError) {
      return NextResponse.json({ error: 'Failed to record attendance' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true, attendance });
  } catch (error) {
    console.error('Attendance verification error:', error);
    if (error instanceof jwt.TokenExpiredError) {
      return NextResponse.json({ error: 'QR code expired' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
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
