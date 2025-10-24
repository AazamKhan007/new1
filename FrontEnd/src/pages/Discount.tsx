import Navbar from "./Navbar";

export default function StudentDiscount() {
  const features = [
    {
      title: "Daily Deals",
      desc: "Fresh discounts from your favorite brands updated every day.",
      color: "from-blue-400 to-blue-600",
    },
    {
      title: "Local Offers",
      desc: "Special bargains around campus – food courts, cafés, and more.",
      color: "from-red-400 to-red-600",
    },
    {
      title: "Verified Only",
      desc: "Every deal is checked so you can shop with confidence.",
      color: "from-purple-400 to-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            🎓 Exclusive Student Discounts
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Save money on food, travel, books, and more!  
            Get instant updates on the best student offers right in your pocket.
          </p>

          {/* Feature Highlights */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {features.map((item, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 text-white shadow-lg bg-gradient-to-r ${item.color}`}
              >
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="opacity-90">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Join Our WhatsApp Channel
            </h2>
            <p className="text-gray-600 mb-6">
              Never miss a deal. Get instant notifications of the hottest student discounts.
            </p>
            <a
              href="https://whatsapp.com/channel/0029VbBKyQo9Gv7TvS33k51c"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-full text-lg transition-transform transform hover:scale-105"
            >
              👉 Join Now
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-600 py-6 border-t">
        <p>© {new Date().getFullYear()} CampSum — Empowering Students with Smart Savings 💡</p>
      </footer>
    </div>
  );
}
