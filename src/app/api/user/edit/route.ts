import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { id, name, email, role, department, rfid_id } = await request.json();

  if (!id) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('users')
    .update({ name, email, role, department, rfid_id })
    .eq('id', id);

  if (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }

  return NextResponse.json({ message: 'User updated successfully' }, { status: 200 });
}