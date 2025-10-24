import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Linkedin, Facebook, Instagram, Youtube } from "lucide-react";

type CampSumTextProps = {
  size?: string;
  className?: string;
};

const CampSumText: React.FC<CampSumTextProps> = ({ size = "text-4xl", className = "" }) => (
  <span className={`font-allura font-bold ${size} ${className}`}>
    <span style={{ color: "#38b6ff" }}>Camp</span>
    <span style={{ color: "#e30613" }}>Sum</span>
  </span>
);

const LearnMore: React.FC = () => {
  const handleOpen = (url: string) => window.open(url, "_blank");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3">
              <CampSumText size="text-3xl" />
            </Link>
            <Link
              to="/"
              className="flex items-center space-x-2 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            About <CampSumText size="text-5xl" /> – THE Campus SuperApp
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your 1-Stop Solution for All University Needs – Revolutionizing campus life across India
          </p>
        </div>

        {/* Founder Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="flex justify-center">
            <div className="relative">
              <img
                src="/img1.png"
                alt="Atul Kumar Dubey - Founder of CampSum"
                className="w-80 h-80 object-cover rounded-2xl shadow-lg"
              />
              
            </div>
          </div>
          


          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet Our Founder</h2>
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">Atul Kumar Dubey</h3>

            <div className="space-y-4 text-gray-700">
              <p className="text-lg leading-relaxed">
                Atul Kumar Dubey is a visionary entrepreneur who recognized the fragmented nature of
                campus services across Indian universities. His passion for technology & finance and
                deep understanding of student needs led him to create{" "}
                <CampSumText size="text-2xl" className="inline" /> – a unified platform that brings
                all essential campus services under one roof.
              </p>
              <p className="text-lg leading-relaxed">
                With a background in economics, finance & humanities, Atul envisioned a platform
                where students could seamlessly access accommodation, food services, marketplace,
                mental health support, career support & a supportive ecosystem – all through a
                single, intuitive application.
              </p>
              <p className="text-lg leading-relaxed">
                His mission is simple yet profound:{" "}
                <strong>
                  "To make campus life easier, more connected, and more enjoyable for every student
                  in India."
                </strong>
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="mailto:founder@campsum.com"
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <Mail className="h-4 w-4" />
                <span>founder@campsum.com</span>
              </a>
              <button
                onClick={() => handleOpen("https://www.linkedin.com/in/atulpedia")}
                className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Linkedin className="h-4 w-4" />
                <span>Connect on LinkedIn</span>
              </button>
              <button
                onClick={() => handleOpen("https://www.facebook.com/profile.php?id=100090734282701")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Facebook className="h-4 w-4" />
                <span>Connect on Facebook</span>
              </button>
              <button
                onClick={() => handleOpen("https://www.instagram.com/atulpedia/")}
                className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Instagram className="h-4 w-4" />
                <span>Follow on Instagram</span>
              </button>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="border rounded-lg shadow bg-white p-8 mb-12 text-center space-y-4">
          <h2 className="text-2xl font-bold">Our Vision</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            "To become India's leading campus ecosystem platform, connecting students, businesses,
            and educational institutions in a seamless digital environment that enhances the overall
            university experience."
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            <CampSumText size="text-2xl" className="inline" /> aims to solve the everyday challenges
            faced by students – from finding quality accommodation and food services to accessing
            mental health support and connecting with peers. We believe that by bringing all these
            services together, we can create a more supportive and thriving campus community.
          </p>
        </div>

        {/* Video Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Watch Our Story</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* First Video */}
            <div className="border rounded-lg shadow bg-white p-6">
              <h3 className="flex items-center space-x-2 text-xl font-semibold mb-2">
                <Youtube className="h-5 w-5 text-red-600" />
                <span>Introduction to <CampSumText size="text-xl" className="inline" /></span>
              </h3>
              <p className="text-gray-600 mb-4">
                Learn about our platform and how we're revolutionizing campus life.
              </p>
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/OjM_O3IjHtU"
                  title="CampSum Introduction Video"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>

            {/* Second Video */}
            <div className="border rounded-lg shadow bg-white p-6 flex flex-col items-center justify-center">
              <h3 className="flex items-center space-x-2 text-xl font-semibold mb-2">
                <Youtube className="h-5 w-5 text-red-600" />
                <span>More Videos Coming Soon</span>
              </h3>
              <p className="text-gray-600 mb-4 text-center">
                Stay tuned for more insights and updates from our team.
              </p>
              <button
                onClick={() => handleOpen("https://www.youtube.com/@teamcampsum")}
                className="border border-gray-300 rounded px-4 py-2 hover:bg-gray-100 transition"
              >
                Subscribe to Our Channel
              </button>
            </div>

            {/* Third Video (New) */}
            <div className="border rounded-lg shadow bg-white p-6">
              <h3 className="flex items-center space-x-2 text-xl font-semibold mb-2">
                <Youtube className="h-5 w-5 text-red-600" />
                <span>Join our mission as a CampSum प्रतिभा पोषण मंच Volunteer / Intern</span>
              </h3>
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/WDszAApPbFM"
                  title="CampSum Volunteer Intern Video"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-red-600 text-white rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Campus Experience?</h2>
          <p className="text-xl mb-6">
            Join thousands of students who are already using{" "}
            <CampSumText size="text-3xl" className="inline text-white" />
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/signup"
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium"
            >
              Get Started Today
            </Link>
            <Link
              to="/contactus"
              className="border border-white text-white hover:bg-white hover:text-blue-600 transition px-6 py-3 rounded-lg font-medium"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;
