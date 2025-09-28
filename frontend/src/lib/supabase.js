// src/lib/supabase.js
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Enhanced profile creation with better error handling and logging
export async function ensureProfileRow() {
  try {
    console.log('=== PROFILE CREATION START ===');
    
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      console.error('Error getting user:', userError);
      throw userError;
    }
    
    if (!user) {
      console.error('No user found when trying to create profile');
      throw new Error('No authenticated user found');
    }

    console.log('User found:', {
      id: user.id,
      email: user.email,
      metadata: user.user_metadata
    });

    // Extract user info from metadata
    const meta = user.user_metadata || {};
    const displayName = 
      meta.full_name || 
      meta.name || 
      meta.display_name ||
      user.email?.split("@")[0] || 
      "New User";
    
    const avatar = 
      meta.avatar_url || 
      meta.picture || 
      meta.photo || 
      null;

    console.log('Profile data to insert:', {
      id: user.id,
      display_name: displayName,
      profile_pic_url: avatar
    });

    // Check if profile already exists
    const { data: existingProfile, error: selectError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (selectError && selectError.code !== 'PGRST116') { // PGRST116 = no rows found
      console.error('Error checking existing profile:', selectError);
      throw selectError;
    }

    if (existingProfile) {
      console.log('Profile already exists:', existingProfile);
      return existingProfile;
    }

    // Insert new profile
    console.log('Inserting new profile...');
    const { data: newProfile, error: insertError } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        display_name: displayName,
        profile_pic_url: avatar
      })
      .select()
      .single();

    if (insertError) {
      console.error('=== PROFILE INSERT ERROR ===');
      console.error('Error code:', insertError.code);
      console.error('Error message:', insertError.message);
      console.error('Error details:', insertError.details);
      console.error('Error hint:', insertError.hint);
      throw insertError;
    }

    console.log('=== PROFILE CREATED SUCCESSFULLY ===');
    console.log('New profile:', newProfile);
    return newProfile;

  } catch (error) {
    console.error('=== PROFILE CREATION FAILED ===');
    console.error('Error:', error);
    throw error;
  }
}

// Alternative function to manually trigger profile creation (for testing)
export async function createProfileManually() {
  try {
    await ensureProfileRow();
    console.log('Manual profile creation successful!');
  } catch (error) {
    console.error('Manual profile creation failed:', error);
    alert(`Profile creation failed: ${error.message}`);
  }
}