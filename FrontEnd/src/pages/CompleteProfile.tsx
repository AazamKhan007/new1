// src/pages/CompleteProfile.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import type { User } from "@supabase/supabase-js";

interface University {
  id: string;
  name: string;
}

export default function CompleteProfile() {
  const [universityId, setUniversityId] = useState("");
  const [course, setCourse] = useState("");
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  // ye effect function ke andar daalna hai (states ke baad, kisi bhi dusre useEffect se pehle/baad daal sakte ho)

useEffect(() => {
  (async () => {
    const hasHash = window.location.hash.includes("access_token");
    const hasCode = window.location.search.includes("code=");

    if (hasHash || hasCode) {
      try {
        await supabase.auth.exchangeCodeForSession(window.location.href);
        // URL clean kar do taaki token hash query dikhe nahi
        window.history.replaceState({}, "", window.location.pathname + window.location.search);
      } catch (e) {
        console.error("exchangeCodeForSession failed", e);
      }
    }
  })();
}, []);


  // protect route + skip if already complete
  useEffect(() => {
    const protect = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate("/signup", { replace: true });
        return;
      }
      const { data, error } = await supabase
        .from("profiles")
        .select("university_id, course")
        .eq("id", session.user.id)
        .single();

      if (!error && data && data.university_id && data.course) {
        navigate("/", { replace: true });
      }
    };
    protect();
  }, [navigate]);

  useEffect(() => {
    const fetchUniversities = async () => {
      const { data, error } = await supabase.from("universities").select("id, name").eq("is_active", true);
      if (!error && data) setUniversities(data);
    };
    fetchUniversities();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      // ✅ try to read name from Google metadata (or other providers)
    const supaUser: User = user; // type cast once
    const meta = supaUser.user_metadata as Record<string, unknown>;
    const fullNameFromMeta: string | null =
    (typeof meta.full_name === "string" && meta.full_name.trim() !== ""
    ? meta.full_name
    : typeof meta.name === "string"
    ? meta.name
    : null);

      const { error } = await supabase.rpc("upsert_profile_self", {
        p_university_id: universityId || null,
        p_course: course || null,
        p_phone: null,
        p_full_name: fullNameFromMeta, // ✅ previously null
      });

      if (error) {
        console.error("Error upserting profile via RPC:", error);
        return;
      }

      navigate("/"); // success → homepage
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden px-4">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100 animate-gradient" />

      {/* Form Container */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-200">
        <div className="text-center">
          <h2 className="text-5xl font-allura font-bold">
            <span className="text-[#38b6ff]">Camp</span>
            <span className="text-[#e30613]">Sum</span>
          </h2>
          <h1 className="text-2xl font-bold text-gray-800 mt-2 font-sans">Complete Your Profile</h1>
          <p className="mt-2 text-gray-500 font-sans">Welcome! Just one more step to join the CampSum community 🎉</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-sans">
          <div>
            <label className="block text-sm font-medium text-gray-600">Select University</label>
            <select
              value={universityId}
              onChange={(e) => setUniversityId(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="" disabled>-- Select your university --</option>
              {universities.map((uni) => (
                <option key={uni.id} value={uni.id}>{uni.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Course</label>
            <input
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
              placeholder="e.g., B.Tech CSE"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button type="submit" disabled={loading} className="w-full py-3 px-4 text-white font-medium rounded-md shadow bg-[#38b6ff] hover:bg-blue-600 transition">
            {loading ? "Saving..." : "Save & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
