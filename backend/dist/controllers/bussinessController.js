import express from "express";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { supabase } from "../utils/supabaseClient.js";
const app = express();
app.use(express.json());
// Nodemailer transporter (SMTP)
const transporter = nodemailer.createTransport({
    host: "www.campsum.com",
    port: 587,
    secure: false,
    auth: {
        user: "no-reply@campsum.com",
        pass: process.env.EMAIL_PASSWORD
    }
});
// Signup route
app.post("/signup", async (req, res) => {
    try {
        const { email, password, business_name, business_type, contact_person_name, phone } = req.body;
        if (!email || !password || !business_name || !business_type) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        // Create user in Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password
        });
        if (authError)
            return res.status(400).json({ error: authError.message });
        const userId = authData.user?.id;
        if (!userId)
            return res.status(500).json({ error: "Failed to retrieve user ID" });
        // Generate verification token
        const verificationToken = crypto.randomBytes(32).toString("hex");
        // Insert into businesses table
        const { error: insertError } = await supabase
            .from("businesses")
            .insert([
            {
                id: userId,
                business_name,
                business_type,
                contact_person_name,
                email,
                phone,
                password_hash: "",
                is_verified: false,
                verification_token: verificationToken
            }
        ]);
        if (insertError)
            return res.status(400).json({ error: insertError.message });
        // Send verification email
        const verificationUrl = `https://campsum.com/verify/${verificationToken}`;
        await transporter.sendMail({
            from: '"Campsum" <no-reply@campsum.com>',
            to: email,
            subject: "Verify your Campsum account",
            html: `
        <h2>Welcome to Campsum!</h2>
        <p>Click the link below to verify your account:</p>
        <a href="${verificationUrl}">${verificationUrl}</a>
        <p>If you didn’t sign up, you can ignore this email.</p>
      `
        });
        res.status(201).json({ message: "Account created. Please check your email for the verification link." });
    }
    catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});
// Verify route
app.get("/verify/:token", async (req, res) => {
    try {
        const { token } = req.params;
        const { data, error } = await supabase
            .from("businesses")
            .update({ is_verified: true, verification_token: null })
            .eq("verification_token", token)
            .select();
        if (error || !data.length) {
            return res.status(400).json({ error: "Invalid or expired verification token" });
        }
        res.status(200).json({ message: "Account verified successfully. You can now log in." });
    }
    catch (err) {
        console.error("Verification error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});
// Login route
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error)
            return res.status(400).json({ error: error.message });
        const { data: businessData, error: businessError } = await supabase
            .from("businesses")
            .select("is_verified")
            .eq("id", data.user?.id)
            .single();
        if (businessError)
            return res.status(400).json({ error: businessError.message });
        if (!businessData?.is_verified) {
            return res.status(403).json({ error: "Please verify your email before logging in." });
        }
        res.status(200).json({ message: "Login successful", session: data.session, user: data.user });
    }
    catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});
export default app;
