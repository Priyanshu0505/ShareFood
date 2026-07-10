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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DollarSign, Heart, Users, Truck, Building2, Target, Star, Trophy, Shield, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const donationPurposes = [
  { 
    id: "food-delivery", 
    title: "Food Delivery Operations", 
    description: "Fund transportation, packaging, and volunteer coordination",
    icon: Truck,
    impact: "₹100 = 20 meal deliveries"
  },
  { 
    id: "ngo-support", 
    title: "NGO Partner Support", 
    description: "Direct funding to support our NGO partners' operations",
    icon: Building2,
    impact: "₹500 = Support 1 NGO for a month"
  },
  { 
    id: "campaign", 
    title: "Awareness Campaigns", 
    description: "Fund marketing, events, and community outreach programs",
    icon: Target,
    impact: "₹250 = Reach 1000+ people"
  },
  { 
    id: "infrastructure", 
    title: "Infrastructure Development", 
    description: "Build community kitchens and improve distribution centers",
    icon: Building2,
    impact: "₹2000 = Set up 1 pickup point"
  }
];

const predefinedAmounts = [100, 250, 500, 1000, 2500, 5000];

const topContributors = [
  { name: "Rajesh Kumar", amount: 25000, donations: 15, city: "Mumbai" },
  { name: "Priya Sharma", amount: 18500, donations: 22, city: "Delhi" },
  { name: "Ankit Patel", amount: 15000, donations: 8, city: "Bangalore" },
  { name: "Sneha Gupta", amount: 12750, donations: 18, city: "Pune" },
  { name: "Vikram Singh", amount: 11200, donations: 12, city: "Chennai" },
  { name: "Meera Reddy", amount: 9800, donations: 14, city: "Hyderabad" }
];

export default function DonateMoney() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    donorName: "",
    email: "",
    phone: "",
    amount: "",
    purpose: "",
    customPurpose: "",
    message: "",
    anonymous: false,
    recurring: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contributors, setContributors] = useState(topContributors);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAmountSelect = (amount: number) => {
    setFormData(prev => ({ ...prev, amount: amount.toString() }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Add contributor to list (if not anonymous)
    if (!formData.anonymous) {
      const newContributor = {
        name: formData.donorName,
        amount: parseInt(formData.amount),
        donations: 1,
        city: "New Contributor"
      };
      setContributors(prev => [...prev, newContributor].sort((a, b) => b.amount - a.amount).slice(0, 10));
    }

    const selectedPurpose = donationPurposes.find(p => p.id === formData.purpose);
    
    toast({
      title: "Donation Successful! 🎉",
      description: `Thank you for donating ₹${formData.amount} for ${selectedPurpose?.title}. Your contribution will make a real difference!`,
    });

    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      donorName: "",
      email: "",
      phone: "",
      amount: "",
      purpose: "",
      customPurpose: "",
      message: "",
      anonymous: false,
      recurring: false
    });
  };

  const selectedPurpose = donationPurposes.find(p => p.id === formData.purpose);
  const isFormValid = formData.donorName && formData.email && formData.amount && formData.purpose;

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
              Support Our Mission Financially
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every rupee counts in our fight against hunger. Your financial support helps us expand our reach and serve more communities.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Donation Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-6 w-6 text-primary" />
                    Make a Donation
                  </CardTitle>
                  <CardDescription>
                    Your contribution directly impacts lives and helps eliminate hunger in our communities.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit}>
                    {/* Donor Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="donorName">Full Name *</Label>
                        <Input
                          id="donorName"
                          placeholder="Your full name"
                          value={formData.donorName}
                          onChange={(e) => handleInputChange("donorName", e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="+91 9876543210"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>

                    {/* Donation Amount */}
                    <div className="space-y-4">
                      <Label>Donation Amount (₹) *</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {predefinedAmounts.map((amount) => (
                          <Button
                            key={amount}
                            type="button"
                            variant={formData.amount === amount.toString() ? "default" : "outline"}
                            onClick={() => handleAmountSelect(amount)}
                            className="text-sm"
                          >
                            ₹{amount}
                          </Button>
                        ))}
                      </div>
                      <Input
                        placeholder="Enter custom amount"
                        type="number"
                        value={formData.amount}
                        onChange={(e) => handleInputChange("amount", e.target.value)}
                        required
                      />
                    </div>

                    {/* Purpose Selection */}
                    <div className="space-y-4">
                      <Label>Choose Donation Purpose *</Label>
                      <RadioGroup value={formData.purpose} onValueChange={(value) => handleInputChange("purpose", value)}>
                        <div className="space-y-3">
                          {donationPurposes.map((purpose) => (
                            <div key={purpose.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                              <RadioGroupItem value={purpose.id} id={purpose.id} className="mt-1" />
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <purpose.icon className="h-5 w-5 text-primary" />
                                  <Label htmlFor={purpose.id} className="font-semibold cursor-pointer">
                                    {purpose.title}
                                  </Label>
                                </div>
                                <p className="text-sm text-muted-foreground mb-1">{purpose.description}</p>
                                <Badge variant="secondary" className="text-xs">{purpose.impact}</Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Optional Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message">Message (Optional)</Label>
                      <Textarea
                        id="message"
                        placeholder="Share why you're supporting our mission..."
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        rows={3}
                      />
                    </div>

                    {/* Donation Options */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="anonymous"
                          checked={formData.anonymous}
                          onChange={(e) => handleInputChange("anonymous", e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor="anonymous" className="text-sm">
                          Make this donation anonymous
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="recurring"
                          checked={formData.recurring}
                          onChange={(e) => handleInputChange("recurring", e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor="recurring" className="text-sm">
                          Make this a monthly recurring donation
                        </Label>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={!isFormValid || isSubmitting}
                      className="w-full btn-hero"
                    >
                      {isSubmitting ? "Processing Payment..." : `Donate ₹${formData.amount || "0"}`}
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Shield className="h-4 w-4" />
                      Secure payment processed with 256-bit encryption
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Impact & Transparency */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-6"
            >
              {/* Impact Preview */}
              {selectedPurpose && formData.amount && (
                <Card className="card-gradient border-primary/20">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Your Impact
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <selectedPurpose.icon className="h-5 w-5 text-primary" />
                        <span className="font-medium">{selectedPurpose.title}</span>
                      </div>
                      <div className="bg-primary/10 rounded-lg p-4">
                        <p className="text-sm font-medium text-primary">
                          ₹{formData.amount} can make a real difference!
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {selectedPurpose.impact}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Transparency Section */}
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="text-secondary">Where Your Money Goes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-secondary" />
                        <span className="text-sm">Direct Program Support</span>
                      </div>
                      <span className="font-semibold">85%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-secondary h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-primary" />
                        <span className="text-sm">Operations & Logistics</span>
                      </div>
                      <span className="font-semibold">10%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "10%" }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-accent" />
                        <span className="text-sm">Administrative Costs</span>
                      </div>
                      <span className="font-semibold">5%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full" style={{ width: "5%" }}></div>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <CheckCircle className="h-8 w-8 text-secondary mx-auto mb-2" />
                    <p className="text-sm font-medium">100% Transparent</p>
                    <p className="text-xs text-muted-foreground">Monthly impact reports sent to all donors</p>
                  </div>
                </CardContent>
              </Card>

              {/* Top Contributors */}
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    Top Contributors This Month
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {contributors.slice(0, 5).map((contributor, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            {index < 3 ? (
                              <Star className="h-4 w-4 text-primary" />
                            ) : (
                              <Heart className="h-4 w-4 text-secondary" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{contributor.name}</p>
                            <p className="text-xs text-muted-foreground">{contributor.city} • {contributor.donations} donations</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary">₹{contributor.amount.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}