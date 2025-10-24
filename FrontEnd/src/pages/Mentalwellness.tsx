import React, { useState } from "react";
import Navbar from "./Navbar";
import { supabase } from "../supabaseClient";

const MentalWellness: React.FC = () => {
  const [sessionType, setSessionType] = useState("");
  const [otherSession, setOtherSession] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = (document.getElementById("name") as HTMLInputElement).value;
    const roll = (document.getElementById("roll") as HTMLInputElement).value;
    const course = (document.getElementById("course") as HTMLInputElement)
      .value;
    const time = (document.getElementById("time") as HTMLSelectElement).value;
    const concern = (document.getElementById("concern") as HTMLTextAreaElement)
      .value;

    const finalSessionType =
      sessionType === "Other" && otherSession
        ? `Other: ${otherSession}`
        : sessionType;

    // Insert data into Supabase
    await supabase.from("mental_wellness_requests").insert({
      full_name: name,
      student_id: roll,
      course,
      preferred_time: time,
      session_type: finalSessionType,
      concern: concern || null,
    });

    const message = `Hi CampSum team, I need help with mental health services. Please assist me.

My details are:
Full Name: ${name}
Student ID: ${roll}
Course & Year: ${course}
Preferred Time Slot: ${time}
Type of Counselling Session: ${finalSessionType}
Concern: ${concern}

(Note: Please share ID proof separately if required.)`;

    const url = `https://wa.me/917607844279?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 pt-4">
        <div className="max-w-xl w-full bg-white rounded-xl shadow-md p-6 md:p-10">
          <h1 className="text-center mb-6 text-2xl md:text-3xl font-bold">
            FREE MENTAL WELLNESS DESK of{" "}
            <span className="font-allura text-4xl font-bold">
              <span className="text-sky-400">Camp</span>
              <span className="text-red-600">Sum</span>
            </span>
          </h1>

          <div className="space-y-3 mb-8">
            <div className="border-l-4 border-red-600 bg-red-50 px-3 py-2">
              1️⃣ Fill the form
            </div>
            <div className="border-l-4 border-red-600 bg-red-50 px-3 py-2">
              2️⃣ Redirect to WhatsApp
            </div>
            <div className="border-l-4 border-red-600 bg-red-50 px-3 py-2">
              3️⃣ Get Support from our team
            </div>
          </div>

          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label className="font-semibold mt-2">Full Name</label>
            <input
              id="name"
              required
              className="border border-gray-300 rounded-md p-2 mt-1"
              type="text"
            />

            <label className="font-semibold mt-4">Student ID / Roll No.</label>
            <input
              id="roll"
              required
              className="border border-gray-300 rounded-md p-2 mt-1"
              type="text"
            />

            <label className="font-semibold mt-4">Course & Year</label>
            <input
              id="course"
              required
              className="border border-gray-300 rounded-md p-2 mt-1"
              type="text"
            />

            <label className="font-semibold mt-4">Preferred Time Slot</label>
            <select
              id="time"
              required
              className="border border-gray-300 rounded-md p-2 mt-1"
            >
              <option value="">Select</option>
              <option>9 AM - 12 PM</option>
              <option>12 PM - 3 PM</option>
              <option>3 PM - 5 PM</option>
            </select>

            <label className="font-semibold mt-4">
              Type of Counselling Session
            </label>
            <select
              id="sessionType"
              required
              className="border border-gray-300 rounded-md p-2 mt-1"
              value={sessionType}
              onChange={(e) => setSessionType(e.target.value)}
            >
              <option value="">Select</option>
              <option>Career Counselling</option>
              <option>Mental Wellness Counselling</option>
              <option>Other</option>
            </select>

            {sessionType === "Other" && (
              <input
                type="text"
                placeholder="Please specify other session type"
                className="border border-gray-300 rounded-md p-2 mt-3"
                value={otherSession}
                onChange={(e) => setOtherSession(e.target.value)}
              />
            )}

            <label className="font-semibold mt-4">Concern (optional)</label>
            <textarea
              id="concern"
              rows={3}
              className="border border-gray-300 rounded-md p-2 mt-1"
            ></textarea>
            <label className="font-semibold mt-4 text-red-600">
              * Please send your university id to the redirected WhatsApp no
            </label>
            <button
              type="submit"
              className="mt-6 bg-sky-400 hover:bg-sky-500 text-white font-semibold py-2 px-4 rounded-md transition"
            >
              Submit & Connect on WhatsApp
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default MentalWellness;
