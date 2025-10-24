"use client";

import React, { useState } from "react";
import Navbar from "./Navbar";
import { supabase } from "../supabaseClient";

export default function BloodDonation() {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    email: "",
    city: "",
    lastDonated: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      fullName,
      age,
      gender,
      bloodGroup,
      phone,
      email,
      city,
      lastDonated,
    } = formData;

    // ✅ Insert data into Supabase table "blood_donors"
    const { data, error } = await supabase.from("blood_donors").insert([
      {
        full_name: fullName,
        age: Number(age),
        gender,
        blood_group: bloodGroup,
        phone,
        email: email || null,
        city,
        last_donated: lastDonated || null,
      },
    ]);

    if (error) {
      console.error("Error inserting data:", error);
      alert("Failed to register. Please try again.");
      return;
    }

    // ✅ Send WhatsApp notification
    const targetNumber = "917607844279";
    const message = `🩸 *Blood Donor Registration* 🩸
Name: ${fullName}
Age: ${age}
Gender: ${gender}
Blood Group: ${bloodGroup}
Phone: ${phone}
Email: ${email || "N/A"}
City: ${city}
Last Donated: ${lastDonated || "N/A"}`;

    window.open(
      `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const inputClass =
    "w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500";

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      <Navbar />

      <div className="max-w-xl mx-auto bg-white p-8 shadow-xl rounded-2xl border mt-10">
        <h1 className="text-2xl font-bold mb-6 text-center text-red-600">
          Blood Donation Registration
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className={inputClass}
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            min={18}
            value={formData.age}
            onChange={handleChange}
            required
            className={inputClass}
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className={inputClass}
          />

          <input
            type="email"
            name="email"
            placeholder="Email (optional)"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            className={inputClass}
          />

          <label className="block">
            Last Donated Date (optional):
            <input
              type="date"
              name="lastDonated"
              value={formData.lastDonated}
              onChange={handleChange}
              className={`${inputClass} mt-1`}
            />
          </label>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold"
          >
            Send to WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
