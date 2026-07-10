import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, MapPin, Clock, Users, CheckCircle, Camera, History, Building2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import API from "@/lib/api"; 

const foodTypes = [
  "Cooked Meals", "Fruits & Vegetables", "Packaged Food", "Dairy Products", 
  "Grains & Cereals", "Bakery Items", "Beverages", "Other"
];

const quantityOptions = [
  "1-5 people", "6-10 people", "11-25 people", "26-50 people", 
  "51-100 people", "100+ people"
];

export default function DonateFood() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    foodName: "",
    foodType: "",
    quantity: "",
    expiry: "",
    location: "",
    description: "",
    contactNumber: "",
    image: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  const [donationHistory, setDonationHistory] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  // FETCH DONATION TRACKS
  const fetchMyHistory = async () => {
    try {
      setLoadingHistory(true);
      const response = await API.get("/donations/my-donations");
      setDonationHistory(response.data);
    } catch (error) {
      console.error("History fetch error", error);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    fetchMyHistory();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("foodType", `${formData.foodName} (${formData.foodType})`);
      formDataToSend.append("quantity", formData.quantity);
      formDataToSend.append("expiryTime", formData.expiry);
      formDataToSend.append("pickupAddress", formData.location);
      formDataToSend.append("contactNumber", formData.contactNumber);
      
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      await API.post("/donations/create", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "Food Donation Posted Successfully! 🎉",
        description: "Your donation is live with image security integration.",
      });

      setShowPreview(false);
      setFormData({
        foodName: "", foodType: "", quantity: "", expiry: "", location: "", description: "", contactNumber: "", image: null
      });

      fetchMyHistory();
    } catch (error: any) {
      toast({
        title: "Failed to Post Donation ❌",
        description: error.response?.data?.msg || "Something went wrong.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // TRIGGER BACKEND DYNAMIC PICKUP OTP GENERATOR
  const triggerOtpGeneration = async (id: string) => {
    try {
      const response = await API.put(`/donations/generate-otp/${id}`);
      toast({
        title: "Verification OTP Live! 🔐",
        description: `Share this code with the arriving rider: ${response.data.otp}`,
      });
      fetchMyHistory(); // Refresh feed to map locally
    } catch (e) {
      toast({
        title: "Failed to generate security token",
        variant: "destructive"
      });
    }
  };

  const isFormValid = formData.foodName && formData.foodType && formData.quantity && 
                       formData.expiry && formData.location && formData.contactNumber;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6">Donate Food & Share Hope</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your excess food can become someone's complete meal. Fill in the details below.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-6 w-6 text-primary" /> Food Donation Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-2 mb-4">
                      <Label htmlFor="foodName">Food Name *</Label>
                      <Input
                        id="foodName"
                        placeholder="e.g., Vegetable Biryani, Mixed Dal"
                        value={formData.foodName}
                        onChange={(e) => handleInputChange("foodName", e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor="foodType">Food Type *</Label>
                        <Select value={formData.foodType} onValueChange={(value) => handleInputChange("foodType", value)}>
                          <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                          <SelectContent>
                            {foodTypes.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="quantity">Serves *</Label>
                        <Select value={formData.quantity} onValueChange={(value) => handleInputChange("quantity", value)}>
                          <SelectTrigger><SelectValue placeholder="Number of people" /></SelectTrigger>
                          <SelectContent>
                            {quantityOptions.map((option) => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Best Before *</Label>
                        <Input
                          id="expiry"
                          type="datetime-local"
                          value={formData.expiry}
                          onChange={(e) => handleInputChange("expiry", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contactNumber">Contact Number *</Label>
                        <Input
                          id="contactNumber"
                          placeholder="+91 9876543210"
                          value={formData.contactNumber}
                          onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <Label htmlFor="location">Pickup Location *</Label>
                      <Input
                        id="location"
                        placeholder="Full address with campus area or hostel block"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2 mb-4">
                      <Label htmlFor="description">Additional Details (Optional)</Label>
                      <Textarea
                        id="description"
                        placeholder="Any special instructions..."
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2 mb-6">
                      <Label htmlFor="image">Food Image (Optional)</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                        <input id="image" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        <label htmlFor="image" className="cursor-pointer">
                          <Camera className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
                          <p className="text-xs text-muted-foreground">
                            {formData.image ? formData.image.name : 'Click to upload food image'}
                          </p>
                        </label>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-2">
                      <Button type="button" variant="outline" onClick={() => setShowPreview(true)} disabled={!isFormValid} className="flex-1">Preview</Button>
                      <Button type="submit" disabled={!isFormValid || isSubmitting} className="flex-1 btn-hero">
                        {isSubmitting ? "Posting..." : "Donate Food"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Preview/Info Panel */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
              {showPreview && (
                <Card className="card-gradient">
                  <CardHeader><CardTitle className="text-base">Quick Summary View</CardTitle></CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <h3 className="font-semibold">{formData.foodName || "Untitled Post"}</h3>
                    <p className="text-muted-foreground">📍 {formData.location || "No address entered"}</p>
                  </CardContent>
                </Card>
              )}

              <Card className="card-gradient">
                <CardHeader><CardTitle className="text-primary text-lg">Secure Verification Cycle</CardTitle></CardHeader>
                <CardContent className="space-y-3 text-xs text-muted-foreground">
                  <p>1. Post your excess food listings with active item specifics.</p>
                  <p>2. Once claimed, generate a secure 4-digit token authentication code.</p>
                  <p>3. Handover meals only after the receiver verifies the code on desk.</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* STATUS TRACKER */}
          <Card className="card-gradient border border-primary/20 max-w-6xl mx-auto">
            <CardHeader className="flex flex-row items-center justify-between border-b pb-4 mb-4">
              <CardTitle className="flex items-center gap-2 text-xl"><History className="h-5 w-5 text-primary" /> Your Food Donation Status Tracker</CardTitle>
              <Button variant="outline" size="sm" onClick={fetchMyHistory}>Refresh Tracker</Button>
            </CardHeader>
            <CardContent>
              {loadingHistory ? (
                <p className="text-center text-muted-foreground animate-pulse py-6">Syncing tracks...</p>
              ) : donationHistory.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">You haven't posted any food donations yet.</p>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {donationHistory.map((track) => (
                    <div key={track._id} className={`p-4 rounded-xl border flex flex-col justify-between ${track.status === 'completed' ? 'bg-emerald-500/5 border-emerald-500/20' : track.status === 'accepted' ? 'bg-blue-500/5 border-blue-500/20' : 'bg-orange-500/5 border-orange-500/20'}`}>
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-base text-foreground">{track.foodType}</h4>
                          <Badge className="capitalize" variant={track.status === 'completed' ? 'default' : 'secondary'}>
                            {track.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">📍 Location: {track.pickupAddress}</p>
                      </div>

                      <div className="border-t pt-3 mt-4 space-y-2">
                        {track.status === 'accepted' && (
                          <div className="flex flex-col gap-2 bg-background p-2.5 rounded-lg border border-dashed border-amber-500/30">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-semibold text-muted-foreground">Authentication Code:</span>
                              {track.pickupOTP ? (
                                <div className="bg-amber-100 text-amber-800 font-mono font-bold text-sm px-2 py-0.5 rounded tracking-widest border border-amber-200 shadow-sm">
                                  {track.pickupOTP}
                                </div>
                              ) : (
                                <Button size="sm" onClick={() => triggerOtpGeneration(track._id)} className="h-7 text-xs bg-amber-600 hover:bg-amber-700 text-white font-medium">
                                  🔒 Generate Pickup OTP
                                </Button>
                              )}
                            </div>
                          </div>
                        )}

                        {track.status === 'completed' ? (
                          <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">🎉 Food collected safely by verified NGO coordinator!</p>
                        ) : track.status === 'accepted' ? (
                          <div className="text-xs">
                            <p className="text-[10px] text-blue-600 font-bold uppercase">Claimed By:</p>
                            <p className="font-bold text-foreground">{track.acceptedBy?.name || "Verified Receiver"}</p>
                            <p className="text-muted-foreground font-semibold mt-0.5">📞 Contact: {track.acceptedBy?.contact || "8548784595"}</p>
                          </div>
                        ) : (
                          <p className="text-xs text-orange-600 flex items-center gap-1"><AlertCircle className="h-4 w-4" /> Waiting for NGO acceptance...</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}