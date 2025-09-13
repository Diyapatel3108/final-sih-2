"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginRoleHandler({ setRole }: { setRole: (role: string | null) => void }) {
  const searchParams = useSearchParams();
  const role = searchParams.get('role');

  useEffect(() => {
    setRole(role);
  }, [role, setRole]);

  return null;
}