import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const { data: { user }, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 500 });
  }

  if (user) {
    const { error: insertError } = await supabase
      .from('users')
      .insert([{ id: user.id, name: 'Admin', email, role: 'administrator' }]);
    
    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }
  }

  return NextResponse.json({ message: 'Admin user created successfully' });
}