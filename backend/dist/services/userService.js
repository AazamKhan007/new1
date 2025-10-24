// backend/src/services/userService.ts
import { createClient } from '@supabase/supabase-js';
// Initialize the Supabase admin client for server-side operations.
const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.SUPABASE_SERVICE_ROLE_KEY || '');
/**
 * Registers a new student in Supabase.
 */
export const signupStudent = async (userDetails) => {
    const { email, password, fullName, university_id, course } = userDetails;
    const { data, error } = await supabaseAdmin.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
                university_id,
                course,
                user_role: 'student',
            },
        },
    });
    if (error)
        throw error;
    return data;
};
/**
 * Logs in a user using their email and password.
 */
export const loginStudent = async (credentials) => {
    const { email, password } = credentials;
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
        email,
        password,
    });
    if (error)
        throw error;
    return data;
};
/**
 * Initiates the password reset process for a given email.
 */
export const forgotPassword = async (email) => {
    const { data, error } = await supabaseAdmin.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:3000/update-password',
    });
    if (error)
        throw error;
    return data;
};
/**
 * Updates a user's profile with their university and course.
 */
export const updateUserProfile = async (userId, profileData) => {
    const { university_id, course } = profileData;
    const { data, error } = await supabaseAdmin
        .from('profiles')
        .update({ university_id, course })
        .eq('id', userId)
        .select()
        .single();
    if (error)
        throw error;
    return data;
};
