// src/...(your-path)/Profile.tsx

import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import Logo from "../components/campsumlogo.png";

// Interface is unchanged
interface ProfileData {
  id: string;
  full_name: string | null;
  user_role: string | null;
  updated_at: string | null;
  university_id: string | null;
  course: string | null;
  phone_number: string | null;
  email: string | null;
  university_name: string | null;
}

const UNIVERSITY_CHANGE_FORM_URL = "https://forms.gle/pLCTDJYwx7Y6cLHGA";

export default function Profile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      let tempProfile: Omit<ProfileData, "university_name"> & {
        university_name: string | null;
      } = {
        id: "",
        full_name: null,
        user_role: null,
        updated_at: null,
        university_id: null,
        course: null,
        phone_number: null,
        email: null,
        university_name: null,
      };

      try {
        // 1. Get current user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;
        if (!user) {
          navigate("/login");
          return;
        }

        // 2. FETCH PROFILE DATA (without join)
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select(
            `
              id,
              full_name,
              user_role,
              updated_at,
              university_id,
              course,
              phone_number,
              email
            `
          )
          .eq("id", user.id)
          .maybeSingle();

        if (profileError) throw profileError;

        if (profileData) {
          tempProfile = {
            ...tempProfile,
            ...profileData,
            university_name: null,
          };
          const universityId = profileData.university_id;

          // 3. FETCH UNIVERSITY NAME (if ID exists)
          if (universityId) {
            const { data: universityData, error: universityError } =
              await supabase
                .from("universities")
                .select("name")
                .eq("id", universityId)
                // ✅ CHANGED: .single() to .maybeSingle()
                // This fixes the PGRST116 error by returning null instead of
                // throwing an error if 0 rows are found.
                .maybeSingle();

            if (universityError) throw universityError;

            if (universityData) {
              tempProfile.university_name = universityData.name;
            }
          }

          // 4. Set final state
          setProfile(tempProfile);
        } else {
          console.warn("User is logged in but no profile data found.");
          setProfile(null);
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) navigate("/login");
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-gray-500 p-4 text-center">
        <p className="text-lg mb-4">
          Unable to load profile. This might mean your profile data hasn't been
          created yet.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition"
        >
          Go to Home
        </button>
      </div>
    );
  }

  const universityName = profile.university_name || "Not specified";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100">
      <Navbar />
      <div className="flex justify-center items-center py-12 px-4">
        <Card className="w-full max-w-md shadow-2xl rounded-3xl border border-gray-200 bg-white hover:shadow-indigo-200 transition-shadow duration-300">
          <CardContent className="p-8 space-y-6">
            <div className="flex justify-center">
              <img
                src={Logo}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-indigo-500 shadow-md object-cover"
              />
            </div>

            <h1 className="text-3xl font-bold text-center text-gray-800 tracking-tight">
              My Profile
            </h1>

            <div className="space-y-4 text-gray-700 text-base">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-900">Name</span>
                <span>{profile.full_name || "-"}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-900">Email</span>
                <span>{profile.email || "-"}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-900">Phone</span>
                <span>{profile.phone_number || "-"}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-900">University</span>
                <span>{universityName}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-900">Course</span>
                <span>{profile.course || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">Role</span>
                <span>{profile.user_role || "-"}</span>
              </div>

              {/* University Change Request Link */}
              <div className=" text-center border-t border-dashed pt-4 mt-4">
                <p className="text-sm text-gray-600 mb-2 font-medium">
                  Request for university name change:
                </p>
                <a
                  href={UNIVERSITY_CHANGE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors duration-200 underline"
                >
                  Click here to fill the form
                </a>
                <p className="text-xs text-gray-500 mt-1">
                  *Our team will review and update your profile within 3–5
                  working days after verification.
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-8 pt-0 border-t border-gray-100 mt-6">
            <div className="text-xs text-gray-500 space-y-2">
              <p>
                You can request any data change, deletion, erasure, or “forget
                me” action, or raise any other data policy-related request by
                emailing us at{" "}
                <a
                  href="mailto:admin@campsum.com"
                  className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
                >
                  admin@campsum.com
                </a>
                .
              </p>
              <p>Our team will get in touch with you as soon as possible.</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
