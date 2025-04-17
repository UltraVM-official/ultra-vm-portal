
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

export function useAdminStatus() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        setLoading(true);
        
        // Get the current user
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          setIsAdmin(false);
          return;
        }
        
        // Check if the user is an admin in the profiles table
        const { data, error } = await supabase
          .from('user_profiles')
          .select('is_admin')
          .eq('id', session.user.id)
          .single();
        
        if (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
          return;
        }
        
        setIsAdmin(data?.is_admin || false);
      } catch (error) {
        console.error('Error in admin status check:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkAdminStatus();
    
    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      checkAdminStatus();
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  
  return { isAdmin, loading };
}
