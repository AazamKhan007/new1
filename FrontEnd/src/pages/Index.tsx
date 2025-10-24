import { Button } from "@/components/ui/button";
import { supabase } from "../supabaseClient";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/user.png";
import {
  Home,
  UtensilsCrossed,
  ShoppingBag,
  Heart,
  Search,
  Users,
  Droplet,
  Percent,
  Calendar,
  Instagram,
  MessageCircle,
  Mail,
  Linkedin,
  Facebook,
  ArrowRight,
} from "lucide-react";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Unused state, but kept
  const [session, setSession] = useState(null); // <-- New state for session
  const [loading, setLoading] = useState(true); // <-- New state for loading/session check
  const navigate = useNavigate();

  // ---------- Session Management (Auto-Login Check) ----------
  useEffect(() => {
    // Check initial session status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for session changes (e.g., login/logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    // Cleanup function
    return () => subscription.unsubscribe();
  }, []);

  // ---------- Services ----------
  const services = [
    {
      icon: Home,
      idd: "i1",
      title: "Accommodation",
      description: "Find perfect housing options near your campus",
      path: "/accommodation",
    },
    {
      icon: UtensilsCrossed,
      idd: "i2",
      title: "Tiffin Services",
      description: "Healthy, affordable meal delivery to your doorstep",
      path: "/tiffin-services",
    },
    {
      icon: ShoppingBag,
      title: "Marketplace",
      idd: "i3",
      description: "Buy, sell, and exchange items with fellow students",
      path: "/marketplace",
    },
    {
      icon: Heart,
      idd: "i4",
      title: "Mental Health Support",
      description: "Professional counseling and wellness resources",
      path: "/mental-health",
    },
    {
      icon: Search,
      idd: "i5",
      title: "Lost and Found",
      description: "Recover lost items or help others find theirs",
      path: "/lost-found",
    },
    {
      icon: Users,
      idd: "i6",
      title: "Roommate Finder",
      description: "Connect with compatible roommates and flatmates",
      path: "/roommate-finder",
    },
    {
      icon: Droplet,
      title: "Rakt Connect",
      description: "Book Blood Donation Appointment",
      path: "/rakt-connect",
    },
    {
      icon: Percent,
      title: "Student Discount",
      description: "Exclusive deals and offers for university students",
      path: "/student-discount",
    },
    {
      icon: Calendar,
      title: "Events & Updates",
      description: "Stay updated with campus events and important notices",
      path: "/events",
    },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      name: "Instagram",
      href: "https://www.instagram.com/campsum/",
      color: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400",
    },
    {
      icon: MessageCircle,
      name: "WhatsApp",
      href: "https://wa.me/917607844279?text=Hey campsum team lets connect.",
      color: "bg-green-500",
    },
    {
      icon: Mail,
      name: "Email",
      href: "mailto:support@campsum.com",
      color: "bg-red-500",
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/campsum/?originalSubdomain=in",
      color: "bg-blue-700",
    },
    {
      icon: Facebook,
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61576935694985",
      color: "bg-blue-600",
    },
  ];

  // ---------- Login check on service click ----------
  const handleServiceClick = (path: string) => {
    // Check the loaded session state for quick navigation decision
    if (!session && !loading) {
      navigate("/login");
    } else if (session) {
      navigate(path);
    }
  };

  if (loading) {
    // Render a loading state while checking the session
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-inter flex flex-col">
      {/* Navbar - MODIFIED */}
      <nav className="flex justify-between items-center py-2 px-6 bg-white shadow-md">
        <Link to="/" className="font-[Allura] text-3xl sm:text-4xl md:text-5xl">
          <span style={{ color: "#38b6ff" }}>Camp</span>
          <span style={{ color: "#e30613" }}>Sum</span>
        </Link>
        {/* Conditional Rendering Logic */}
        <div className="flex items-center space-x-4">
          {session ? (
            // Option 1: User is logged in (session exists)
            <Link to="/profile">
              <img
                src={Logo} // your default profile image
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-indigo-500 shadow-sm transition duration-300 hover:ring-2 hover:ring-indigo-700"
              />
            </Link>
          ) : (
            // Option 2: User is NOT logged in (no session)
            <>
              <Button
                asChild
                variant="outline"
                className=" hidden sm:inline-flex"
              >
                <Link to="/signup">Sign Up</Link>
              </Button>
              <Button asChild className="background-none">
                <Link to="/login">Log In</Link>
              </Button>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="campsum-gradient-bg py-16 lg:py-24 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight float-animation">
              Your one-stop solution for all{" "}
              <span className="text-accent">University</span>{" "}
              <span className="text-primary ">needs</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              From finding the perfect accommodation to connecting with
              roommates, CampSum makes your student life easier and more
              connected.
            </p>

            {/* Conditional Get Started Button */}
            {!session && (
              <Button
                asChild
                size="lg"
                className="mt-4 text-lg animate-pulse hover:animate-none campsum-transition"
              >
                <Link className="px-4 py-3" to="/login">
                  Get Started
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything you need for{" "}
              <span className="text-primary">student life</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our comprehensive range of services designed specifically
              for university students
            </p>
          </div>

          <div
            id="services"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="campsum-card cursor-pointer group"
                  onClick={() => handleServiceClick(service.path)}
                >
                  <div
                    id={service.idd}
                    className="flex flex-col items-center text-center h-full"
                  >
                    <div className="mb-4 p-4 bg-primary/10 rounded-xl group-hover:bg-primary/20 campsum-transition group-hover:glow-effect">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                      {service.description}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group/btn"
                      asChild
                    >
                      <span>
                        Explore
                        <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-primary/5 to-accent/5 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Footer Sections */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 mb-12 text-center sm:text-left">
            {/* Section 1*/}
            <div className="flex flex-col items-center sm:items-start justify-around h-full space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">
                Learn More
              </h3>
              <Link
                to="/aboutus"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                About Us
              </Link>
              <a
                href="#services"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Services
              </a>
              <Link
                to="/terms"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Term and condition
              </Link>
              <Link
                to="/privacy"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Privacy Policy
              </Link>
            </div>

            {/* Section 2 - Center */}
            <div className="text-center mb-8 sm:mb-0">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Connect with{" "}
                <span className="font-[Allura] text-3xl">
                  <span style={{ color: "#38b6ff" }}>Camp</span>
                  <span style={{ color: "#e30613" }}>Sum</span>
                </span>
              </h3>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                Follow us on social media for updates, tips, and student
                community stories
              </p>
              <div className="flex justify-center sm:justify-center items-center gap-3 sm:gap-4 flex-wrap">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  let bgColor = "";

                  switch (social.name) {
                    case "Instagram":
                      bgColor =
                        "bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888]";
                      break;
                    case "WhatsApp":
                      bgColor = "bg-[#25D366]";
                      break;
                    case "Email":
                      bgColor = "bg-[#EA4335]";
                      break;
                    case "LinkedIn":
                      bgColor = "bg-[#0A66C2]";
                      break;
                    case "Facebook":
                      bgColor = "bg-[#1877F2]";
                      break;
                    default:
                      bgColor = "bg-gray-600";
                  }

                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-2xl shadow-lg hover:scale-110 transform transition-transform ${bgColor}`}
                      aria-label={social.name}
                    >
                      <IconComponent className="w-5 h-5 text-white" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Section 3 */}
            <div className="flex flex-col items-center sm:items-end justify-around h-full space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">
                Explore Services
              </h3>
              <a
                href="#services"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Our Services
              </a>
              <Link
                to="/help"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Help
              </Link>
              <Link
                to="/contactus"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="mt-10 pt-6 border-t border-gray-300 text-center">
            <p className="text-gray-500 text-sm sm:text-base">
              © 2025{" "}
              <span className="font-[Allura] text-2xl sm:text-3xl">
                <span style={{ color: "#38b6ff" }}>Camp</span>
                <span style={{ color: "#e30613" }}>Sum</span>
              </span>
              . Making student life easier, one service at a time. ❤️
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
