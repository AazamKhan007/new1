import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "./Navbar";
import { Mail, MessageCircle, Users, Link as LinkIcon, User } from "lucide-react";

const Help = () => {
  const helpInfo = [
    {
      title: "Common Helpdesk WhatsApp",
      description: "For general queries and assistance, contact us on WhatsApp:",
      linkText: "+91 7607844279",
      link: "https://wa.me/917607844279",
      icon: MessageCircle,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Grievance Officer",
      description:
        "For issues related to Terms of Service or Privacy Policy:",
      linkText: "admin@campsum.com",
      link: "mailto:admin@campsum.com",
      icon: Users,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Technical Issues",
      description: "Facing technical problems? Contact:",
      linkText: "admin@campsum.com",
      link: "mailto:admin@campsum.com",
      icon: Mail,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Customer Support",
      description: "For general support, reach out at:",
      linkText: "support@campsum.com",
      link: "mailto:support@campsum.com",
      icon: Mail,
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "Partnership Proposals",
      description: "If you have partnership proposals, contact us:",
      linkText: "partners@campsum.com",
      link: "mailto:partners@campsum.com",
      icon: LinkIcon,
      color: "bg-pink-100 text-pink-700",
    },
    {
      title: "Connect with Founder",
      description: "To connect with Atul Kumar Dubey for proposals:",
      linkText: "founder@campsum.com",
      link: "mailto:founder@campsum.com",
      icon: User,
      color: "bg-orange-100 text-orange-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Help & Support
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {helpInfo.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card
                key={index}
                className="shadow-lg transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300 rounded-2xl"
              >
                <CardContent className="p-6 space-y-4">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-full ${item.color} mb-2`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
                  <p className="text-gray-600">{item.description}</p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 font-medium hover:underline"
                  >
                    {item.linkText}
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        <footer className="mt-16 py-12 bg-gradient-to-r from-primary/5 to-accent/5 rounded-t-3xl">
          <div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Connect with <span className="font-[Allura] text-5xl text-gradient">CampSum</span>
            </h3>
            <p className="text-gray-600 mb-10 max-w-md mx-auto">
              Follow us on social media for updates, tips, and student community stories
            </p>

            <div className="flex justify-center items-center gap-4 flex-wrap mb-8">
              <a href="https://www.instagram.com/campsum/" target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-gradient-to-tr from-pink-500 to-orange-400 shadow-lg hover:scale-110 transition-transform">
                <MessageCircle className="h-6 w-6 text-white" />
              </a>
              <a href="https://wa.me/917607844279" target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-green-500 shadow-lg hover:scale-110 transition-transform">
                <MessageCircle className="h-6 w-6 text-white" />
              </a>
              <a href="mailto:support@campsum.com" target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-red-500 shadow-lg hover:scale-110 transition-transform">
                <Mail className="h-6 w-6 text-white" />
              </a>
              <a href="https://www.linkedin.com/company/campsum" target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-blue-600 shadow-lg hover:scale-110 transition-transform">
                <Users className="h-6 w-6 text-white" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61576935694985" target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-blue-700 shadow-lg hover:scale-110 transition-transform">
                <Users className="h-6 w-6 text-white" />
              </a>
            </div>

            <p className="text-gray-500 text-lg">
              © 2025 <span className="font-[Allura] text-4xl text-gradient">CampSum</span>. Making student life easier, one service at a time. ❤️
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Help;
