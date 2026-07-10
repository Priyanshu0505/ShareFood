import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MessageSquare, ShieldAlert, History, User, AlertTriangle } from "lucide-react";
import API from "@/lib/api"; 

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticket, setTicket] = useState({
    name: "",
    email: "",
    type: "general", 
    subject: "",
    message: ""
  });

  // Admin Logs States
  const [allTickets, setAllTickets] = useState<any[]>([]);
  const [loadingTickets, setLoadingTickets] = useState(true);

  // 1. FETCH ALL REGISTERED TICKETS FROM DATABASE
  const fetchAllTickets = async () => {
    try {
      setLoadingTickets(true);
      const response = await API.get("/tickets/all");
      setAllTickets(response.data);
    } catch (error) {
      console.error("Error fetching admin logs:", error);
    } {
      setLoadingTickets(false);
    }
  };

  useEffect(() => {
    fetchAllTickets();
  }, []);

  // 2. LIVE SUBMIT TICKET HANDLER
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await API.post("/tickets/submit", ticket);

      toast({
        title: ticket.type === "complaint" ? "Complaint Registered! ⚠️" : "Message Sent Successfully! 📨",
        description: `Bhai, aapka token register ho gaya hai database me.`,
      });
      
      setTicket({ name: "", email: "", type: "general", subject: "", message: "" });
      
      // Auto-refresh log tables instantly
      fetchAllTickets();
    } catch (error: any) {
      toast({
        title: "Submission Failed ❌",
        description: "Server tak data nahi pahonch paya.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen py-12 bg-muted/10">
        <div className="container mx-auto px-4 max-w-4xl space-y-12">
          
          {/* Header Banner */}
          <div className="text-center">
            <h1 className="text-4xl font-bold font-display">ShareFood Help & Support Desk</h1>
            <p className="text-muted-foreground mt-2">Reach out for general queries, emergency support, or raise an official complaint token.</p>
          </div>

          {/* Quick Informational Grid Info Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-4 flex flex-col items-center text-center bg-background border shadow-sm">
              <Phone className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-semibold text-sm">Helpline</h3>
              <p className="text-xs text-muted-foreground mt-1">+91 9876543210</p>
            </Card>

            <Card className="p-4 flex flex-col items-center text-center bg-background border shadow-sm">
              <Mail className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-semibold text-sm">Email Support</h3>
              <p className="text-xs text-muted-foreground mt-1">support@sharefood.org</p>
            </Card>

            <Card className="p-4 flex flex-col items-center text-center bg-background border border-red-200 bg-red-500/[0.01] shadow-sm">
              <ShieldAlert className="h-6 w-6 text-red-500 mb-2" />
              <h3 className="font-semibold text-sm text-red-600">Grievance Desk</h3>
              <p className="text-xs text-muted-foreground mt-1">24/7 Action Cell</p>
            </Card>
          </div>

          {/* Ticket Generation Box */}
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" /> Submit a Support Ticket
              </CardTitle>
              <CardDescription>Fill out the form below, our coordinator will get back to you immediately.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="supportName">Your Full Name *</Label>
                    <Input 
                      id="supportName"
                      required 
                      placeholder="Enter name" 
                      value={ticket.name} 
                      onChange={e => setTicket(prev => ({ ...prev, name: e.target.value }))} 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="supportEmail">Email Address *</Label>
                    <Input 
                      id="supportEmail"
                      type="email" 
                      required 
                      placeholder="name@domain.com" 
                      value={ticket.email} 
                      onChange={e => setTicket(prev => ({ ...prev, email: e.target.value }))} 
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label>Ticket Type / Department *</Label>
                  <Select value={ticket.type} onValueChange={val => setTicket(prev => ({ ...prev, type: val }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">📞 Contact Us / General Inquiry</SelectItem>
                      <SelectItem value="complaint">⚠️ Raise an Official Complaint</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="supportSubject">Subject Line *</Label>
                  <Input 
                    id="supportSubject"
                    required 
                    placeholder="e.g., Delivery Issue, Account sync, etc." 
                    value={ticket.subject} 
                    onChange={e => setTicket(prev => ({ ...prev, subject: e.target.value }))} 
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="supportMessage">Detailed Message *</Label>
                  <Textarea 
                    id="supportMessage"
                    required 
                    rows={4} 
                    placeholder="Write your concern or complaint summary..." 
                    value={ticket.message} 
                    onChange={e => setTicket(prev => ({ ...prev, message: e.target.value }))} 
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full btn-hero mt-2">
                  {isSubmitting ? "Processing Ticket..." : "Submit Ticket Request"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* 🌟 NEW ADMIN / COORDINATOR COMPLAINTS VIEWER LOG PANEL */}
          <Card className="border border-red-500/20 bg-background shadow-md">
            <CardHeader className="flex flex-row items-center justify-between border-b pb-4 mb-2">
              <div>
                <CardTitle className="flex items-center gap-2 text-xl text-foreground">
                  <History className="h-5 w-5 text-red-600" />
                  Admin Control Desk: Active Tickets & Complaints
                </CardTitle>
                <CardDescription>
                  Real-time database feed of user grievances and inquiries.
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={fetchAllTickets}>
                Refresh DB Feed
              </Button>
            </CardHeader>
            
            <CardContent className="pt-2">
              {loadingTickets ? (
                <p className="text-center text-muted-foreground animate-pulse py-6">Syncing ticketing streams...</p>
              ) : allTickets.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No active complaints or tickets found in database.</p>
              ) : (
                <div className="space-y-4">
                  {allTickets.map((t) => (
                    <div 
                      key={t._id} 
                      className={`p-4 rounded-xl border flex flex-col justify-between transition-all bg-muted/30 ${
                        t.type === 'complaint' 
                          ? 'border-red-500/20 bg-red-500/[0.01]' 
                          : 'border-border'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <div>
                          <span className="text-xs text-muted-foreground">Subject Line</span>
                          <h4 className="font-bold text-base text-foreground mt-0.5">{t.subject}</h4>
                        </div>
                        <Badge 
                          className="capitalize px-2.5 py-0.5 font-semibold"
                          variant={t.type === 'complaint' ? 'destructive' : 'secondary'}
                        >
                          {t.type === 'complaint' ? '⚠️ Complaint' : '📞 General'}
                        </Badge>
                      </div>

                      {/* Content Section */}
                      <p className="text-sm text-foreground bg-background p-3 rounded-lg border border-border/60 my-2 italic">
                        "{t.message}"
                      </p>

                      {/* Meta Footer */}
                      <div className="flex flex-wrap justify-between items-center text-xs text-muted-foreground pt-2 border-t border-dashed mt-1 gap-2">
                        <div className="flex items-center gap-1">
                          <User className="h-3.5 w-3.5 text-primary" />
                          <span className="font-medium text-foreground">{t.name}</span> 
                          <span className="text-muted-foreground/80">({t.email})</span>
                        </div>
                        <div>
                          📅 Received: {new Date(t.createdAt).toLocaleString()}
                        </div>
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