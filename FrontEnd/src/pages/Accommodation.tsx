// src/pages/Accommodation.tsx

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { supabase } from "../supabaseClient";
import RequestFormModal from "@/components/RequestFormModal";
import { Button } from "@/components/ui/button";
import { IndianRupee, MapPin, BedDouble, Users } from "lucide-react";

// --- NEW IMPORT ---
// Import your logo
import campsumLogo from "@/components/campsumlogo.png";
// --- END NEW IMPORT ---

interface Property {
  id: number;
  title: string;
  rent: number | null;
  photos: string[] | null;
  city: string | null;
  property_type: string | null;
  gender_type: string | null;
}

export default function Accommodation() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("accommodations")
          .select("id, title, rent, photos, city, property_type, gender_type")
          .eq("is_active", true)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setProperties(data || []);
      } catch (err: unknown) {
        let message = "Failed to load properties.";
        if (err instanceof Error) message = err.message;
        console.error("Error fetching properties:", err);
        alert(`❌ ${message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center pt-6 pb-4 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800">
            Available Properties
          </h1>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-red-500 text-white shadow-lg hover:from-blue-700 hover:to-red-600"
          >
            Request a Room
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No Properties Found
            </h2>
            <p className="text-gray-500">
              No active listings available right now. You can use the "Request a
              Room" button.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((prop) => (
              <Link
                to={`/accommodation/${prop.id}`}
                key={prop.id}
                className="block group"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  {/* --- UPDATED: Show Property Image or Logo --- */}
                  <div className="h-56 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    {prop.photos && prop.photos[0] ? (
                      <img
                        src={prop.photos[0]}
                        alt={prop.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <img
                        src={campsumLogo}
                        alt="Campsum"
                        className="w-auto h-24 object-contain p-4"
                      />
                    )}
                  </div>
                  {/* --- END UPDATE --- */}

                  <div className="p-5">
                    <h3
                      className="text-xl font-bold text-gray-900 truncate mb-2"
                      title={prop.title}
                    >
                      {prop.title}
                    </h3>

                    <div className="flex items-center text-lg font-semibold text-blue-600 mb-3">
                      <IndianRupee className="h-5 w-5 mr-1" />
                      {prop.rent
                        ? `${prop.rent.toLocaleString()}/month`
                        : "N/A"}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        <BedDouble className="h-4 w-4 mr-1.5 text-gray-500" />
                        {prop.property_type || "N/A"}
                      </span>
                      <span className="flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        <Users className="h-4 w-4 mr-1.5 text-gray-500" />
                        {prop.gender_type || "Any"}
                      </span>
                      <span className="flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        <MapPin className="h-4 w-4 mr-1.5 text-gray-500" />
                        {prop.city || "N/A"}
                      </span>
                    </div>

                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-blue-600 to-red-500 text-white shadow-md hover:from-blue-700 hover:to-red-600"
                    >
                      <span>View Details</span>
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <RequestFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
