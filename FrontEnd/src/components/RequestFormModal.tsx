// src/components/RequestFormModal.tsx

import { useState } from "react";
import { supabase } from "../supabaseClient";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface RequestFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RequestFormModal({
  isOpen,
  onClose,
}: RequestFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    mobile_number: "",
    budget: "",
    gender: "",
    location: [] as string[],
    customLocation: "",
    room_type: "",
    comments: "",
    needed_from: "",
  });

  const [loading, setLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addLocation = () => {
    if (currentLocation && currentLocation !== "other") {
      setFormData({
        ...formData,
        location: [...formData.location, currentLocation],
      });
      setCurrentLocation("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalLocations: string[] = [];

      if (currentLocation === "other" && formData.customLocation) {
        finalLocations = [...formData.location, formData.customLocation];
      } else {
        finalLocations = [...formData.location];
      }

      const { error } = await supabase.from("room_location_forms").insert([
        {
          name: formData.name,
          mobile_number: formData.mobile_number,
          budget: parseInt(formData.budget),
          gender: formData.gender,
          location: finalLocations,
          room_type: formData.room_type,
          comments: formData.comments,
          needed_from: formData.needed_from,
        },
      ]);

      if (error) throw error;

      const message = `🏠 Room Request:
  Name: ${formData.name}
  Mobile: ${formData.mobile_number}
  Budget: ₹${formData.budget}
  Gender: ${formData.gender}
  Location: ${finalLocations.join(" , ")}
  Room Type: ${formData.room_type}
  Comments: ${formData.comments}
  Needed From: ${formData.needed_from}`;

      window.open(
        `https://wa.me/917607844279?text=${encodeURIComponent(message)}`,
        "_blank"
      );

      // Form reset
      setFormData({
        name: "",
        mobile_number: "",
        budget: "",
        gender: "",
        location: [],
        customLocation: "",
        room_type: "",
        comments: "",
        needed_from: "",
      });
      setCurrentLocation("");
      onClose();
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            <h1 className="text-3xl font-extrabold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-500">
              <span className="font-[Allura] text-4xl">
                <span style={{ color: "#38b6ff" }}>Camp</span>
                <span style={{ color: "#e30613" }}>Sum</span>
              </span>
              <br />
              Find Your Room
            </h1>
          </DialogTitle>
          <DialogDescription className="text-center pb-4">
            Fill out the form below and we’ll help you find the perfect
            accommodation.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 px-2">
          {/* Name */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Name *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Mobile Number *
            </label>
            <input
              type="tel"
              name="mobile_number"
              required
              value={formData.mobile_number}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Budget */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Monthly Rent Budget *
            </label>
            <input
              type="number"
              name="budget"
              required
              value={formData.budget}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Gender *
            </label>
            <select
              name="gender"
              required
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Preferred Location(s) *
            </label>
            <div className="flex gap-3">
              <select
                value={currentLocation}
                onChange={(e) => setCurrentLocation(e.target.value)}
                className="flex-1 border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
              >
                <option value="">Select</option>
                {["Lanka", "Bhagwanpur", "Chhittupur", "other"]
                  .filter((loc) => !formData.location.includes(loc))
                  .map((loc) => (
                    <option key={loc} value={loc}>
                      {loc === "other" ? "Other" : loc}
                    </option>
                  ))}
              </select>

              {currentLocation !== "other" && currentLocation && (
                <button
                  type="button"
                  onClick={addLocation}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-red-500 text-white rounded-xl shadow-md hover:from-blue-700 hover:to-red-600 transition"
                >
                  Add
                </button>
              )}
            </div>

            {formData.location.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {formData.location.map((loc, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {i + 1}. {loc}
                  </span>
                ))}
              </div>
            )}

            {currentLocation === "other" && (
              <input
                type="text"
                placeholder="Enter location"
                value={formData.customLocation}
                onChange={(e) =>
                  setFormData({ ...formData, customLocation: e.target.value })
                }
                className="mt-3 w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            )}
          </div>

          {/* Room Type */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Room Type *
            </label>
            <select
              name="room_type"
              required
              value={formData.room_type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
            >
              <option value="">Select</option>
              <option>Private Room</option>
              <option>Sharing Room</option>
              <option>PG</option>
              <option>Hostel</option>
              <option>Flat</option>
              <option>Any</option>
            </select>
          </div>

          {/* Comments */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Anything else
            </label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Room needed from *
            </label>
            <input
              type="date"
              name="needed_from"
              required
              value={formData.needed_from}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:to-red-600 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit & WhatsApp"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
