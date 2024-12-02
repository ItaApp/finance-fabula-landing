import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const pricingPlans = [
  {
    name: "Free",
    price: "R$ 0",
    description: "Perfeito para testar nossa plataforma",
    features: [
      "Emissão de até 5 notas fiscais/mês",
      "Dashboard básico",
      "Suporte por email",
      "1 usuário"
    ]
  },
  {
    name: "Master",
    price: "R$ 89,90",
    description: "Ideal para pequenas empresas",
    features: [
      "Emissão ilimitada de notas fiscais",
      "Dashboard completo",
      "Suporte prioritário",
      "Até 5 usuários",
      "Relatórios avançados",
      "Integração com contador"
    ]
  },
  {
    name: "Premium",
    price: "R$ 149,90",
    description: "Para empresas em crescimento",
    features: [
      "Todas as features do plano Master",
      "API de integração",
      "Usuários ilimitados",
      "Suporte 24/7",
      "Consultoria financeira mensal",
      "Backup em tempo real"
    ]
  }
];

export const PricingPlans = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Escolha o Plano Ideal
          </h2>
          <p className="text-lg text-muted-foreground">
            Soluções flexíveis para cada etapa do seu negócio
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <Card key={index} className={`relative overflow-hidden ${
              plan.name === "Master" ? "border-primary border-2" : ""
            } animate-fade-up`}
            style={{ animationDelay: `${index * 0.1}s` }}>
              {plan.name === "Master" && (
                <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg text-sm">
                  Mais Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-primary">{plan.price}</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${
                    plan.name === "Master"
                      ? "bg-primary hover:bg-primary/90"
                      : plan.name === "Premium"
                      ? "bg-secondary hover:bg-secondary/90"
                      : ""
                  }`}
                  onClick={() => navigate("/auth")}
                >
                  Começar Agora
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};