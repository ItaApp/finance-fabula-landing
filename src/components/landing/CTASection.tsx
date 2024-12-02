import { Rocket, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">
          Pronto para Revolucionar sua Gestão Empresarial?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Junte-se a milhares de empresas que já transformaram sua gestão com nossa plataforma. 
          Comece gratuitamente hoje mesmo!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8"
            onClick={() => navigate("/auth")}
          >
            Começar Gratuitamente
            <Rocket className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
            onClick={() => navigate("/auth")}
          >
            Ver Demonstração
            <Award className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};