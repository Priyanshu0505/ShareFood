import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const stories = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Restaurant Owner, Mumbai",
    story: "Through ShareFood, we've donated over 5,000 meals in just 6 months. Instead of throwing away perfectly good food, we're feeding families in need. It's transformed how we think about our responsibility to the community.",
    impact: "5,000+ meals donated",
    rating: 5,
    image: "👩‍🍳"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    role: "Volunteer Rider, Delhi",
    story: "Being a rider for ShareFood has been the most fulfilling experience. Every delivery I make, I see the smile on someone's face who was worried about their next meal. I've completed 200+ deliveries and it never gets old.",
    impact: "200+ successful deliveries",
    rating: 5,
    image: "🚴‍♂️"
  },
  {
    id: 3,
    name: "Maya NGO Foundation",
    role: "NGO Partner, Bangalore",
    story: "ShareFood has been our lifeline during the pandemic. Their systematic approach to food distribution helped us reach 1,500 children daily. The transparency and efficiency of their platform is remarkable.",
    impact: "1,500 children fed daily",
    rating: 5,
    image: "🏢"
  },
  {
    id: 4,
    name: "Amit Patel",
    role: "Tech Professional, Pune",
    story: "I donate through ShareFood monthly and volunteer on weekends. Seeing how my small contribution becomes someone's complete meal has changed my perspective on giving. The app makes it so easy to make a difference.",
    impact: "₹25,000+ donated, 50+ volunteer hours",
    rating: 5,
    image: "👨‍💻"
  }
];

export default function SuccessStories() {
  const [currentStory, setCurrentStory] = useState(0);

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length);
  };

  return (
    <section id="impact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            Stories of Hope & Impact
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real people, real impact. Hear from our community members who are making a difference every day.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            key={currentStory}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="card-gradient p-12 rounded-2xl"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center text-4xl">
                  {stories[currentStory].image}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <Quote className="h-8 w-8 text-primary/30 mb-4 mx-auto md:mx-0" />
                
                <blockquote className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed italic">
                  "{stories[currentStory].story}"
                </blockquote>

                <div className="space-y-2">
                  <h4 className="text-xl font-semibold">{stories[currentStory].name}</h4>
                  <p className="text-primary font-medium">{stories[currentStory].role}</p>
                  
                  {/* Impact Badge */}
                  <div className="inline-flex items-center bg-secondary/20 text-secondary px-4 py-2 rounded-full text-sm font-medium">
                    <Star className="h-4 w-4 mr-2" />
                    {stories[currentStory].impact}
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center justify-center md:justify-start space-x-1 pt-2">
                    {[...Array(stories[currentStory].rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevStory}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {stories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStory(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentStory 
                      ? 'bg-primary scale-125' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextStory}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-8 mt-16"
        >
          {[
            { number: "98%", label: "User Satisfaction" },
            { number: "2.5M+", label: "Lives Impacted" },
            { number: "15K+", label: "Active Users" },
            { number: "500+", label: "Success Stories" }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="impact-counter text-3xl md:text-4xl mb-2">
                {stat.number}
              </div>
              <p className="text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}