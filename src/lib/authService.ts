import { supabase } from "./supabase";
import type { User } from "@supabase/supabase-js";

export async function fetchCurrentUser(): Promise<User | null> {
  try {
    const { data } = await supabase.auth.getUser();

    // Return the user object if it exists
    return data?.user ?? null;
  } catch (error) {
    console.log("Unexpected error getting current user:", error);
    return null;
  }
}