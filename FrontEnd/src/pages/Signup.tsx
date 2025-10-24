import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Link } from "lucide-react";

// Eye icons
const EyeIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </svg>
);

// Hardcoded universities
const universities = [
  { id: "d7d2ad4c-4844-4de6-81a8-349a00858ba4", name: "Banaras Hindu University" },
  { id: "8265a863-0d0d-4e9b-a210-fbc0c963281c", name: "Mahatma Gandhi Kashi Vidyapith" },
  { id: "caa18758-f30a-4ae2-88d9-7cff5733f3d0", name: "Lucknow University" },
  { id: "c70c734b-36ce-4659-8333-c68f0e0a6d9f", name: "Delhi University" },
  { id: "9c047679-552e-49fd-adf5-1daf0e4ecf1c", name: "IIT Bombay" },
];

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [universityId, setUniversityId] = useState("");
  const [course, setCourse] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false); // ✅ Added checkbox state

  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = new URLSearchParams(location.search).get("returnTo") || "";

  // password strength checks
  const hasNumber = /\d/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isLongEnough = password.length >= 8;

  // Normal Signup
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreeTerms) {
      toast.error("You must agree to the Terms and Conditions.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login?verified=1${returnTo ? `&returnTo=${encodeURIComponent(returnTo)}` : ""}`,
          data: {
            full_name: fullName?.trim() || "",
            draft_university_id: universityId && universityId.trim() !== "" ? universityId : null,
            draft_course: course?.trim() || "",
          },
        },
      });

      if (error) {
        const msg = error.message.toLowerCase();
        if (msg.includes("already registered") || error.status === 422) {
          toast.error("This email is already registered. Please log in.");
          navigate(`/login${returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ""}`);
          return;
        }
        throw error;
      }

      if (!error && !data.user?.identities?.length) {
        toast.error("This email is already registered. Please log in.");
        navigate(`/login${returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ""}`);
        return;
      }

      toast.success("Account created 🎉 Please verify your email.");
      navigate("/verify-email");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
        toast.error(err.message || "Signup failed");
      } else {
        console.error(err);
        toast.error("Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  // Google Signup
  const handleGoogleSignup = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/complete-profile?method=google${returnTo ? `&returnTo=${encodeURIComponent(returnTo)}` : ""}`,
        queryParams: { access_type: "offline", prompt: "consent" },
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-red-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-gray-100">
        {/* Logo */}
        <div className="text-center">
          <h2 className="text-5xl font-allura font-bold">
            <span className="text-[#38b6ff]">Camp</span>
            <span className="text-[#e30613]">Sum</span>
          </h2>
          <h1 className="text-2xl font-bold text-gray-800 mt-2 font-sans">Create a Student Account</h1>
          <p className="mt-2 text-gray-500 font-sans">Join the CampSum community!</p>
        </div>

        {/* Google Signup */}
        <button
          onClick={handleGoogleSignup}
          type="button"
          className="w-full flex items-center justify-center gap-3 py-3 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow hover:bg-gray-50"
        >
          <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5" />
          Sign up with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-4 font-sans">
          <div>
            <label className="block text-sm font-medium text-gray-600">Full Name</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Select University</label>
            <select value={universityId} onChange={(e) => setUniversityId(e.target.value)} required className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white">
              <option value="" disabled>-- Select your university --</option>
              {universities.map((uni) => (
                <option key={uni.id} value={uni.id}>{uni.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Course</label>
            <input type="text" value={course} onChange={(e) => setCourse(e.target.value)} required placeholder="e.g., B.Tech CSE" className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
          </div>

          {/* Password + Strength */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                required
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {isPasswordFocused && (
            <div className="space-y-1 text-xs p-2 bg-gray-50 rounded-md">
              <p className={isLongEnough ? "text-green-600" : "text-gray-500"}>• At least 8 characters</p>
              <p className={hasUpperCase ? "text-green-600" : "text-gray-500"}>• One uppercase letter (A-Z)</p>
              <p className={hasLowerCase ? "text-green-600" : "text-gray-500"}>• One lowercase letter (a-z)</p>
              <p className={hasNumber ? "text-green-600" : "text-gray-500"}>• One number (0-9)</p>
              <p className={hasSpecialChar ? "text-green-600" : "text-gray-500"}>• One special character (!@#...)</p>
            </div>
          )}

          {/* ✅ Terms and Conditions Checkbox */}
          <div className="flex items-start gap-2 text-sm text-gray-500">
            <input
              type="checkbox"
              id="agreeTerms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-1 accent-blue-500"
              required
            />
            <label htmlFor="agreeTerms" className="leading-snug">
              I agree to the{" "}
              <a className="text-blue-600 hover:underline" href="/terms">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a className="text-blue-600 hover:underline" href="/privacy">
                Privacy Policy
              </a>{" "}
              of our website.
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || !agreeTerms}
            className={`w-full py-3 px-4 text-white font-medium rounded-md shadow ${
              loading || !agreeTerms ? "bg-blue-300 cursor-not-allowed" : "bg-[#38b6ff] hover:bg-blue-600"
            }`}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="font-medium text-[#38b6ff] hover:text-blue-600">Log in</a>
        </p>
      </div>
    </div>
  );
}
