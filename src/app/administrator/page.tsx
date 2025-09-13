
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Shield, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    // Simulate a network request
    setTimeout(() => {
      router.push('/administrator/dashboard');
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-8">
      <div className="mb-8 text-center">
        <div className="flex justify-center items-center mb-4">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Shield className="size-10" />
          </div>
        </div>
        <h1 className="text-4xl font-bold font-headline text-primary">Admin Portal</h1>
        <p className="text-muted-foreground mt-2">Sign in to access the system dashboard.</p>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your admin credentials below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="admin@example.com" required disabled={isLoading} defaultValue="admin@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required disabled={isLoading} defaultValue="password" />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isLoading ? 'Verifying...' : 'Login'}
            </Button>
          </form>
           <Button variant="outline" asChild className="mt-4 w-full">
              <Link href="/">
                <ArrowLeft className="mr-2"/>
                Back to Role Selection
              </Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
