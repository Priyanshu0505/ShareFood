import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Utensils, Search, ShieldCheck, Award } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider"; // 🌟 Auth hook import kiya

export default function HeroSection() {
  const { user } = useAuth(); // 🌟 Logged-in user aur uska role fetch kiya

  return (
    <div className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-amber-50/60 via-background to-background overflow-hidden py-12">
      {/* Ambient Decorative Background Graphics */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-500/5 rounded-full blur-2xl -z-10" />

      <div className="container mx-auto px-4 grid lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side Content - Text Content */}
        <div className="lg:col-span-7 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl lg:text-6xl font-display font-bold tracking-tight text-foreground leading-[1.15]">
              Save Food, <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">Share Hope</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-lg text-muted-foreground max-w-xl leading-relaxed"
          >
            Join India's trusted food redistribution network. Connect surplus meals with local verification channels to build zero-waste campus communities.
          </motion.p>

          {/* STATS GRID */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="grid grid-cols-3 gap-4 border-y border-border/60 py-5 max-w-xl text-center bg-background/40 backdrop-blur-sm rounded-xl px-2"
          >
            <div className="space-y-1">
              <h3 className="text-2xl font-bold font-display text-orange-600 tracking-tight flex items-center justify-center gap-1">
                <Utensils className="h-4 w-4 text-orange-500 shrink-0" /> 50K+
              </h3>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Meals Donated</p>
            </div>
            
            <div className="space-y-1 border-x border-border/60">
              <h3 className="text-2xl font-bold font-display text-amber-600 tracking-tight flex items-center justify-center gap-1">
                <ShieldCheck className="h-4 w-4 text-amber-500 shrink-0" /> 1.2K+
              </h3>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Verified NGOs</p>
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold font-display text-emerald-600 tracking-tight flex items-center justify-center gap-1">
                <Award className="h-4 w-4 text-emerald-500 shrink-0" /> 95%
              </h3>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Food Rescued</p>
            </div>
          </motion.div>

          {/* 🌟 DYNAMIC ACTION CARDS BASED ON USER ROLE */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid sm:grid-cols-2 gap-4 max-w-2xl pt-2"
          >
            {/* 1. Donate Food Block: Sirf tab dikhega jab user login na ho YA uska role 'donor' ho */}
            {(!user || user.role === "donor") && (
              <Link to="/donate-food" className="group p-5 bg-background hover:bg-orange-500/[0.02] border hover:border-orange-500/40 rounded-2xl shadow-sm transition-all duration-300 flex items-start gap-4 text-left">
                <div className="p-3 bg-orange-100 text-orange-600 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors shrink-0">
                  <Utensils className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-base text-foreground flex items-center gap-1">
                    Donate Food <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h4>
                  <p className="text-xs text-muted-foreground">Share your surplus excess meals safely.</p>
                </div>
              </Link>
            )}

            {/* 2. Receive Food Block: Sirf tab dikhega jab user login na ho YA uska role 'ngo' ho */}
            {(!user || user.role === "ngo") && (
              <Link to="/receive-food" className="group p-5 bg-background hover:bg-emerald-500/[0.02] border hover:border-emerald-500/40 rounded-2xl shadow-sm transition-all duration-300 flex items-start gap-4 text-left">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl group-hover:bg-emerald-500 group-hover:text-white transition-colors shrink-0">
                  <Search className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-base text-foreground flex items-center gap-1">
                    Receive Food <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h4>
                  <p className="text-xs text-muted-foreground">Find fresh active items near you.</p>
                </div>
              </Link>
            )}
          </motion.div>

        </div>

        {/* Right Side Illustration */}
        <div className="lg:col-span-5 relative hidden lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl border bg-muted"
          >
            <img 
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=80" 
              alt="Food Donation Network Campaign ShareFood"
              className="w-full h-full object-cover brightness-[0.93]"
            />
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-background/80 backdrop-blur-md rounded-2xl border shadow-lg text-sm font-medium flex items-center gap-3">
              <div className="h-2.5 w-2.5 bg-emerald-500 rounded-full animate-pulse" />
              <p className="text-xs text-muted-foreground">
                Live Distribution Centers Active Across Local Campuses
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}