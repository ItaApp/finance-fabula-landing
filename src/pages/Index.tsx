import { DollarSign, FileText, ChartBar, Calendar, Printer, Check, LogIn, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

// Extracted components to make the file smaller
import { Features } from "@/components/landing/Features";
import { Stats } from "@/components/landing/Stats";
import { PricingPlans } from "@/components/landing/PricingPlans";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-dark">ERP ITA</div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => navigate("/auth")}
              >
                <LogIn className="w-4 h-4" />
                Login
              </Button>
              <Button
                className="flex items-center gap-2"
                onClick={() => navigate("/auth")}
              >
                <User className="w-4 h-4" />
                Cadastro
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Add padding to account for fixed header */}
      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative bg-dark py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 animate-fade-up">
                Gestão Financeira Simplificada
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
                Emita notas fiscais, controle suas finanças e tome decisões mais inteligentes
              </p>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg animate-fade-up"
                style={{ animationDelay: "0.4s" }}
                onClick={() => navigate("/auth")}
              >
                Começar Agora
                <DollarSign className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        <Features />
        <Stats />
        <PricingPlans />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;