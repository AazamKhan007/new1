// backend/src/controllers/authController.ts
import { Response } from 'express';
import { AuthRequest } from '../middlewares/AuthRequest.js';
import {
  signupStudent,
  loginStudent,
  forgotPassword,
  updateUserProfile
} from '../services/userService.js';
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase admin client for all server-side operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

// --- TYPE DEFINITIONS ---
interface University {
  is_active: boolean;
}

interface Profile {
  user_role: string;
  universities: University | University[] | null;
}

export const handleStudentSignup = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password, fullName, university_id, course } = req.body;
    if (!email || !password || !fullName || !university_id || !course) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const data = await signupStudent(req.body);

    return res.status(201).json({
      message: 'Signup successful! Please check your email for verification.',
      user: data.user
    });

  } catch (error: any) {
    console.error('Signup Controller Error:', error.message);
    return res.status(error.status || 400).json({ error: error.message });
  }
};

export const handleStudentLogin = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const loginData = await loginStudent(req.body);
    if (!loginData.user) {
      return res.status(400).json({ error: 'Login failed, user not found.' });
    }

    const { data, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select(`
        user_role,
        universities ( is_active ) 
      `)
      .eq('id', loginData.user.id)
      .single();

    if (profileError) {
      throw new Error("Could not fetch user profile: " + profileError.message);
    }

    const profile = data as Profile;
    const isActive = Array.isArray(profile.universities)
      ? profile.universities[0]?.is_active || false
      : profile.universities?.is_active || false;

    return res.status(200).json({
      message: 'Login successful!',
      session: loginData.session,
      user: {
        id: loginData.user.id,
        email: loginData.user.email,
        role: profile.user_role,
        isUniversityActive: isActive
      }
    });

  } catch (error: any) {
    console.error('Login Controller Error:', error.message);
    if (error.message.includes("Invalid login credentials")) {
      return res.status(401).json({ error: "Invalid email or password." });
    }
    return res.status(error.status || 400).json({ error: error.message });
  }
};

export const handleForgotPassword = async (req: AuthRequest, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required.' });
    }
    await forgotPassword(email);
    return res.status(200).json({
      message: 'If an account with this email exists, a password reset link has been sent.',
    });
  } catch (error: any) {
    console.error('Forgot Password Controller Error:', error.message);
    return res.status(200).json({
      message: 'If an account with this email exists, a password reset link has been sent.',
    });
  }
};

export const handleUpdateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: User not found in token.' });
    }

    const { university_id, course } = req.body;
    if (!university_id || !course) {
      return res.status(400).json({ error: 'University and course are required.' });
    }

    const updatedProfile = await updateUserProfile(userId, { university_id, course });

    return res.status(200).json({
      message: 'Profile updated successfully!',
      profile: updatedProfile,
    });
  } catch (error: any) {
    console.error('Update Profile Controller Error:', error.message);
    return res.status(error.status || 400).json({ error: error.message });
  }
};
