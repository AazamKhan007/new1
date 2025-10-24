import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const run = async () => {
      try {
        await supabase.auth.signOut();
        // (Optional) LocalStorage keys cleanup (rarely needed, but safe)
        Object.keys(localStorage).forEach((k) => {
          if (k.startsWith("sb-") && k.includes("-auth-token")) {
            localStorage.removeItem(k);
          }
        });
      } finally {
        navigate("/", { replace: true });
      }
    };
    run();
  }, [navigate]);

  return null;
}
