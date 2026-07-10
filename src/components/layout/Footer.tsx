import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Footer() {
  const { toast } = useToast();

  const handleWorkingLink = (feature: string) => {
    toast({
      title: `${feature} Form Open 📝`,
      description: `Connecting to ShareFood support. Please write your details or call our helpline.`,
    });
  };

  return (
    <footer className="bg-[#8B5A2B] text-white pt-12 pb-6 border-t border-white/10">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 mb-8">
        {/* Left Section - Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-white/15 p-2 rounded-xl text-white font-display font-bold text-xl flex items-center gap-2">
              🧡 ShareFood
            </div>
          </div>
          <p className="text-sm text-white/80 max-w-sm">
            Connecting hearts through food. Join us in fighting hunger and reducing food waste across India.
          </p>
          <div className="space-y-2 text-xs text-white/70 pt-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-white/90" />
              <span>New Delhi, India</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-white/90" />
              <span>contact@sharefood.org</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-white/90" />
              <span>+91 9876543210</span>
            </div>
          </div>
        </div>

        {/* Right Section - Cleaned & Working Links */}
        <div className="flex md:justify-end items-start pt-4">
          <div className="space-y-3 min-w-[150px]">
            <h4 className="font-bold text-base border-b border-white/20 pb-1 uppercase tracking-wider text-white/90">Support Desk</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link 
                  to="/contact" 
                  onClick={() => handleWorkingLink("Contact Us")}
                  className="hover:text-amber-200 transition-colors flex items-center gap-1.5 font-medium"
                >
                  📞 Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  onClick={() => handleWorkingLink("Complaints Desk")}
                  className="hover:text-amber-200 transition-colors flex items-center gap-1.5 font-medium"
                >
                  ⚠️ Complaints
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom copyright strip */}
      <div className="container mx-auto px-4 border-t border-white/10 pt-4 flex flex-col sm:flex-row justify-between items-center text-xs text-white/60 gap-2">
        <p>© 2026 ShareFood. All rights reserved. Made with ❤️ for India.</p>
        <div className="flex gap-4">
          <span className="cursor-pointer hover:text-white">Facebook</span>
          <span className="cursor-pointer hover:text-white">Twitter</span>
          <span className="cursor-pointer hover:text-white">Instagram</span>
        </div>
      </div>
    </footer>
  );
}