import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { name, code, teacher_id } = await request.json();

  if (!name || !code || !teacher_id) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('classes')
    .insert([{ name, code, teacher_id }])
    .select();

  if (error) {
    console.error('Error creating class:', error);
    return NextResponse.json({ error: 'Failed to create class' }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}