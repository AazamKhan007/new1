import React, { useState } from "react";
import Navbar from "./Navbar";
import { supabase } from "../supabaseClient";

export default function LostFound() {
  const [formData, setFormData] = useState({
    post_type: "lost",
    description: "",
    location: "",
    contact_info: "",
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
    setLoading(true);
    try {
      // Store data in Supabase
      const { error } = await supabase.from("lost_found_posts").insert([
        {
          post_type: formData.post_type,
          description: formData.description,
          location: formData.location,
          contact_info: formData.contact_info,
        },
      ]);

      if (error) throw error;

      setSuccess(true);

      // Pre-fill WhatsApp message
      const message =
        `Hi, I want to report a ${formData.post_type.toUpperCase()} item.\n\n` +
        `Description: ${formData.description}\n` +
        `Location: ${formData.location}\n` +
        `Contact Info: ${formData.contact_info}\n\n` +
        (formData.post_type === "found"
          ? "📸 Please find attached the image of the found item."
          : "If you have an image, please attach it here.");

      const url =
        "https://wa.me/917607844279?text=" + encodeURIComponent(message);
      window.open(url, "_blank");

      // Reset form
      setFormData({
        post_type: "lost",
        description: "",
        location: "",
        contact_info: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error saving post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 pt-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-6">
            <span className="text-blue-600">Lost</span>{" "}
            <span className="text-red-600">&amp; Found</span>
          </h1>

          {success && (
            <p className="mb-4 text-green-600 font-medium text-center">
              ✅ Post saved! You are being redirected to WhatsApp.
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Post Type
              </label>
              <select
                name="post_type"
                value={formData.post_type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="lost">Lost</option>
                <option value="found">Found</option>
              </select>
              {formData.post_type === "found" && (
                <p className="text-sm text-red-500 mt-1">
                  * Please share an image of the found item on WhatsApp after
                  submitting.
                </p>
              )}
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Item Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Describe the item (color, brand, details)..."
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Location Lost/Found
              </label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Library, Hostel Block B..."
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-400"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Your Contact Info
              </label>
              <input
                name="contact_info"
                value={formData.contact_info}
                onChange={handleChange}
                placeholder="Phone number, email, etc."
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-red-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Post & Redirect to WhatsApp"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
