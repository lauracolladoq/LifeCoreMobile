import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nxbqerkivppqchbyhmge.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54YnFlcmtpdnBwcWNoYnlobWdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2OTI3MzgsImV4cCI6MjA1OTI2ODczOH0.MiVOt0qIJk5I4qwkYjj5y7TJT_8y_wQ4mxbYN-4VSXI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
