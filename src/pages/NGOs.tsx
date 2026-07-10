import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Building2, MapPin, Phone, Mail, Users, Heart, Plus, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockNGOs = [
  {
    id: 1,
    name: "Hope Foundation",
    mission: "Feeding the hungry, housing the homeless, and healing the hurting",
    location: "Mumbai, Maharashtra",
    established: "2015",
    beneficiaries: "50,000+",
    phone: "+91 98765 43210",
    email: "contact@hopefoundation.org",
    website: "https://hopefoundation.org",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=300&h=200&fit=crop",
    specialization: ["Child Welfare", "Food Distribution", "Education"]
  },
  {
    id: 2,
    name: "Annapurna Seva Trust",
    mission: "Ensuring no one sleeps hungry in our community",
    location: "Delhi, India",
    established: "2018",
    beneficiaries: "25,000+",
    phone: "+91 87654 32109",
    email: "info@annapurnaseva.org",
    website: "https://annapurnaseva.org",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=300&h=200&fit=crop",
    specialization: ["Food Security", "Community Kitchens", "Rural Development"]
  },
  {
    id: 3,
    name: "Samarpan Foundation",
    mission: "Bridging the gap between surplus and scarcity",
    location: "Bangalore, Karnataka",
    established: "2020",
    beneficiaries: "15,000+",
    phone: "+91 76543 21098",
    email: "hello@samarpan.org",
    website: "https://samarpan.org",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=300&h=200&fit=crop",
    specialization: ["Food Rescue", "Technology", "Urban Poverty"]
  },
  {
    id: 4,
    name: "Seva Bharti",
    mission: "Comprehensive care for underprivileged communities",
    location: "Pune, Maharashtra",
    established: "2012",
    beneficiaries: "80,000+",
    phone: "+91 65432 10987",
    email: "contact@sevabharti.org",
    website: "https://sevabharti.org",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=300&h=200&fit=crop",
    specialization: ["Healthcare", "Food Distribution", "Women Empowerment"]
  }
];

export default function NGOs() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    ngoName: "",
    mission: "",
    location: "",
    contactPerson: "",
    phone: "",
    email: "",
    website: "",
    description: "",
    specialization: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ngoList, setNgoList] = useState(mockNGOs);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Add new NGO to list
    const newNGO = {
      id: ngoList.length + 1,
      name: formData.ngoName,
      mission: formData.mission,
      location: formData.location,
      established: "2024",
      beneficiaries: "New Partner",
      phone: formData.phone,
      email: formData.email,
      website: formData.website,
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=300&h=200&fit=crop",
      specialization: formData.specialization.split(",").map(s => s.trim()).filter(Boolean)
    };

    setNgoList(prev => [...prev, newNGO]);

    toast({
      title: "NGO Registration Successful! 🎉",
      description: "Thank you for joining our mission. We'll review your application and get back to you soon.",
    });

    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      ngoName: "",
      mission: "",
      location: "",
      contactPerson: "",
      phone: "",
      email: "",
      website: "",
      description: "",
      specialization: ""
    });
  };

  const isFormValid = formData.ngoName && formData.mission && formData.location && 
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
              Our NGO Partners
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Trusted organizations working tirelessly to eliminate hunger and support communities across India.
            </p>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="btn-hero">
                  <Plus className="mr-2 h-5 w-5" />
                  Join as NGO Partner
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Register Your NGO</DialogTitle>
                  <DialogDescription>
                    Join our network of verified NGOs and help us expand our reach in the community.
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ngoName">NGO Name *</Label>
                      <Input
                        id="ngoName"
                        placeholder="Enter NGO name"
                        value={formData.ngoName}
                        onChange={(e) => handleInputChange("ngoName", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson">Contact Person *</Label>
                      <Input
                        id="contactPerson"
                        placeholder="Primary contact name"
                        value={formData.contactPerson}
                        onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mission">Mission Statement *</Label>
                    <Textarea
                      id="mission"
                      placeholder="Describe your NGO's mission and objectives"
                      value={formData.mission}
                      onChange={(e) => handleInputChange("mission", e.target.value)}
                      rows={3}
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
                        placeholder="contact@ngo.org"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Operating Location *</Label>
                      <Input
                        id="location"
                        placeholder="City, State"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="website">Website (Optional)</Label>
                      <Input
                        id="website"
                        placeholder="https://your-ngo.org"
                        value={formData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialization">Areas of Specialization</Label>
                    <Input
                      id="specialization"
                      placeholder="Food Distribution, Child Welfare, Healthcare (comma separated)"
                      value={formData.specialization}
                      onChange={(e) => handleInputChange("specialization", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Additional Information</Label>
                    <Textarea
                      id="description"
                      placeholder="Tell us more about your NGO's work and impact"
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
                    {isSubmitting ? "Submitting..." : "Register NGO"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </motion.div>

          {/* NGO Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {ngoList.map((ngo, index) => (
              <motion.div
                key={ngo.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="card-gradient hover:scale-105 transition-transform duration-300 h-full">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img 
                      src={ngo.image} 
                      alt={ngo.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{ngo.name}</h3>
                      <p className="text-sm opacity-90">Est. {ngo.established}</p>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {ngo.mission}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {ngo.specialization.map((spec, idx) => (
                        <Badge key={idx} variant="secondary">{spec}</Badge>
                      ))}
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {ngo.location}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        {ngo.beneficiaries} beneficiaries
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        {ngo.phone}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        {ngo.email}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Heart className="mr-2 h-4 w-4" />
                        Partner
                      </Button>
                      {ngo.website && (
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Impact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-16 text-center"
          >
            <Card className="card-gradient max-w-4xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6">Collective Impact</h2>
                <div className="grid md:grid-cols-4 gap-6">
                  <div>
                    <div className="impact-counter">165K+</div>
                    <p className="text-muted-foreground">Total Beneficiaries</p>
                  </div>
                  <div>
                    <div className="impact-counter">24</div>
                    <p className="text-muted-foreground">Partner NGOs</p>
                  </div>
                  <div>
                    <div className="impact-counter">50K+</div>
                    <p className="text-muted-foreground">Meals Distributed</p>
                  </div>
                  <div>
                    <div className="impact-counter">15</div>
                    <p className="text-muted-foreground">Cities Covered</p>
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