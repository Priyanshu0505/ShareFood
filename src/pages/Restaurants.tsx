import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Building2, MapPin, Phone, Star, Clock, Users, Plus, Award, Utensils } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockRestaurants = [
  {
    id: 1,
    name: "The Grand Maharaja",
    type: "Fine Dining",
    cuisine: "North Indian",
    location: "Connaught Place, Delhi",
    rating: 4.8,
    phone: "+91 98765 43210",
    email: "partnerships@grandmaharaja.com",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=200&fit=crop",
    donationsThisMonth: 45,
    totalDonations: 520,
    joinedDate: "March 2023",
    specialties: ["Buffet Surplus", "Wedding Catering", "Corporate Events"]
  },
  {
    id: 2,
    name: "Cafe Karma",
    type: "Cafe & Bistro",
    cuisine: "Continental",
    location: "Bandra West, Mumbai",
    rating: 4.6,
    phone: "+91 87654 32109",
    email: "hello@cafekarma.in",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&h=200&fit=crop",
    donationsThisMonth: 28,
    totalDonations: 310,
    joinedDate: "June 2023",
    specialties: ["Fresh Bakery Items", "Daily Specials", "Organic Produce"]
  },
  {
    id: 3,
    name: "Spice Garden Hotel",
    type: "Luxury Hotel",
    cuisine: "Multi-Cuisine",
    location: "MG Road, Bangalore",
    rating: 4.9,
    phone: "+91 76543 21098",
    email: "csr@spicegarden.com",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop",
    donationsThisMonth: 67,
    totalDonations: 890,
    joinedDate: "January 2023",
    specialties: ["Banquet Surplus", "International Buffets", "Room Service"]
  },
  {
    id: 4,
    name: "Annapurna Thali House",
    type: "Traditional Restaurant",
    cuisine: "South Indian",
    location: "Koramangala, Bangalore",
    rating: 4.5,
    phone: "+91 65432 10987",
    email: "contact@annapurnathali.com",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=200&fit=crop",
    donationsThisMonth: 35,
    totalDonations: 425,
    joinedDate: "May 2023",
    specialties: ["Traditional Thalis", "Festival Specials", "Homestyle Cooking"]
  }
];

const businessTypes = [
  "Fine Dining Restaurant",
  "Casual Dining",
  "Fast Food Chain", 
  "Cafe & Bistro",
  "Luxury Hotel",
  "Budget Hotel",
  "Catering Service",
  "Cloud Kitchen",
  "Food Truck",
  "Bakery & Confectionery"
];

export default function Restaurants() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    cuisine: "",
    location: "",
    contactPerson: "",
    phone: "",
    email: "",
    website: "",
    description: "",
    avgDailyWaste: "",
    preferredPickupTime: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [restaurantList, setRestaurantList] = useState(mockRestaurants);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Add new restaurant to list
    const newRestaurant = {
      id: restaurantList.length + 1,
      name: formData.businessName,
      type: formData.businessType,
      cuisine: formData.cuisine,
      location: formData.location,
      rating: 4.0,
      phone: formData.phone,
      email: formData.email,
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=200&fit=crop",
      donationsThisMonth: 0,
      totalDonations: 0,
      joinedDate: "December 2024",
      specialties: ["New Partner", "Fresh Surplus", "Daily Donations"]
    };

    setRestaurantList(prev => [...prev, newRestaurant]);

    toast({
      title: "Restaurant Partnership Registered! 🎉",
      description: "Welcome to our network! Our team will contact you within 24 hours to complete the setup.",
    });

    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      businessName: "",
      businessType: "",
      cuisine: "",
      location: "",
      contactPerson: "",
      phone: "",
      email: "",
      website: "",
      description: "",
      avgDailyWaste: "",
      preferredPickupTime: ""
    });
  };

  const isFormValid = formData.businessName && formData.businessType && formData.location && 
                     formData.contactPerson && formData.phone && formData.email;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6">
              Restaurant & Hotel Partners
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Leading restaurants and hotels committed to reducing food waste and feeding those in need.
            </p>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="btn-hero">
                  <Plus className="mr-2 h-5 w-5" />
                  Become a Partner Restaurant
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Join as Restaurant Partner</DialogTitle>
                  <DialogDescription>
                    Transform your surplus food into meals for those who need it most. Join our sustainable impact network.
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name *</Label>
                      <Input
                        id="businessName"
                        placeholder="Restaurant/Hotel name"
                        value={formData.businessName}
                        onChange={(e) => handleInputChange("businessName", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="businessType">Business Type *</Label>
                      <Select value={formData.businessType} onValueChange={(value) => handleInputChange("businessType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          {businessTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cuisine">Cuisine Type</Label>
                      <Input
                        id="cuisine"
                        placeholder="e.g., North Indian, Continental, Multi-Cuisine"
                        value={formData.cuisine}
                        onChange={(e) => handleInputChange("cuisine", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson">Contact Person *</Label>
                      <Input
                        id="contactPerson"
                        placeholder="Manager/Owner name"
                        value={formData.contactPerson}
                        onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Business Location *</Label>
                    <Input
                      id="location"
                      placeholder="Full address with area, city, pincode"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        placeholder="+91 9876543210"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="business@restaurant.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="avgDailyWaste">Avg. Daily Food Surplus (kg)</Label>
                      <Input
                        id="avgDailyWaste"
                        placeholder="e.g., 5-10 kg"
                        value={formData.avgDailyWaste}
                        onChange={(e) => handleInputChange("avgDailyWaste", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="preferredPickupTime">Preferred Pickup Time</Label>
                      <Input
                        id="preferredPickupTime"
                        placeholder="e.g., 9:00 PM - 10:00 PM"
                        value={formData.preferredPickupTime}
                        onChange={(e) => handleInputChange("preferredPickupTime", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website (Optional)</Label>
                    <Input
                      id="website"
                      placeholder="https://your-restaurant.com"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Tell us about your business</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of your restaurant/hotel and commitment to reducing food waste"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={3}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className="w-full btn-hero"
                  >
                    {isSubmitting ? "Submitting..." : "Join Partnership Network"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </motion.div>

          {/* Restaurant Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {restaurantList.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="card-gradient hover:scale-105 transition-transform duration-300 h-full">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img 
                      src={restaurant.image} 
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{restaurant.name}</h3>
                      <p className="text-sm opacity-90">{restaurant.type}</p>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-secondary text-secondary-foreground">
                        <Star className="w-3 h-3 mr-1" />
                        {restaurant.rating}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Utensils className="h-4 w-4" />
                        {restaurant.cuisine}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <MapPin className="h-4 w-4" />
                        {restaurant.location}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Clock className="h-4 w-4" />
                        Partner since {restaurant.joinedDate}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {restaurant.specialties.slice(0, 2).map((specialty, idx) => (
                        <Badge key={idx} variant="outline">{specialty}</Badge>
                      ))}
                    </div>
                    
                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">This Month:</span>
                        <span className="font-semibold text-primary">{restaurant.donationsThisMonth} donations</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total Impact:</span>
                        <span className="font-semibold text-secondary">{restaurant.totalDonations} meals</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full">
                      <Award className="mr-2 h-4 w-4" />
                      View Partner Profile
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Partnership Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-16"
          >
            <Card className="card-gradient max-w-4xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-center mb-8">Partnership Benefits</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">CSR Impact</h3>
                    <p className="text-sm text-muted-foreground">Boost your corporate social responsibility profile</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-secondary" />
                    </div>
                    <h3 className="font-semibold mb-2">Community Recognition</h3>
                    <p className="text-sm text-muted-foreground">Get featured in our partner showcase</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Building2 className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="font-semibold mb-2">Free Pickup</h3>
                    <p className="text-sm text-muted-foreground">No cost food surplus collection service</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Impact Reports</h3>
                    <p className="text-sm text-muted-foreground">Monthly sustainability impact analytics</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}