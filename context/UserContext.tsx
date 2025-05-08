'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface User {
  id: string;
  email: string;
  name?: string;
  client_id?: string;
  image?: string | null;
}

interface UserContextType {
  user: User | null;
  userProfile: User | null;
  loading: boolean;
  error: Error | null;
  updateUserProfile: (profile: Partial<User>) => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  userProfile: null,
  loading: true,
  error: null,
  updateUserProfile: async () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const updateUserProfile = async (profile: Partial<User>) => {
    try {
      if (!user?.id) throw new Error('No hay usuario autenticado');

      const { error: updateError } = await supabase
        .from('profiles')
        .update(profile)
        .eq('id', user.id);

      if (updateError) throw updateError;

      setUserProfile(prev => prev ? { ...prev, ...profile } : null);
      setUser(prev => prev ? { ...prev, ...profile } : null);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        if (session?.user) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profileError) throw profileError;

          const userData = {
            id: session.user.id,
            email: session.user.email!,
            name: profile?.name,
            client_id: profile?.client_id,
            image: profile?.image,
          };

          setUser(userData);
          setUserProfile(userData);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        const userData = {
          id: session.user.id,
          email: session.user.email!,
          name: profile?.name,
          client_id: profile?.client_id,
          image: profile?.image,
        };

        setUser(userData);
        setUserProfile(userData);
      } else {
        setUser(null);
        setUserProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, userProfile, loading, error, updateUserProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
} 