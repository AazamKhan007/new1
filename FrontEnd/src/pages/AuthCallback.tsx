// src/pages/AuthCallback.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // 🔹 extract auth code from URL
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");

        if (code) {
          // 🔹 Supabase exchange
          await supabase.auth.exchangeCodeForSession(code);
        }
      } catch (err) {
        console.error("exchangeCodeForSession failed:", err);
      }

      // ✅ get current session
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;

      if (!session?.user) {
        navigate("/login", { replace: true });
        return;
      }

      const user = session.user;

      // 🔹 fetch profile
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("university_id, course, full_name, email")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Profile fetch error:", error);
        navigate("/signup", { replace: true });
        return;
      }

      // 🔹 ensure profile exists / update missing fields
      if (!profile) {
        const payload: Record<string, unknown> = {
          id: user.id,
          email: user.email,
          full_name:
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            null,
          course: null,
          updated_at: new Date().toISOString(),
        };

        const { error: insertError } = await supabase
          .from("profiles")
          .insert([payload]);

        if (insertError) {
          console.error("Profile insert error:", insertError);
        }

        navigate("/complete-profile", { replace: true });
        return;
      }

      // 🔹 if profile incomplete → go complete-profile
      if (!profile.university_id || !profile.course) {
        navigate("/complete-profile", { replace: true });
        return;
      }

      // ✅ otherwise go home
      navigate("/", { replace: true });
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-sm text-gray-600">Finishing up sign-in…</div>
    </div>
  );
}
