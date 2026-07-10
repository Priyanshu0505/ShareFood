import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Contact from "./pages/Contact"; // Path sahi se match kar lena bhai

// Pages
import Home from "./pages/Home";
import DonateFood from "./pages/DonateFood";
import ReceiveFood from "./pages/ReceiveFood";
import Volunteer from "./pages/Volunteer";
import NGOs from "./pages/NGOs";
import Restaurants from "./pages/Restaurants";
import Login from "./pages/Login";
import Events from "./pages/Events";
import DonateMoney from "./pages/DonateMoney";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

// Icons for placeholder pages
import { Building2, Calendar, DollarSign, MessageSquare, AlertTriangle, ThumbsUp, BookOpen, HelpCircle, Users, Phone, LogIn } from "lucide-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="sharefood-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/donate-food" element={<DonateFood />} />
          <Route path="/receive-food" element={<ReceiveFood />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/ngos" element={<NGOs />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/login" element={<Login />} />
          <Route path="/events" element={<Events />} />
          <Route path="/donate-money" element={<DonateMoney />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Placeholder Pages */}
          <Route path="/reviews" element={
            <PlaceholderPage 
              title="NGO Partners" 
              description="Connect with verified NGOs and see our partner organizations making a difference."
              icon={<Building2 className="h-12 w-12" />}
              comingSoonFeatures={[
                "Browse verified NGO partners",
                "NGO registration and verification system",
                "Impact tracking for each NGO",
                "Direct partnership requests"
              ]}
            />
          } />
          <Route path="/restaurants" element={
            <PlaceholderPage 
              title="Restaurant & Hotel Partners" 
              description="Discover our restaurant and hotel partners who are fighting food waste."
              icon={<Building2 className="h-12 w-12" />}
              comingSoonFeatures={[
                "Restaurant partner directory",
                "Partnership registration for restaurants",
                "Bulk donation management",
                "Regular pickup scheduling"
              ]}
            />
          } />
          <Route path="/events" element={
            <PlaceholderPage 
              title="Events & Campaigns" 
              description="Join our food drives, donation camps, and community initiatives."
              icon={<Calendar className="h-12 w-12" />}
              comingSoonFeatures={[
                "Upcoming food drives and events",
                "Community volunteer campaigns",
                "Awareness programs",
                "Event registration and participation"
              ]}
            />
          } />
          <Route path="/donate-money" element={
            <PlaceholderPage 
              title="Donate Money" 
              description="Support our mission financially and help us expand our reach."
              icon={<DollarSign className="h-12 w-12" />}
              comingSoonFeatures={[
                "Secure online donation system",
                "Multiple payment options",
                "Donation tracking and receipts",
                "Transparency reports on fund usage"
              ]}
            />
          } />
          <Route path="/reviews" element={
            <PlaceholderPage 
              title="Reviews & Testimonials" 
              description="Read reviews from our community and share your experience."
              icon={<ThumbsUp className="h-12 w-12" />}
              comingSoonFeatures={[
                "User reviews and ratings system",
                "Photo testimonials",
                "Success story submissions",
                "Community feedback showcase"
              ]}
            />
          } />
          <Route path="/complaints" element={
            <PlaceholderPage 
              title="Complaints & Issues" 
              description="Report issues and help us improve our service quality."
              icon={<AlertTriangle className="h-12 w-12" />}
              comingSoonFeatures={[
                "Issue reporting system",
                "Complaint tracking and status updates",
                "Photo evidence upload",
                "Resolution timeline and feedback"
              ]}
            />
          } />
          <Route path="/feedback" element={
            <PlaceholderPage 
              title="Feedback & Suggestions" 
              description="Share your suggestions to help us improve our platform."
              icon={<MessageSquare className="h-12 w-12" />}
              comingSoonFeatures={[
                "Feedback submission form",
                "Feature request system",
                "Community suggestions voting",
                "Regular feedback implementation updates"
              ]}
            />
          } />
          <Route path="/blog" element={
            <PlaceholderPage 
              title="Awareness & Blog" 
              description="Read articles, tips, and infographics about food waste and hunger in India."
              icon={<BookOpen className="h-12 w-12" />}
              comingSoonFeatures={[
                "Educational articles on food waste",
                "Infographics and statistics",
                "Expert interviews and insights",
                "Community success stories"
              ]}
            />
          } />
          <Route path="/faq" element={
            <PlaceholderPage 
              title="Frequently Asked Questions" 
              description="Find answers to common questions about food donation and our platform."
              icon={<HelpCircle className="h-12 w-12" />}
              comingSoonFeatures={[
                "Comprehensive FAQ database",
                "Search functionality",
                "Category-wise organization",
                "Regular updates based on user queries"
              ]}
            />
          } />
          <Route path="/about" element={
            <PlaceholderPage 
              title="About ShareFood" 
              description="Learn about our mission, vision, team, and journey to end hunger."
              icon={<Users className="h-12 w-12" />}
              comingSoonFeatures={[
                "Our mission and vision",
                "Team member profiles",
                "Company journey and milestones",
                "Impact statistics and achievements"
              ]}
            />
          } />
          <Route path="/contact" element={
            <PlaceholderPage 
              title="Contact Us" 
              description="Get in touch with our team for support, partnerships, or inquiries."
              icon={<Phone className="h-12 w-12" />}
              comingSoonFeatures={[
                "Contact form with multiple categories",
                "Live chat support",
                "Office locations and map integration",
                "Emergency contact information"
              ]}
            />
          } />
          <Route path="/login" element={
            <PlaceholderPage 
              title="Login & Signup" 
              description="Join our community as a donor, receiver, volunteer, NGO, or restaurant partner."
              icon={<LogIn className="h-12 w-12" />}
              comingSoonFeatures={[
                "Multi-role registration system",
                "Social media login integration",
                "Email verification and security",
                "Role-based dashboard access"
              ]}
            />
          } />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </ThemeProvider>
  </QueryClientProvider>
);

export default App;
