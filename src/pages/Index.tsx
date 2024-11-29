import { DollarSign, FileText, ChartBar, Calendar, Printer, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Emissão de Notas Fiscais",
    description: "Emita notas fiscais em segundos com nosso sistema intuitivo",
  },
  {
    icon: <ChartBar className="w-6 h-6" />,
    title: "Análise Financeira",
    description: "Acompanhe seus resultados com gráficos e relatórios detalhados",
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Controle de Vencimentos",
    description: "Nunca perca um prazo com nosso sistema de alertas",
  },
  {
    icon: <Printer className="w-6 h-6" />,
    title: "Gestão Documental",
    description: "Organize todos seus documentos fiscais em um só lugar",
  },
];

const stats = [
  { number: "98%", label: "Satisfação dos clientes" },
  { number: "+10k", label: "Notas emitidas" },
  { number: "24/7", label: "Suporte disponível" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
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
            >
              Começar Agora
              <DollarSign className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-dark mb-16">
            Recursos Principais
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-dark mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-8">
            Pronto para simplificar sua gestão financeira?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8"
            >
              Criar Conta Grátis
              <Check className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
            >
              Falar com Consultor
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Sobre Nós</h3>
            <p className="text-gray-400">
              Simplificando a gestão financeira e fiscal para empresas de todos os tamanhos.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <p className="text-gray-400">
              contato@empresa.com.br<br />
              (11) 9999-9999
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Facebook
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 Sistema de Gestão Financeira. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;