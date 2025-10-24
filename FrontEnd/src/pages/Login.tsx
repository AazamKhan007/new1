import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { toast } from "sonner";

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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // optional: /login?verified=1 par success toast
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("verified") === "1") {
      toast.success("Email verified! Please log in.");
    }
  }, [location.search]);

  // ✅ Check provider while typing email
  useEffect(() => {
    if (!email) {
      setIsGoogleUser(false);
      return;
    }

    const timer = setTimeout(async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("provider")
        .eq("email", email.toLowerCase())
        .single();

      if (!error && data?.provider === "google") {
        setIsGoogleUser(true);
      } else {
        setIsGoogleUser(false);
      }
    }, 300); // debounce

    return () => clearTimeout(timer);
  }, [email]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Invalid login credentials");
      return;
    }

    if (data?.user) {
      toast.success("Login successful 🎉");
      navigate("/");
    }
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
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
          <h1 className="text-2xl font-bold text-gray-800 mt-2 font-sans">Welcome Back</h1>
          <p className="mt-2 text-gray-500 font-sans">Log in to continue</p>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full flex items-center justify-center gap-3 py-3 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow hover:bg-gray-50"
        >
          <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5" />
          Log in with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 font-sans">
          <div>
            <label className="block text-sm font-medium text-gray-600">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500">
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {/* Forgot Password - conditional */}
          <div className="flex justify-end">
            {isGoogleUser ? (
              <p className="text-sm text-orange-500 mt-1">
                This account uses Google Sign-In. Please click “Sign in with Google”.
              </p>
            ) : (
              <a href="/forgot-password" className="text-sm text-[#38b6ff] hover:text-blue-600">
                Forgot Password?
              </a>
            )}
          </div>

          <button type="submit" disabled={loading} className="w-full py-3 px-4 text-white font-medium rounded-md shadow bg-[#38b6ff] hover:bg-blue-600">
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <a href="/signup" className="font-medium text-[#38b6ff] hover:text-blue-600">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
