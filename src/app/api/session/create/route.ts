import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  const { class_id } = await request.json();
  
  try {
    // Create session in database
    const { data: session, error } = await supabase
      .from('sessions')
      .insert({ class_id })
      .select()
      .single();
      
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
    
    // Create JWT token with session info and expiration
    const token = jwt.sign(
      {
        sessionId: session.id,
        classId: class_id,
        exp: Math.floor(Date.now() / 1000) + 60 // 60 seconds expiration
      },
      process.env.JWT_SECRET!
    );
    
    return new Response(JSON.stringify({ sessionId: session.id, token }), { status: 200 });
  } catch (error) {
    console.error('Session creation error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}