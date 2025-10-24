import React from "react";
import Navbar from "./Navbar"; // ✅ Import your reusable Navbar
import { Bell, CalendarDays, Share2 } from "lucide-react";

export default function Event() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Section */}
      <section className="py-16 px-6 flex justify-center">
        <div className="max-w-5xl w-full bg-white shadow-2xl rounded-2xl p-10 border border-gray-200">
          {/* Header */}
          <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-6">
            Campus Events & Updates
          </h1>
          <p className="text-center text-gray-700 max-w-2xl mx-auto mb-10">
            Stay ahead of every happening in BHU!{" "}
            Our{" "}
            <span className="font-semibold text-red-600">Events & Updates</span>{" "}
            section keeps you notified about{" "}
            <strong>all campus events</strong> — from cultural fests and guest
            lectures to urgent notices and club activities.
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <FeatureCard
              icon={<Bell className="w-10 h-10 text-blue-600" />}
              title="Instant Notifications"
              description="Get real-time alerts for every new event in your campus directly on WhatsApp."
            />
            <FeatureCard
              icon={<CalendarDays className="w-10 h-10 text-red-600" />}
              title="All BHU Events"
              description="From seminars to concerts, never miss a single update about what's happening."
            />
            <FeatureCard
              icon={<Share2 className="w-10 h-10 text-blue-600" />}
              title="Easy Sharing"
              description="Forward updates to friends or groups with just one tap to keep everyone in the loop."
            />
          </div>

          {/* Join Now Section */}
          <div className="text-center">
            <a
              href="https://whatsapp.com/channel/0029VbB47rUADTOAJWdbRy2f"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-red-600 text-white font-bold rounded-xl shadow-lg hover:from-red-600 hover:to-blue-600 transition text-lg"
            >
              👉 Join the “All BHU Events & Updates” WhatsApp Channel
            </a>
            <p className="text-gray-600 mt-4">
              Click the button to subscribe and receive every campus update instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-600 py-6 border-t">
        <p>© {new Date().getFullYear()} CampSum — Stay Updated, Stay Ahead 🎓</p>
      </footer>
    </div>
  );
}

// ✅ Reusable feature card component
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-md hover:shadow-lg transition">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-blue-700 mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}
