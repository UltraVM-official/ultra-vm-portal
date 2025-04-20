
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileSkeleton } from './profile/ProfileSkeleton';
import { PersonalInfo } from './profile/PersonalInfo';
import { PterodactylInfo } from './profile/PterodactylInfo';

interface UserProfileData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  pterodactyl_id: number | null;
  is_admin: boolean;
  last_sync: string | null;
  created_at: string;
  updated_at: string;
}

export function UserProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
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
      
      if (error) throw error;
      
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

  const handleConnectToPterodactyl = async () => {
    if (!profile) return;
    
    try {
      setSyncing(true);
      toast({
        title: "Connecting to Pterodactyl",
        description: "Please wait while we connect your account...",
      });
      
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: profile.email,
          password: "TemporaryPassword" + Math.random().toString(36).substring(2, 10),
          firstName: profile.first_name,
          lastName: profile.last_name
        })
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to connect to Pterodactyl');
      }
      
      await fetchUserProfile();
      
      toast({
        title: "Success",
        description: "Your account has been connected to Pterodactyl.",
      });
    } catch (error: any) {
      console.error('Error connecting to Pterodactyl:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to connect your account to Pterodactyl.',
        variant: 'destructive',
      });
    } finally {
      setSyncing(false);
    }
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        {profile ? (
          <div className="space-y-4">
            <PersonalInfo
              firstName={profile.first_name}
              lastName={profile.last_name}
              email={profile.email}
              isAdmin={profile.is_admin}
            />
            
            <PterodactylInfo
              pterodactylId={profile.pterodactyl_id}
              lastSync={profile.last_sync}
              onConnect={handleConnectToPterodactyl}
              syncing={syncing}
            />
          </div>
        ) : (
          <p>No profile information available.</p>
        )}
      </CardContent>
    </Card>
  );
}
