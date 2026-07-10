import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bike, Clock, MapPin, Users, Trophy, Heart } from "lucide-react";

export default function Volunteer() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6">
              Become a Food Hero 🚴‍♂️
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join 15,000+ volunteers who are bridging the gap between food donors and those in need. 
              Be the hero in someone's hunger story.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Impact Stats */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-6"
            >
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-primary" />
                    Our Active Volunteers
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="impact-counter text-3xl">15,247</div>
                    <p className="text-sm text-muted-foreground">Active Riders</p>
                  </div>
                  <div className="text-center">
                    <div className="impact-counter text-3xl">2.5M+</div>
                    <p className="text-sm text-muted-foreground">Meals Delivered</p>
                  </div>
                  <div className="text-center">
                    <div className="impact-counter text-3xl">98%</div>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                  </div>
                  <div className="text-center">
                    <div className="impact-counter text-3xl">45</div>
                    <p className="text-sm text-muted-foreground">Cities Covered</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-gradient bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardContent className="p-8 text-center">
                  <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Ready to Make a Difference?</h3>
                  <p className="text-muted-foreground mb-6">
                    Join our volunteer community and help deliver hope to those who need it most.
                  </p>
                  <Button className="btn-hero w-full">
                    Register as Volunteer
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Registration Form Coming Soon */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle>Volunteer Registration</CardTitle>
                  <CardDescription>
                    Complete registration form coming soon. Currently accepting applications via phone.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                      <Bike className="h-6 w-6 text-primary" />
                      <div>
                        <h4 className="font-medium">Vehicle Requirements</h4>
                        <p className="text-sm text-muted-foreground">Bike, scooter, or bicycle</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                      <Clock className="h-6 w-6 text-secondary" />
                      <div>
                        <h4 className="font-medium">Flexible Timing</h4>
                        <p className="text-sm text-muted-foreground">Choose your available hours</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                      <MapPin className="h-6 w-6 text-accent" />
                      <div>
                        <h4 className="font-medium">Local Area</h4>
                        <p className="text-sm text-muted-foreground">Serve in your neighborhood</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                      <Users className="h-6 w-6 text-primary" />
                      <div>
                        <h4 className="font-medium">Community Impact</h4>
                        <p className="text-sm text-muted-foreground">Direct help to families</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="font-semibold mb-4">Contact Us to Register</h4>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full" onClick={() => window.open('tel:+919876543210')}>
                        📞 Call: +91 9876543210
                      </Button>
                      <Button variant="outline" className="w-full" onClick={() => window.open('mailto:volunteer@sharefood.org')}>
                        ✉️ Email: volunteer@sharefood.org
                      </Button>
                      <Button variant="outline" className="w-full" onClick={() => window.open('https://wa.me/919876543210')}>
                        💬 WhatsApp: +91 9876543210
                      </Button>
                    </div>
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