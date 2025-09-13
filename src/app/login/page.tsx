"use client";

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import LoginRoleHandler from '@/components/common/LoginRoleHandler';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else if (data.user) {
      const { data: userRole, error: roleError } = await supabase
        .from('users')
        .select('role')
        .eq('id', data.user.id)
        .single();
      
      if (roleError) {
        setError('Could not determine user role.');
      } else if (userRole && userRole.role === role) {
        router.push(`/${userRole.role}/dashboard`);
      } else if (userRole && role === 'admin' && userRole.role === 'administrator') {
        router.push(`/administrator/dashboard`);
      } else {
        setError('You are not authorized to log in with this role.');
        supabase.auth.signOut();
      }
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4 font-sans">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginRoleHandler setRole={setRole} />
      </Suspense>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to continue to your dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full">Sign In</Button>
            <Button variant="outline" className="w-full" onClick={() => router.push('/signup')}>Sign Up</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}