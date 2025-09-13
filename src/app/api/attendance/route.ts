
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('sessionId');

  if (!sessionId) {
    return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
  }

  const { data: sessionData, error: sessionError } = await supabase
    .from('sessions')
    .select('expires_at')
    .eq('id', sessionId)
    .single();

  if (sessionError || !sessionData) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  }

  const showPasskeys = Date.now() >= new Date(sessionData.expires_at).getTime() - 20000; // 20 seconds before expiry

  const { data: students, error: studentsError } = await supabase
    .from('attendance')
    .select(showPasskeys ? 'student_id, student_name, passkey, timestamp, status' : 'student_id, student_name, timestamp, status')
    .eq('session_id', sessionId);

  if (studentsError) {
    return NextResponse.json({ error: 'Failed to fetch attendance' }, { status: 500 });
  }

  return NextResponse.json({ students });
}
