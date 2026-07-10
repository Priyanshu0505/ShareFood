import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown, Users, Utensils } from "lucide-react";

const problems = [
  {
    icon: AlertTriangle,
    title: "194 Million Hungry",
    description: "India has the largest undernourished population globally, with 194 million people facing food insecurity daily.",
    color: "text-red-500"
  },
  {
    icon: TrendingDown,
    title: "68 Million Tons Wasted",
    description: "₹92,000 crores worth of food is wasted annually while millions go to bed hungry every night.",
    color: "text-orange-500"
  },
  {
    icon: Users,
    title: "Street Children Crisis",
    description: "Over 11 million street children in India struggle for basic meals, representing our collective failure.",
    color: "text-yellow-500"
  },
  {
    icon: Utensils,
    title: "Wedding & Event Waste",
    description: "40% of food prepared for events and weddings gets thrown away, enough to feed thousands.",
    color: "text-red-600"
  }
];

export default function ProblemSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            The Reality We Face
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            While food gets wasted in abundance, millions of our fellow Indians go hungry. 
            This paradox demands immediate action, and together we can bridge this gap.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="card-gradient p-8 rounded-xl text-center hover:scale-105 transition-all duration-300"
              >
                <div className={`inline-flex p-4 rounded-full bg-background mb-6 ${problem.color}`}>
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{problem.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {problem.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="card-gradient p-12 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-3xl font-display font-bold mb-6">
              But Together, We Can Change This Story
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Every meal donated, every volunteer hour contributed, and every rupee given brings us closer to a 
              hunger-free India. Join thousands who are already making a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#impact"
                className="btn-hero inline-flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See Our Impact
              </motion.a>
              <motion.a
                href="/donate-food"
                className="btn-secondary-hero inline-flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Donating Today
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}