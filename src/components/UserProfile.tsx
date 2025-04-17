
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface UserProfileData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  pterodactyl_id: number | null;
  is_admin: boolean;
  last_sync: string | null;
}

export function UserProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user?.id)
        .single();
      
      if (error) {
        throw error;
      }
      
      setProfile(data as UserProfileData);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to load your profile information.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse flex flex-col">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        </div>
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        {profile ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p>{profile.first_name} {profile.last_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{profile.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Account Type</p>
                  <p>{profile.is_admin ? 'Administrator' : 'User'}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Pterodactyl Integration</h3>
              <div className="mt-2">
                <div className="mb-2">
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="flex items-center mt-1">
                    <span 
                      className={`inline-block w-3 h-3 rounded-full mr-2 ${
                        profile.pterodactyl_id ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    ></span>
                    <p>
                      {profile.pterodactyl_id 
                        ? 'Connected to Pterodactyl' 
                        : 'Not connected to Pterodactyl'}
                    </p>
                  </div>
                </div>
                
                {profile.pterodactyl_id && (
                  <div>
                    <p className="text-sm text-gray-500">Pterodactyl ID</p>
                    <p>{profile.pterodactyl_id}</p>
                  </div>
                )}
                
                {profile.last_sync && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Last Synchronized</p>
                    <p>{new Date(profile.last_sync).toLocaleString()}</p>
                  </div>
                )}
                
                {!profile.pterodactyl_id && (
                  <Button 
                    className="mt-4"
                    onClick={() => {
                      toast({
                        title: "Syncing Account",
                        description: "This function will be available soon.",
                      });
                    }}
                  >
                    Connect to Pterodactyl
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p>No profile information available.</p>
        )}
      </CardContent>
    </Card>
  );
}
