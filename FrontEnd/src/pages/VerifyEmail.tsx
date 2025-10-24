// src/pages/VerifyEmail.tsx
import { motion } from "framer-motion";

export default function VerifyEmail() {
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden px-4">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100 animate-gradient" />

      {/* Card */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-200 text-center">
        
        {/* Logo */}
        <h2 className="text-5xl font-allura font-bold">
          <span className="text-[#38b6ff]">Camp</span>
          <span className="text-[#e30613]">Sum</span>
        </h2>

        {/* Animated Mail Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center mt-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20 text-[#38b6ff]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75M21.75 6.75A2.25 2.25 0 0019.5 4.5H4.5A2.25 2.25 0 002.25 6.75m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.82 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
        </motion.div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mt-4 font-sans">
          Verify Your Email
        </h1>

        {/* Message */}
        <p className="mt-3 text-gray-600 font-sans leading-relaxed">
          🎉 Your account has been created successfully!  
          <br />
          Please check your inbox and click on the verification link to activate your account.  
        </p>

        {/* Loading Dots Animation */}
        <motion.div
          className="flex justify-center gap-2 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.span
            className="w-2 h-2 bg-[#38b6ff] rounded-full"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
          />
          <motion.span
            className="w-2 h-2 bg-[#38b6ff] rounded-full"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
          />
          <motion.span
            className="w-2 h-2 bg-[#38b6ff] rounded-full"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
          />
        </motion.div>

        {/* Extra Help */}
        <p className="mt-4 text-sm text-gray-500">
          Didn’t receive the email? Check your spam folder 
          <br />or try signing up again with the same email.
        </p>
      </div>
    </div>
  );
}
