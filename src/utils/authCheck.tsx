import { supabase } from "@/lib/supabase";

export const checkAuthStatus = async (): Promise<boolean> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    // If user is null return false, otherwise return true
    return !!user; 
  } catch (error) {
    console.log("Error checking auth status:", error);
    return false;
  }
};