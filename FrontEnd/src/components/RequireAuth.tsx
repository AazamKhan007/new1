import { useEffect, useState, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const [checking, setChecking] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const location = useLocation();

  // Build full returnTo (path + query)
  const returnTo = `${location.pathname}${location.search || ""}`;

  useEffect(() => {
    let active = true;

    const check = async () => {
      const { data } = await supabase.auth.getSession();
      const hasUser = !!data.session?.user;
      if (!active) return;
      console.log("[RequireAuth] initial session user =", hasUser ? "YES" : "NO");
      setIsAuthed(hasUser);
      setChecking(false);
    };

    check();

    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      const hasUser = !!session?.user;
      console.log("[RequireAuth] onAuthStateChange user =", hasUser ? "YES" : "NO");
      setIsAuthed(hasUser);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  if (checking) return null; // or a small loader

  if (!isAuthed) {
    console.log("[RequireAuth] not authed → redirect to signup with returnTo:", returnTo);
    return <Navigate to={`/signup?returnTo=${encodeURIComponent(returnTo)}`} replace />;
  }

  return <>{children}</>;
}
