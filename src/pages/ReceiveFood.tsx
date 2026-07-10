import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Search, User, History, Upload } from "lucide-react"; 
import { useToast } from "@/hooks/use-toast";
import API from "@/lib/api"; 

export default function ReceiveFood() {
  const { toast } = useToast();
  const [availableFood, setAvailableFood] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [acceptedHistory, setAcceptedHistory] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  // 1. FETCH LIVE PENDING LISTS FROM DB
  const fetchDonations = async () => {
    try {
      setLoading(true);
      const response = await API.get("/donations/pending");
      
      const formattedData = response.data.map((item: any) => {
        const rawFoodType = item.foodType || "Cooked Meals";
        const parsedType = rawFoodType.includes("(") ? rawFoodType.split("(")[1].replace(")", "") : "Cooked Meals";

        return {
          id: item._id,
          name: rawFoodType, 
          type: parsedType.trim(),
          quantity: item.quantity || "Not specified",
          expiry: item.expiryTime || new Date().toISOString(),
          location: item.pickupAddress || "Address Unavailable",
          imageUrl: item.image || null, 
          donorName: item.donor?.name || "Anonymous Donor",
          contact: item.contactNumber || "8548784595"
        };
      });
      
      setAvailableFood(formattedData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 2. FETCH NGO CLAIMS RECORDS
  const fetchMyAcceptedHistory = async () => {
    try {
      setLoadingHistory(true);
      const response = await API.get("/donations/my-accepted");
      setAcceptedHistory(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    fetchDonations();
    fetchMyAcceptedHistory();
  }, []);

  // 3. CLAIM PENDING DONATION HANDLER
  const handleAcceptDonation = async (donationId: string) => {
    try {
      await API.put(`/donations/accept/${donationId}`);
      toast({
        title: "Donation Claimed! 🎉",
        description: "You have accepted this food donation. Please coordinate pickup code.",
      });
      setAvailableFood(prev => prev.filter(food => food.id !== donationId));
      fetchMyAcceptedHistory();
    } catch (error: any) {
      toast({
        title: "Claim Failed ❌",
        description: error.response?.data?.msg || "Error claiming food.",
        variant: "destructive"
      });
    }
  };

  // 4. VERIFY OTP PROMPT MECHANISM
  const triggerOtpVerification = async (id: string) => {
    const inputOtp = prompt("Bhai, donor se milne wala 4-digit Verification OTP yahan enter karo:");
    if (!inputOtp) return; // Exit if blank

    try {
      await API.put(`/donations/verify-otp/${id}`, { otp: inputOtp });
      toast({
        title: "Pickup Completed & Verified! 🎉",
        description: "Food handover verified safely via token mapping.",
      });
      fetchMyAcceptedHistory(); // Reload table layouts instantly
    } catch (error: any) {
      toast({
        title: "Verification Failed ❌",
        description: error.response?.data?.msg || "Incorrect code token entry.",
        variant: "destructive"
      });
    }
  };

  const filteredFood = availableFood.filter(food => 
    (food.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (food.location?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  const getTimeRemaining = (expiry: string) => {
    const now = new Date();
    const expiryDate = new Date(expiry);
    const diff = expiryDate.getTime() - now.getTime();
    if (diff < 0) return "Expired";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return `${hours}h left`;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background py-12">
        <div className="container mx-auto px-4">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6">Find Food Near You</h1>
          </div>

          {/* Search */}
          <div className="mb-8">
            <Card className="card-gradient">
              <CardContent className="p-4 flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search food or area..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" />
                </div>
                <Button onClick={fetchDonations} className="btn-hero">Sync Feeds</Button>
              </CardContent>
            </Card>
          </div>

          {/* Grid View */}
          <h2 className="text-2xl font-bold mb-4">🟢 Available Donations Right Now ({filteredFood.length})</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredFood.map((food) => (
              <Card key={food.id} className="card-gradient flex flex-col justify-between overflow-hidden">
                <div className="w-full h-44 bg-muted overflow-hidden relative border-b">
                  {food.imageUrl ? (
                    <img 
                      src={`http://localhost:5000/${food.imageUrl}`} 
                      alt={food.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500"; }}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                      <Upload className="h-5 w-5 mb-1 text-primary/40" />
                      <span className="text-xs">Fresh Food Post</span>
                    </div>
                  )}
                </div>

                <CardContent className="p-4 space-y-4">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-base line-clamp-1">{food.name}</h3>
                    <Badge variant="secondary" className="shrink-0">{food.type}</Badge>
                  </div>

                  <div className="p-2.5 bg-muted rounded-xl space-y-1 text-xs">
                    <p className="font-bold flex items-center gap-1"><User className="h-3 w-3" /> Donor: {food.donorName}</p>
                    <p className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Pickup: {food.location}</p>
                    <p className="font-semibold text-green-600">📞 Phone: {food.contact}</p>
                  </div>

                  <div className="flex justify-between items-center text-xs pt-1">
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {getTimeRemaining(food.expiry)}</span>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white font-medium text-xs px-3" onClick={() => handleAcceptDonation(food.id)}>Accept & Claim</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CLAIMS PANEL & AUTH CELL */}
          <Card className="card-gradient border border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between border-b pb-4 mb-4">
              <CardTitle className="text-xl flex items-center gap-2"><History className="h-5 w-5 text-green-600" /> Your Accepted & Claimed Food Logs</CardTitle>
              <Button variant="outline" size="sm" onClick={fetchMyAcceptedHistory}>Refresh Logs</Button>
            </CardHeader>
            <CardContent>
              {loadingHistory ? (
                <p className="text-center text-muted-foreground animate-pulse py-4">Loading tracks...</p>
              ) : acceptedHistory.length === 0 ? (
                <p className="text-center text-muted-foreground py-6">You haven't claimed any food donations yet.</p>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {acceptedHistory.map((item) => (
                    <div key={item._id} className="p-4 rounded-xl border bg-background border-green-500/20 flex flex-col justify-between shadow-sm">
                      <div>
                        <div className="flex justify-between items-start mb-2 gap-2">
                          <h4 className="font-bold text-foreground text-sm line-clamp-1">{item.foodType}</h4>
                          <Badge className={item.status === 'completed' ? 'bg-emerald-600 text-white capitalize' : 'bg-green-600 text-white capitalize'}>
                            {item.status === 'completed' ? 'Collected' : 'Claimed'}
                          </Badge>
                        </div>
                        <div className="p-2.5 rounded-lg bg-muted text-xs space-y-1">
                          <p>👤 Donor: <span className="font-medium text-foreground">{item.donor?.name || "Verified Profile"}</span></p>
                          <p>📍 Address: <span className="font-medium text-foreground">{item.pickupAddress}</span></p>
                          <p className="text-green-600 font-bold">📞 Contact: {item.contactNumber || "8548784595"}</p>
                        </div>
                      </div>

                      {item.status !== 'completed' && (
                        <Button 
                          onClick={() => triggerOtpVerification(item._id)}
                          className="w-full mt-3 bg-amber-600 hover:bg-amber-700 text-white text-xs h-8 flex items-center justify-center gap-1 font-semibold shadow-sm"
                        >
                          🔐 Verify & Complete Pickup
                        </Button>
                      )}
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