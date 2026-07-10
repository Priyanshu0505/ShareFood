import React from "react";
import Header from "./Header"; // Ye humare naye conditional Header ko link karega
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Humara updated Header component */}
      <Header /> 
      
      {/* Baaki saare pages ka content yahan load hoga */}
      <main className="flex-1">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}