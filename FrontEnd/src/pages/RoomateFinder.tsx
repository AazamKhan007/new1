import React, { useState } from "react";
import Navbar from "./Navbar";
import { supabase } from "../supabaseClient";

export default function RoommateFinder() {
  const [listingType, setListingType] = useState<
    "looking" | "have_room" | null
  >(null);
  const [formData, setFormData] = useState({
    gender_pref: "",
    roommates_count: "",
    moving_date: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!listingType) return;

    setLoading(true);
    try {
      // Insert data according to DB schema
      const { data, error } = await supabase.from("roommate_listings").insert({
        listing_type: listingType,
        gender_pref: formData.gender_pref || null,
        roommates_count: formData.roommates_count
          ? Number(formData.roommates_count)
          : null,
        moving_date: formData.moving_date || null,
        description: formData.description,
      });

      if (error) throw error;

      const message = encodeURIComponent(
        `New Roommate Listing:
Type: ${
          listingType === "looking"
            ? "Looking for a Roommate"
            : "Have a Room to Share"
        }
Gender Preference: ${formData.gender_pref || "Any"}
Roommates Count: ${formData.roommates_count || "Not specified"}
Moving Date: ${formData.moving_date || "Not specified"}
Description: ${formData.description}`
      );

      // Redirect to WhatsApp
      window.open(`https://wa.me/917607844279?text=${message}`, "_blank");

      setSuccess(true);
      setFormData({
        gender_pref: "",
        roommates_count: "",
        moving_date: "",
        description: "",
      });
      setListingType(null); // reset to buttons view
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <div className="flex flex-col items-center justify-center flex-grow p-6">
        <h1 className="text-3xl font-bold mb-6">
          <span className="text-blue-600">Roommate</span>{" "}
          <span className="text-red-600">Finder</span>
        </h1>

        {!listingType && (
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setListingType("looking")}
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:opacity-90 transition"
            >
              Looking for a Roommate
            </button>
            <button
              onClick={() => setListingType("have_room")}
              className="px-6 py-3 rounded-xl bg-red-600 text-white font-semibold hover:opacity-90 transition"
            >
              Have a Room to Share
            </button>
          </div>
        )}

        {listingType && (
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
            {success && (
              <p className="mb-4 text-green-600 font-medium text-center">
                🎉 Listing created successfully!
              </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Gender Preference (optional)
                </label>
                <input
                  name="gender_pref"
                  value={formData.gender_pref}
                  onChange={handleChange}
                  placeholder="e.g. Female, Male, Any"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Number of Roommates
                </label>
                <input
                  type="number"
                  name="roommates_count"
                  value={formData.roommates_count}
                  onChange={handleChange}
                  min={1}
                  placeholder="e.g. 2"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Moving Date
                </label>
                <input
                  type="date"
                  name="moving_date"
                  value={formData.moving_date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Description / Preferences
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe the room, location, rent, preferences..."
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-400"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Upload Image (optional)
                </label>
                <input type="file" accept="image/*" className="w-full" />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-red-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? "Sending..." : "Post Listing"}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Footer placeholder */}
    </div>
  );
}
