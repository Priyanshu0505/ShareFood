import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge"; 
import { Menu, Heart, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider"; 

const navigationItems = [
  { name: "Home", href: "/", roles: ["all"] },
  { name: "Donate Food", href: "/donate-food", roles: ["donor"] },
  { name: "Receive Food", href: "/receive-food", roles: ["ngo"] },
  { name: "Support Desk", href: "/contact", roles: ["all"] }, // 📞 Contact & Complaints Desk Sabko Dikhega
  { name: "About", href: "/about", roles: ["all"] }, 
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth(); 

  const isActive = (path: string) => location.pathname === path;

  // ROLE FILTERING LOGIC
  const filteredNavigation = navigationItems.filter((item) => {
    // 1. Agar koi user login NAHI hai
    if (!user) {
      return item.roles.includes("all");
    }

    // 2. Agar user login HAI
    if (item.roles.includes("all")) return true; 
    return item.roles.includes(user.role); // Matches dynamic 'donor' or 'ngo' role configurations
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="rounded-lg bg-gradient-primary p-2">
            <Heart className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-display font-bold text-foreground">
            ShareFood
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {filteredNavigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                isActive(item.href)
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {item.name}
              {isActive(item.href) && (
                <motion.div
                  className="absolute -bottom-1 left-1/2 h-0.5 w-8 bg-primary rounded-full"
                  layoutId="activeTab"
                  initial={false}
                  style={{ x: "-50%" }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {user ? (
            <div className="flex items-center gap-3 bg-muted px-3 py-1.5 rounded-full border border-border">
              <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                <UserIcon className="h-4 w-4 text-primary" />
                <span className="max-w-[100px] truncate">{user.name}</span>
                <Badge variant="default" className="text-[10px] bg-green-600 hover:bg-green-600 text-white uppercase px-1 py-0 scale-90">
                  {user.role === 'ngo' ? 'RECEIVER' : 'DONOR'}
                </Badge>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={logout} 
                className="h-7 w-7 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button size="sm" className="btn-hero">
                Join Us
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Responsive Sheet */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col space-y-4 mt-6">
              {filteredNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                    isActive(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="border-t pt-4 space-y-3">
                {user ? (
                  <div className="space-y-2">
                    <p className="text-center text-xs text-muted-foreground font-medium mb-2">
                      Logged in as: <span className="text-foreground font-semibold">{user.name}</span> (<span className="text-green-600 font-bold">{user.role.toUpperCase()}</span>)
                    </p>
                    <Button 
                      variant="destructive" 
                      className="w-full flex items-center justify-center gap-2 text-xs" 
                      onClick={() => { logout(); setMobileMenuOpen(false); }}
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full btn-hero">
                      Join Us
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}