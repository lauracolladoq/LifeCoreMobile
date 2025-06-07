import { supabase } from "./supabase";

export const sendVerificationEmail = async (email: string) => {
  const { data, error } = await supabase.auth.resend({
    type: "signup",
    email: email,
    options: {
      emailRedirectTo: "",
    },
  });

  if (error) {
    console.log("Error sending verification email:", error.message);
    return { success: false, error: error.message };
  }

  console.log("Verification email sent successfully.");
};

export const resetPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    console.log("Error sending reset password email:", error.message);
    return { error: error.message };
  }
};
