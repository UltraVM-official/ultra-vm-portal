
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://fadosrpclmefsmdjjvol.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhZG9zcnBjbG1lZnNtZGpqdm9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3ODA3MDksImV4cCI6MjA2MDM1NjcwOX0.TFJ28aWeOyEKlMowujrUc-bAF8MLddWPVtKxvtXpIKs";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
