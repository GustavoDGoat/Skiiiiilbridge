import { useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
// REMOVE: import { useNavigate } from 'react-router-dom'; // <--- REMOVE THIS IMPORT

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  // REMOVE: const navigate = useNavigate(); // <--- REMOVE THIS LINE

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // We don't need 'navigate' in the dependency array anymore
    return () => subscription.unsubscribe();
  }, []); // <--- Update dependency array

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // Keeping the redirect to the home page (where your router should take over)
        redirectTo: `${window.location.origin}/`, 
      },
    });
    
    if (error) {
      console.error('Error signing in with Google:', error.message);
      throw error;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
      throw error;
    }
    // REMOVE: navigate('/auth'); // <--- REMOVE THIS LINE
  };

  return {
    user,
    session,
    loading,
    signInWithGoogle,
    signOut,
  };
};
