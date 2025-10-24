import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { toast } from "sonner";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showBlurScreen, setShowBlurScreen] = useState(false);
  const [showWaitMessage, setShowWaitMessage] = useState(false);
  const [inlineMessage, setInlineMessage] = useState<React.ReactNode | null>(
    null
  );

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setInlineMessage(null);
    setLoading(true);
    setShowBlurScreen(true);
    setShowWaitMessage(false);

    const waitTimeout = setTimeout(() => setShowWaitMessage(true), 5000);

    try {
      const res = await fetch("/api/check-provider", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!data.exists) {
        toast.error("No account found with this email.");
        return;
      }

      if (data.provider === "google") {
        setInlineMessage(
          <>
            This account uses Google Sign-In. Please{" "}
            <a
              href="/login"
              className="font-medium text-[#38b6ff] hover:text-blue-600"
            >
              Log In
            </a>{" "}
            instead.
          </>
        );
        return;
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast.error("Failed to send reset link. Please try again.");
      } else {
        toast.success("Password reset link sent successfully! 🎉");
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      clearTimeout(waitTimeout);
      setShowBlurScreen(false);
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden px-4">
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100" />

      {showBlurScreen && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex flex-col items-center justify-center z-50">
          <div className="relative">
            <h2 className="text-5xl font-allura font-bold">
              <span
                className="text-fill-animation"
                style={{
                  backgroundImage:
                    "linear-gradient(to top, #38b6ff 50%, #d1d5db 50%)",
                }}
              >
                Camp
              </span>
              <span
                className="text-fill-animation"
                style={{
                  backgroundImage:
                    "linear-gradient(to top, #e30613 50%, #d1d5db 50%)",
                }}
              >
                Sum
              </span>
            </h2>
          </div>
          {showWaitMessage && (
            <p className="mt-4 text-gray-600 font-medium fade-in-message">
              Connecting securely, please wait
              <span className="dot-anim">...</span>
            </p>
          )}
        </div>
      )}

      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-200">
        <div className="text-center">
          <h2 className="text-5xl font-allura font-bold">
            <span className="text-[#38b6ff]">Camp</span>
            <span className="text-[#e30613]">Sum</span>
          </h2>
          <h1 className="text-2xl font-bold text-gray-800 mt-2 font-sans">
            Forgot Password
          </h1>
          <p className="mt-2 text-gray-500 font-sans">
            Enter your email to receive a password reset link.
          </p>
        </div>

        <form onSubmit={handleForgotPassword} className="space-y-4 font-sans">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (inlineMessage) {
                  setInlineMessage(null);
                }
              }}
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {inlineMessage && (
            <p className="text-center text-sm text-gray-500 pt-2">
              {inlineMessage}
            </p>
          )}

          {/* Button wil only show when inlineMessage not occur */}
          {!inlineMessage && (
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 text-white font-medium rounded-md shadow bg-[#38b6ff] hover:bg-blue-600 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
