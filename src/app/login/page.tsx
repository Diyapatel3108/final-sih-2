"use client";

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import LoginRoleHandler from '@/components/common/LoginRoleHandler';

import LoginForm from '@/components/common/LoginForm';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4 font-sans">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginRoleHandler>
          <LoginForm />
        </LoginRoleHandler>
      </Suspense>
    </main>
  );
}