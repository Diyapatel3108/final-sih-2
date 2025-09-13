import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { class_id, student_id } = await request.json();

  if (!class_id || !student_id) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('student_classes')
    .insert([{ class_id, student_id }]);

  if (error) {
    console.error('Error adding student to class:', error);
    return NextResponse.json({ error: 'Failed to add student to class' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Student added to class successfully' }, { status: 201 });
}