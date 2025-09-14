"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: (User & { profile: any }) | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<(User & { profile: any }) | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async (session: any) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setUser({ ...session.user, profile: profile || null });
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    const getActiveSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      fetchUser(session);
    };
    
    getActiveSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        fetchUser(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);