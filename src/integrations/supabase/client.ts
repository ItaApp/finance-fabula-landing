// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://uzajpdyaladwuzqdvejz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6YWpwZHlhbGFkd3V6cWR2ZWp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3MTE2MDEsImV4cCI6MjA0NzI4NzYwMX0.8FBEGSJordtW1rVK_8-Hx38hbP0xMbqNGrF71MHfHfU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);