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
import { Calendar, MapPin, Users, Clock, Plus, Share2, ExternalLink, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockEvents = [
  {
    id: 1,
    title: "Weekend Food Drive - Andheri",
    type: "Food Drive",
    description: "Join us for a community food collection drive in Andheri. We'll be collecting non-perishable items and fresh produce to distribute to local families in need.",
    date: "2024-12-22",
    time: "09:00 AM - 5:00 PM",
    location: "Andheri Sports Complex, Mumbai",
    organizer: "Hope Foundation Mumbai",
    participants: 45,
    maxParticipants: 100,
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=250&fit=crop",
    requirements: ["Volunteers for sorting", "Collection boxes", "Transportation help"]
  },
  {
    id: 2,
    title: "Corporate Food Donation Campaign",
    type: "Corporate Event",
    description: "A collaborative effort with local businesses to collect surplus food from corporate cafeterias and distribute to NGOs serving underprivileged communities.",
    date: "2024-12-25",
    time: "10:00 AM - 2:00 PM",
    location: "BKC Business District, Mumbai",
    organizer: "ShareFood Team",
    participants: 28,
    maxParticipants: 50,
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=250&fit=crop",
    requirements: ["Corporate volunteers", "Coordination staff", "Delivery vehicles"]
  },
  {
    id: 3,
    title: "Community Kitchen Setup",
    type: "Infrastructure",
    description: "Setting up a new community kitchen in Dharavi to serve fresh, hot meals to local residents. This is a long-term sustainability project.",
    date: "2024-12-28",
    time: "08:00 AM - 6:00 PM",
    location: "Dharavi, Mumbai",
    organizer: "Annapurna Seva Trust",
    participants: 67,
    maxParticipants: 80,
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=250&fit=crop",
    requirements: ["Kitchen equipment setup", "Cooking volunteers", "Administrative support"]
  },
  {
    id: 4,
    title: "New Year Food Festival",
    type: "Festival",
    description: "Celebrate the New Year by sharing joy through food! Join our festival where we'll distribute special meals and celebrate with families from underserved communities.",
    date: "2025-01-01",
    time: "11:00 AM - 8:00 PM",
    location: "Shivaji Park, Mumbai",
    organizer: "ShareFood Team",
    participants: 123,
    maxParticipants: 200,
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=250&fit=crop",
    requirements: ["Entertainment volunteers", "Food service staff", "Event management"]
  },
  {
    id: 5,
    title: "Thanksgiving Food Collection",
    type: "Food Drive",
    description: "Successfully completed food drive that collected over 500 kg of food items and distributed to 15 NGOs across the city.",
    date: "2024-11-28",
    time: "09:00 AM - 7:00 PM",
    location: "Multiple locations across Mumbai",
    organizer: "Hope Foundation Mumbai",
    participants: 89,
    maxParticipants: 100,
    status: "completed",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=250&fit=crop",
    impact: "500kg food collected, 15 NGOs supported, 300+ families served"
  }
];

const eventTypes = [
  "Food Drive",
  "Corporate Event", 
  "Infrastructure Project",
  "Festival/Celebration",
  "Awareness Campaign",
  "Volunteer Training",
  "NGO Partnership Event",
  "Emergency Relief"
];

export default function Events() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    eventTitle: "",
    eventType: "",
    description: "",
    date: "",
    time: "",
    location: "",
    organizer: "",
    maxParticipants: "",
    requirements: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventList, setEventList] = useState(mockEvents);
  const [filterStatus, setFilterStatus] = useState("all");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Add new event to list
    const newEvent = {
      id: eventList.length + 1,
      title: formData.eventTitle,
      type: formData.eventType,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      organizer: formData.organizer,
      participants: 0,
      maxParticipants: parseInt(formData.maxParticipants) || 50,
      status: "upcoming" as const,
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=250&fit=crop",
      requirements: formData.requirements.split(",").map(r => r.trim()).filter(Boolean)
    };

    setEventList(prev => [...prev, newEvent]);

    toast({
      title: "Event Created Successfully! 🎉",
      description: "Your event has been added and is now visible to the community.",
    });

    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      eventTitle: "",
      eventType: "",
      description: "",
      date: "",
      time: "",
      location: "",
      organizer: "",
      maxParticipants: "",
      requirements: ""
    });
  };

  const joinEvent = (eventId: number) => {
    setEventList(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, participants: event.participants + 1 }
        : event
    ));
    
    toast({
      title: "Successfully Joined! 🎉",
      description: "You're now registered for this event. We'll send you updates soon.",
    });
  };

  const filteredEvents = filterStatus === "all" 
    ? eventList 
    : eventList.filter(event => event.status === filterStatus);

  const isFormValid = formData.eventTitle && formData.eventType && formData.description && 
                     formData.date && formData.time && formData.location && formData.organizer;

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
              Events & Campaigns
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Join our community initiatives, food drives, and awareness campaigns to make a bigger impact together.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="btn-hero">
                    <Plus className="mr-2 h-5 w-5" />
                    Create New Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create Community Event</DialogTitle>
                    <DialogDescription>
                      Organize a food drive, volunteer event, or awareness campaign to engage your community.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="eventTitle">Event Title *</Label>
                        <Input
                          id="eventTitle"
                          placeholder="e.g., Weekend Food Drive"
                          value={formData.eventTitle}
                          onChange={(e) => handleInputChange("eventTitle", e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="eventType">Event Type *</Label>
                        <Select value={formData.eventType} onValueChange={(value) => handleInputChange("eventType", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent>
                            {eventTypes.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Event Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your event, its purpose, and what participants can expect"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        rows={4}
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Event Date *</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => handleInputChange("date", e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="time">Event Time *</Label>
                        <Input
                          id="time"
                          placeholder="e.g., 9:00 AM - 5:00 PM"
                          value={formData.time}
                          onChange={(e) => handleInputChange("time", e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="maxParticipants">Max Participants</Label>
                        <Input
                          id="maxParticipants"
                          type="number"
                          placeholder="50"
                          value={formData.maxParticipants}
                          onChange={(e) => handleInputChange("maxParticipants", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Event Location *</Label>
                        <Input
                          id="location"
                          placeholder="Venue name and address"
                          value={formData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="organizer">Organizer *</Label>
                        <Input
                          id="organizer"
                          placeholder="Your name or organization"
                          value={formData.organizer}
                          onChange={(e) => handleInputChange("organizer", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="requirements">Requirements/What's Needed</Label>
                      <Input
                        id="requirements"
                        placeholder="Volunteers, equipment, supplies (comma separated)"
                        value={formData.requirements}
                        onChange={(e) => handleInputChange("requirements", e.target.value)}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={!isFormValid || isSubmitting}
                      className="w-full btn-hero"
                    >
                      {isSubmitting ? "Creating Event..." : "Create Event"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="upcoming">Upcoming Events</SelectItem>
                  <SelectItem value="completed">Past Events</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {/* Events Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="card-gradient hover:scale-105 transition-transform duration-300 h-full">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className={event.status === "upcoming" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}>
                        {event.type}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant={event.status === "upcoming" ? "default" : "secondary"}>
                        {event.status === "upcoming" ? "Upcoming" : "Completed"}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {event.description}
                      </p>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(event.date).toLocaleDateString()} 
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        {event.participants}/{event.maxParticipants} participants
                      </div>
                    </div>
                    
                    {event.requirements && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">What's needed:</p>
                        <div className="flex flex-wrap gap-1">
                          {event.requirements.slice(0, 2).map((req, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">{req}</Badge>
                          ))}
                          {event.requirements.length > 2 && (
                            <Badge variant="outline" className="text-xs">+{event.requirements.length - 2} more</Badge>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {event.status === "completed" && event.impact && (
                      <div className="bg-secondary/10 rounded-lg p-3">
                        <p className="text-sm font-medium text-secondary mb-1">Impact Achieved:</p>
                        <p className="text-xs text-muted-foreground">{event.impact}</p>
                      </div>
                    )}
                    
                    <div className="flex gap-2 pt-4">
                      {event.status === "upcoming" ? (
                        <>
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => joinEvent(event.id)}
                            disabled={event.participants >= event.maxParticipants}
                          >
                            <Heart className="mr-2 h-4 w-4" />
                            {event.participants >= event.maxParticipants ? "Full" : "Join Event"}
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <Button variant="outline" size="sm" className="flex-1">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Community Impact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-16"
          >
            <Card className="card-gradient max-w-4xl mx-auto">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold mb-6">Community Impact Through Events</h2>
                <div className="grid md:grid-cols-4 gap-6">
                  <div>
                    <div className="impact-counter">25+</div>
                    <p className="text-muted-foreground">Events Organized</p>
                  </div>
                  <div>
                    <div className="impact-counter">1,200+</div>
                    <p className="text-muted-foreground">Volunteers Engaged</p>
                  </div>
                  <div>
                    <div className="impact-counter">5,000+</div>
                    <p className="text-muted-foreground">Meals Distributed</p>
                  </div>
                  <div>
                    <div className="impact-counter">40+</div>
                    <p className="text-muted-foreground">Community Partners</p>
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