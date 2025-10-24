import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import Navbar from "./Navbar"; // add your Navbar component here

export default function Marketplace() {
  const [type, setType] = useState<"buy" | "sell">("buy");
  const [formData, setFormData] = useState({
    description: "",
    category: "",
    location: "",
    budget: "",
    price: "",
    negotiable: false,
    condition: "",
    images: [] as File[],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const {
      name,
      value,
      type: inputType,
      checked,
      files,
    } = e.target as HTMLInputElement;
    if (inputType === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (inputType === "file" && files) {
      setFormData({ ...formData, images: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const message =
      type === "buy"
        ? `Buy Request:
Description: ${formData.description}
Category: ${formData.category}
Location: ${formData.location}
Budget: ${formData.budget}`
        : `Sell Listing:
Description: ${formData.description}
Category: ${formData.category}
Location: ${formData.location}
Condition: ${formData.condition}
Price: ${formData.price}
Negotiable: ${formData.negotiable ? "Yes" : "No"}`;

    try {
      // Store data in Supabase (excluding images)
      const { error } = await supabase.from("marketplace_listings").insert([
        {
          type,
          description: formData.description,
          category: formData.category,
          location: formData.location,
          budget: type === "buy" ? Number(formData.budget) : null,
          price: type === "sell" ? Number(formData.price) : null,
          negotiable: type === "sell" ? formData.negotiable : null,
          condition: type === "sell" ? formData.condition : null,
        },
      ]);

      if (error) throw error;

      // Redirect to WhatsApp with prefilled message
      window.open(
        `https://wa.me/917607844279?text=${encodeURIComponent(message)}`,
        "_blank"
      );

      // Reset form
      setFormData({
        description: "",
        category: "",
        location: "",
        budget: "",
        price: "",
        negotiable: false,
        condition: "",
        images: [],
      });
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("❌ Something went wrong while storing data!");
    }
  };

  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition";

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 flex items-center justify-center px-4 pt-4">
        <div className="bg-white w-full max-w-2xl shadow-xl rounded-2xl p-8 border border-gray-200">
          <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
            Campus Marketplace
          </h1>

          {/* Toggle Buttons */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-full bg-gray-100 p-1 shadow-inner">
              <button
                type="button"
                onClick={() => setType("buy")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                  type === "buy"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:text-blue-700"
                }`}
              >
                Buy Item
              </button>
              <button
                type="button"
                onClick={() => setType("sell")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                  type === "sell"
                    ? "bg-red-600 text-white shadow-md"
                    : "text-gray-700 hover:text-red-700"
                }`}
              >
                Sell Item
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <textarea
              name="description"
              placeholder="Describe the item or requirement"
              className={`${inputClass} min-h-[100px]`}
              value={formData.description}
              onChange={handleChange}
              required
            />
            <input
              name="category"
              placeholder="Category (e.g. books, bike)"
              className={inputClass}
              value={formData.category}
              onChange={handleChange}
              required
            />
            <input
              name="location"
              placeholder="Location"
              className={inputClass}
              value={formData.location}
              onChange={handleChange}
              required
            />

            {type === "buy" && (
              <input
                name="budget"
                type="number"
                placeholder="Budget"
                className={inputClass}
                value={formData.budget}
                onChange={handleChange}
                required
              />
            )}

            {type === "sell" && (
              <>
                <input
                  name="price"
                  type="number"
                  placeholder="Price"
                  className={inputClass}
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="negotiable"
                    checked={formData.negotiable}
                    onChange={handleChange}
                    className="h-4 w-4 text-red-600 border-gray-300 rounded"
                  />
                  <label className="text-sm text-gray-700">
                    Price Negotiable
                  </label>
                </div>
                <input
                  name="condition"
                  placeholder="Condition (new, used, worn-out)"
                  className={inputClass}
                  value={formData.condition}
                  onChange={handleChange}
                  required
                />
                <div className="text-red-600">
                  *Please share image of product to WhatsApp number
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-red-600 text-white font-semibold shadow-lg hover:from-red-600 hover:to-blue-600 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
