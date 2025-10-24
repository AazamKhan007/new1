import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useToast } from "../hooks/use-toast";
import { User, Calendar, Package, MapPin } from "lucide-react";
import { supabase } from "../supabaseClient";
import Navbar from "./Navbar";

interface FormData {
  userName: string;
  mealPlan: string;
  packingOption: string;
  location: string;
  customAddress?: string;
}

const TiffinServices = () => {
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    mealPlan: "",
    packingOption: "",
    location: "",
    customAddress: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const mealPlanOptions = [
    { value: "1_day_Trail__₹65 ", label: "₹65 - 1 Day Trial" },
    { value: "7_day_Plan__₹60", label: "₹60 - 7 Days Plan" },
    { value: "15_day_Plan__₹58", label: "₹58 - 15 Days Plan" },
    { value: "30_day_Plan__₹57", label: "₹57 - 30 Days Plan" },
    { value: "6_month_Plan__₹55", label: "₹55 - 6 Months Plan" },
  ];

  const packingOptions = [
    { value: "bring_your_own_tiffin", label: "Bring Your Own Tiffin - FREE" },
    {
      value: "polythene_packing - ₹5 per delivery",
      label: "Polythene Packing - ₹5 per delivery",
    },
    {
      value: "metal_box_tiffin - ₹300 refundable security deposit",
      label: "Metal Box Tiffin - ₹300 refundable security deposit",
    },
  ];

  const locationOptions = [
    { value: "Lanka", label: "Lanka" },
    { value: "Chhittupur", label: "Chhittupur" },
    { value: "Bhagwanpur", label: "Bhagwanpur" },
    { value: "Naria", label: "Naria" },
    { value: "Haiderabar Gate", label: "Haiderabar Gate" },
    { value: "Sheer gate", label: "Sheer Gate" },
    { value: "other", label: "Other" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.userName ||
      !formData.mealPlan ||
      !formData.packingOption ||
      (!formData.location && !formData.customAddress)
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const finalLocation =
      formData.location === "other"
        ? formData.customAddress
        : formData.location;

    setIsLoading(true);
    try {
      const { error } = await supabase.from("meal_subscriptions").insert([
        {
          user_name: formData.userName,
          meal_plan: formData.mealPlan,
          packing: formData.packingOption,
          location: finalLocation,
        },
      ]);

      if (error) throw error;

      const message = `New Meal Subscription:
Name: ${formData.userName}
Meal Plan: ${formData.mealPlan}
Packing: ${formData.packingOption}
Location: ${finalLocation}`;

      const whatsappUrl = `https://wa.me/917607844279?text=${encodeURIComponent(
        message
      )}`;

      toast({
        title: "Subscription Submitted!",
        description: "Redirecting to WhatsApp...",
      });
      window.open(whatsappUrl, "_blank");

      setFormData({
        userName: "",
        mealPlan: "",
        packingOption: "",
        location: "",
        customAddress: "",
      });
    } catch (err) {
      console.error("Error submitting form:", err);
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 pt-0 px-4 pb-12">
      <Navbar />
      <div className="max-w-2xl mx-auto mt-8">
        <Card className="shadow-2xl border border-blue-200 rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-red-500 p-8 text-center">
            <CardTitle className="text-3xl font-bold text-white mb-2">
              <span className="font-[Allura] text-5xl">
                <span style={{ color: "#38b6ff" }}>Camp</span>
                <span style={{ color: "#e30613" }}>Sum</span>
              </span>
              <br />
              Meal Subscription
            </CardTitle>
            <CardDescription className="text-white/90 text-lg">
              Subscribe to our delicious meal plans
            </CardDescription>
          </div>

          <CardContent className="p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 font-medium">
                  <User className="w-5 h-5 text-blue-600" /> Full Name
                </Label>
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.userName}
                  onChange={(e) =>
                    setFormData({ ...formData, userName: e.target.value })
                  }
                  required
                  className="border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Meal Plan */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 font-medium">
                  <Calendar className="w-5 h-5 text-red-600" /> Tiffin Rate (Per
                  Meal)
                </Label>
                <Select
                  value={formData.mealPlan}
                  onValueChange={(value) =>
                    setFormData({ ...formData, mealPlan: value })
                  }
                >
                  <SelectTrigger className="rounded-xl p-3 focus:ring-2 focus:ring-red-500">
                    <SelectValue placeholder="Select meal plan duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {mealPlanOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Packing */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 font-medium">
                  <Package className="w-5 h-5 text-blue-600" /> Packing Option
                </Label>
                <Select
                  value={formData.packingOption}
                  onValueChange={(value) =>
                    setFormData({ ...formData, packingOption: value })
                  }
                >
                  <SelectTrigger className="rounded-xl p-3 focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Choose packing type" />
                  </SelectTrigger>
                  <SelectContent>
                    {packingOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 font-medium">
                  <MapPin className="w-5 h-5 text-red-600" /> Delivery Location
                </Label>

                {formData.location === "other" ? (
                  <Input
                    placeholder="Enter your delivery address"
                    value={formData.customAddress || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        customAddress: e.target.value,
                      })
                    }
                    className="border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                ) : (
                  <Select
                    value={formData.location}
                    onValueChange={(value) =>
                      setFormData({ ...formData, location: value })
                    }
                  >
                    <SelectTrigger className="rounded-xl p-3 focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Select your location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locationOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-red-500 text-white font-semibold rounded-2xl shadow-xl hover:from-blue-700 hover:to-red-600 transition disabled:opacity-50"
              >
                {isLoading ? "Submitting..." : "Submit & WhatsApp"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TiffinServices;
