import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { sessionId, studentId, passkey } = await request.json();

  if (!sessionId || !studentId || !passkey) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
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