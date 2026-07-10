import { ReactNode } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon?: ReactNode;
  comingSoonFeatures?: string[];
}

export default function PlaceholderPage({ 
  title, 
  description, 
  icon = <Construction className="h-12 w-12" />,
  comingSoonFeatures = []
}: PlaceholderPageProps) {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto"
          >
            <Card className="card-gradient">
              <CardHeader className="pb-8">
                <div className="text-primary mb-6 flex justify-center">
                  {icon}
                </div>
                <CardTitle className="text-3xl lg:text-4xl font-display font-bold">
                  {title}
                </CardTitle>
                <CardDescription className="text-lg">
                  {description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-8">
                {comingSoonFeatures.length > 0 && (
                  <div className="text-left">
                    <h3 className="font-semibold mb-4 text-center">Coming Soon Features:</h3>
                    <ul className="space-y-2">
                      {comingSoonFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-4">
                  <p className="text-muted-foreground mb-6">
                    We're working hard to bring you this feature. In the meantime, explore our other services.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/">
                      <Button className="btn-hero">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Home
                      </Button>
                    </Link>
                    <Link to="/donate-food">
                      <Button variant="outline">
                        Donate Food Now
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <p className="text-sm text-muted-foreground">
                    Have suggestions for this page? 
                    <Link to="/feedback" className="text-primary hover:underline ml-1">
                      Share your feedback
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}