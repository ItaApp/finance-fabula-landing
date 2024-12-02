import { DollarSign, Building, Handshake, ChartBar, Users, Globe, Rocket, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Building className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">ERP ITA</span>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => navigate("/auth")}
              >
                Entrar
              </Button>
              <Button
                className="flex items-center gap-2"
                onClick={() => navigate("/auth")}
              >
                Começar Grátis
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Add padding to account for fixed header */}
      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative bg-primary py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-up">
                Transforme sua Gestão Empresarial
              </h1>
              <p className="text-xl sm:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
                Simplifique processos, aumente a produtividade e tome decisões mais inteligentes com nossa plataforma completa de gestão
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.4s" }}>
                <Button
                  size="lg"
                  className="bg-white hover:bg-white/90 text-primary px-8 py-6 text-lg"
                  onClick={() => navigate("/auth")}
                >
                  Começar Gratuitamente
                  <Rocket className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
                  onClick={() => navigate("/auth")}
                >
                  Agendar Demonstração
                  <Handshake className="ml-2 h-5 w-5" />
                </Button>
              </div>
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