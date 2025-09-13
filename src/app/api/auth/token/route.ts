
import { NextRequest, NextResponse } from 'next/server';
import { sign, verify } from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import { supabase } from '@/lib/supabaseClient';

const secret = process.env.JWT_SECRET || 'your-default-secret';

const mockStudents: { [key: string]: { name: string } } = {
  'student123': { name: 'Alice Johnson' },
  'student456': { name: 'Bob Williams' },
  'student789': { name: 'Charlie Brown' },
};

export async function POST(req: NextRequest) {
  const { sessionData } = await req.json();
  const sessionId = nanoid();

  const expiresIn = 60; // 60 seconds
  const expiresAt = new Date(Date.now() + expiresIn * 1000);

  const { error } = await supabase
    .from('sessions')
    .insert([{ id: sessionId, expires_at: expiresAt.toISOString() }]);

  if (error) {
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }

  const token = sign(sessionData, secret, { expiresIn: `${expiresIn}s` });

  return NextResponse.json({ token });
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  const studentId = req.nextUrl.searchParams.get('studentId');

  if (!token || !studentId) {
    return NextResponse.json({ error: 'Missing token or student ID' }, { status: 400 });
  }

  try {
    const decoded = verify(token, secret) as { sessionId: string };
    const { sessionId } = decoded;

    const { data: session, error: sessionError } = await supabase
      .from('sessions')
      .select('id')
      .eq('id', sessionId)
      .single();

    if (sessionError || !session) {
      return NextResponse.json({ error: 'Invalid session. It may have expired or not exist.' }, { status: 404 });
    }

    const { data: existingScan, error: scanError } = await supabase
      .from('attendance')
      .select('student_id')
      .eq('session_id', sessionId)
      .eq('student_id', studentId)
      .single();

    if (existingScan) {
      return NextResponse.json({
        message: 'Already scanned. Please wait for passkey.',
        sessionId: sessionId,
      });
    }

    const passkey = nanoid(8).toUpperCase();
    const studentName = mockStudents[studentId]?.name || 'Unknown Student';

    const { error: insertError } = await supabase
      .from('attendance')
      .insert([{
        session_id: sessionId,
        student_id: studentId,
        student_name: studentName,
        passkey,
        status: 'scanned',
      }]);

    if (insertError) {
      return NextResponse.json({ error: 'Failed to record attendance' }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Scan successful. Please proceed to enter your passkey.',
      sessionId: sessionId,
      passkey: passkey,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }
}
