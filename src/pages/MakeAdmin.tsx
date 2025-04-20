
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MakeAdmin() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const makeUserAdmin = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // Update the user_profiles table to make this user an admin
      const { error } = await supabase
        .from('user_profiles')
        .update({ is_admin: true })
        .eq('id', user.id);
      
      if (error) {
        throw error;
      }
      
      // Also update the "profiles" table if it exists 
      // (it seems your app might be using both tables)
      try {
        await supabase
          .from('profiles')
          .update({ is_admin: true })
          .eq('id', user.id);
      } catch (err) {
        console.log('profiles table might not exist, ignoring:', err);
      }
      
      setSuccess(true);
      toast({
        title: 'Success',
        description: 'Your account has been granted admin privileges.',
      });
    } catch (error) {
      console.error('Error making user admin:', error);
      toast({
        title: 'Error',
        description: 'Failed to grant admin privileges.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-950 to-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-[400px] border-purple-800/20 bg-black/40 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-900/50 to-black">
              <CardTitle className="text-xl text-purple-100">Activate Admin Account</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="mb-6 text-purple-200">
                Click the button below to grant your account administrator privileges. This will allow you to access all areas of the application.
              </p>
              
              {success ? (
                <div className="text-center text-green-400 p-4 rounded-md bg-green-900/20 border border-green-800/30 mb-4">
                  Your account now has admin privileges. You can access the admin dashboard.
                </div>
              ) : (
                <Button 
                  onClick={makeUserAdmin} 
                  disabled={loading} 
                  className="w-full bg-purple-800 hover:bg-purple-700 transition-colors"
                >
                  {loading ? 'Processing...' : 'Make Me Admin'}
                </Button>
              )}
              
              {success && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4"
                >
                  <Button 
                    onClick={() => window.location.href = '/dashboard/admin'} 
                    className="w-full bg-purple-900 hover:bg-purple-800 transition-colors"
                  >
                    Go To Admin Dashboard
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
