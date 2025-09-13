import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

export async function POST(request: Request) {
  const { class_id } = await request.json();

  if (!class_id) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const sessionId = nanoid();
  const expiresAt = new Date(Date.now() + 60 * 1000); // 1 minute from now

  const { error } = await supabase
    .from('sessions')
    .insert([{ id: sessionId, expires_at: expiresAt.toISOString(), class_id }]);

  if (error) {
    console.error('Error creating session:', error);
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }

  return NextResponse.json({ sessionId }, { status: 201 });
}