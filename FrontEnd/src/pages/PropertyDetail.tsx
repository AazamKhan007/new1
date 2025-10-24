// src/pages/PropertyDetail.tsx

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { supabase } from "../supabaseClient";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import {
  IndianRupee,
  MapPin,
  BedDouble,
  Users,
  Check,
  ShieldAlert,
  Link, // --- NEW IMPORT ---
} from "lucide-react";

// Interface for User Profile
interface UserProfile {
  full_name: string | null;
  phone_number: string | null;
  course: string | null;
  universities: {
    name: string;
    city: string;
    state: string;
  } | null;
}

// Interface for Property
interface Property {
  id: number;
  title: string;
  description: string | null;
  rent: number | null;
  photos: string[] | null;
  is_active: boolean;
  property_type: string | null;
  address: string | null;
  city: string | null;
  deposit: number | null;
  amenities: string[] | null;
  gender_type: string | null;
  code?: string | null;
}

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [selectedImage, setSelectedImage] = useState(0); // No longer needed

  useEffect(() => {
    const fetchUserAndProperty = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);

      try {
        // 1. Fetch User
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);

        if (user) {
          // 2. Fetch User Profile with University details
          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select(
              `
              full_name, 
              phone_number, 
              course,
              universities (
                name,
                city,
                state
              )
            `
            )
            .eq("id", user.id)
            .single();

          if (profileError) {
            console.warn("Could not fetch user profile:", profileError.message);
          } else {
            setUserProfile(profileData);
          }
        }

        // 3. Fetch Property
        const { data, error } = await supabase
          .from("accommodations")
          .select("*")
          .eq("id", id)
          .eq("is_active", true)
          .single();

        if (error) throw error;
        if (!data) throw new Error("Property not found or is not active.");
        setProperty(data);
      } catch (err: unknown) {
        let errorMessage = "Failed to load property details.";
        if (err instanceof Error) {
          errorMessage = err.message;
        }
        console.error("Error fetching details:", err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchUserAndProperty();
  }, [id]);

  const handleWhatsAppClick = () => {
    if (!user) {
      alert("Please login to show interest.");
      return;
    }
    if (!property) {
      alert("Property details not loaded yet.");
      return;
    }

    // Helper function to clean text
    const cleanText = (text: string | null | undefined) => {
      if (!text) return "N/A";
      return text.replace(/[\n\r\[\]\{\}]/g, " ").trim();
    };

    const cleanedTitle = cleanText(property.title);
    const cleanedAddress = cleanText(property.address);
    const cleanedName = cleanText(userProfile?.full_name);
    const universityName = userProfile?.universities?.name || "N/A";
    const universityLocation = userProfile?.universities
      ? `${userProfile.universities.city}, ${userProfile.universities.state}`
      : "N/A";

    const message = `👋 Hello CampSum,
I am interested in this property:

Property Code: ${property.code || "N/A"} 
Property: ${cleanedTitle}
Rent: ₹${property.rent || "N/A"}
Location: ${property.city || "N/A"}
Property Address: ${cleanedAddress}

My Details:
Name: ${cleanedName} 
Email: ${user?.email || "N/A"} 
Phone: ${userProfile?.phone_number || "N/A"}
Course: ${userProfile?.course || "N/A"}
University: ${universityName}
University Location: ${universityLocation}

Please get in touch with me.
Thank you!`;

    window.open(
      `https://wa.me/917607844279?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="h-16 w-16 animate-spin rounded-full border-8 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col justify-center items-center min-h-screen text-center px-4">
          <ShieldAlert className="h-20 w-20 text-red-500 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Property Not Found
          </h1>
          <p className="text-gray-600">
            {error || "This property may be hidden or does not exist."}
          </p>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* --- CHANGED: Layout simplified to 1 column --- */}
      <div className="container mx-auto max-w-3xl px-4 py-10">
        {/* Centered with max-w-3xl */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {property.title}
          </h1>

          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="h-5 w-5 mr-1.5" />
            <span>{property.address || property.city}</span>
          </div>
          {/* --- NEW: Main Property Image --- */}
          {property.photos && property.photos[0] && (
            <div className="w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-lg my-6">
              <img
                src={property.photos[0]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          {/* --- END NEW: Main Property Image --- */}

          <div className="flex items-baseline text-4xl font-extrabold text-blue-600 mb-4">
            <IndianRupee className="h-7 w-7" />
            {property.rent ? property.rent.toLocaleString() : "N/A"}
            <span className="text-lg font-normal text-gray-500 ml-1">
              /month
            </span>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <span className="flex items-center text-md text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full font-medium">
              <BedDouble className="h-5 w-5 mr-2 text-blue-500" />
              {property.property_type || "N/A"}
            </span>
            <span className="flex items-center text-md text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full font-medium">
              <Users className="h-5 w-5 mr-2 text-blue-500" />
              {property.gender_type || "Any"}
            </span>
          </div>

          {property.deposit && (
            <p className="text-md text-gray-700 mb-4">
              <strong>Deposit:</strong> ₹{property.deposit.toLocaleString()}
            </p>
          )}

          {property.description && (
            <>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Description
              </h3>
              <p className="text-gray-600 mb-6">{property.description}</p>
            </>
          )}

          {property.amenities && property.amenities.length > 0 && (
            <>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Amenities
              </h3>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {property.amenities.map((item, index) => (
                  <span key={index} className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 mr-2 text-green-500" />
                    {item}
                  </span>
                ))}
              </div>
            </>
          )}

          {/* --- UPDATED: Photo Gallery Grid --- */}
          {property.photos && property.photos.length > 0 && (
            <>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Property Gallery
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {property.photos.map((url, index) => (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block overflow-hidden rounded-lg shadow-md transition-transform hover:scale-105"
                  >
                    <img
                      src={url}
                      alt={`Property Photo ${index + 1}`}
                      className="h-40 w-full object-cover"
                    />
                  </a>
                ))}
              </div>
            </>
          )}
          {/* --- END UPDATED SECTION --- */}

          <Button
            onClick={handleWhatsAppClick}
            size="lg"
            className="w-full text-lg bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:from-green-600 hover:to-green-700"
          >
            I'm Interested (WhatsApp)
          </Button>
        </div>
      </div>
    </div>
  );
}
