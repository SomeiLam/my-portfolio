import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export type User = {
  id: string;
  email?: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [demo, setDemo] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user?.email === import.meta.env.VITE_DEMO_EMAIL) {
        setDemo(true);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, demo, setDemo, loading };
}
