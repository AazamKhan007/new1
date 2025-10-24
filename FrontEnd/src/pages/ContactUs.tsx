import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle, Phone, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

// ---------- Types ----------
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface BrandTextProps {
  size?: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // WhatsApp redirection helper
  const contactWhatsApp = (customMessage?: string) => {
    const message =
      customMessage ||
      `Hi CampSum team, I would like to get in touch. Please assist me.\n\nName: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\nMessage: ${formData.message}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/917607844279?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
    toast.success("Opening WhatsApp...");
  };

  // Contact form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.message.length < 10 || formData.message.length > 2000) {
      toast.error("Message must be between 10 and 2000 characters");
      return;
    }

    setIsSubmitting(true);
    // TODO: Add your backend call here
  };

  // Quick support buttons
  const handleQuickSupport = (type: string) => {
    switch (type) {
      case "service":
        contactWhatsApp(
          "Hi CampSum Team, I need help with a service problem. Please assist me."
        );
        break;
      case "account":
        window.location.href =
          "mailto:admin@campsum.com?subject=Technical Issues";
        break;
      default:
        break;
    }
  };

  // Brand text component for CampSum
  const BrandText: React.FC<BrandTextProps> = ({ size = "text-2xl" }) => (
    <span className={`font-allura ${size}`}>
      <span style={{ color: "#38b6ff" }}>Camp</span>
      <span style={{ color: "#e30613" }}>Sum</span>
    </span>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center h-auto py-4 sm:h-16">
            <Link to="/" className="flex items-center space-x-2 mb-2 sm:mb-0">
              <BrandText size="text-2xl sm:text-3xl" />
            </Link>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <Button
                onClick={() => contactWhatsApp()}
                variant="outline"
                className="flex-1 sm:flex-none border-green-600 text-green-600 hover:bg-green-50"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp Us
              </Button>
              <Link to="/" className="flex-1 sm:flex-none">
                <Button variant="outline" className="w-full sm:w-auto">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Contact Us
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Get in touch with the <BrandText /> team. We're here to help!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span>Get in Touch</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-3">
                  <MessageCircle className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">WhatsApp Support</h3>
                    <p className="text-gray-600 text-sm">+91 7607844279</p>
                    <Button
                      onClick={() => contactWhatsApp()}
                      size="sm"
                      className="mt-2 w-full sm:w-auto bg-green-600 hover:bg-green-700"
                    >
                      Chat Now
                    </Button>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Technical Support</h3>
                    <p className="text-gray-600 text-sm">admin@campsum.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Response Time</h3>
                    <p className="text-gray-600 text-sm">WhatsApp: Instant</p>
                    <p className="text-gray-600 text-sm">Email: Within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-red-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Office</h3>
                    <p className="text-gray-600 text-sm">
                      <BrandText /> Global Enterprises, India
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => handleQuickSupport("service")}
                  variant="outline"
                  className="w-full justify-start"
                  size="sm"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Service Problems
                </Button>
                <Button
                  onClick={() => handleQuickSupport("account")}
                  variant="outline"
                  className="w-full justify-start"
                  size="sm"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Technical Issues
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      className="w-full"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                    <Input
                      type="email"
                      className="w-full"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <Input
                    className="w-full"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                  />
                  <Textarea
                    className="w-full"
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  />

                  <Button
                    type="button"
                    onClick={() => contactWhatsApp()}
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={isSubmitting}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send via WhatsApp
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
