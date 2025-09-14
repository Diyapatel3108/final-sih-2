"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/components/layout/AuthContext';
import { supabase } from '@/lib/supabaseClient';

export default function LoginRoleHandler({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role');

  useEffect(() => {
    if (user && user.profile) {
      const userRole = user.profile.role;
      const targetRole = role === 'admin' ? 'administrator' : role;

      // Only redirect if the user's role matches the role in the URL
      if (userRole === targetRole) {
        // Use replace to avoid breaking the back button
        router.replace(`/${userRole}/dashboard`);
      }
      // If the roles do not match, do nothing. This allows a user
      // who is already logged in with a different role to sign in
      // with the new role. The LoginForm will handle the new sign-in
      // and the AuthContext will update, triggering a re-render.
    }
  }, [user, role, router]);

  return <div>{children}</div>;
}