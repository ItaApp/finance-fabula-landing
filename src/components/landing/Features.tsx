import { FileText, ChartBar, Calendar, Printer, Users, Globe, Award, DollarSign } from "lucide-react";

const features = [
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Gestão Fiscal Completa",
    description: "Emita e gerencie notas fiscais com facilidade, mantendo sua empresa em conformidade",
  },
  {
    icon: <ChartBar className="w-6 h-6" />,
    title: "Análise Financeira Avançada",
    description: "Dashboards intuitivos e relatórios detalhados para decisões mais assertivas",
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Controle de Prazos",
    description: "Sistema inteligente de alertas para nunca perder datas importantes",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Gestão de Equipe",
    description: "Controle de acesso e permissões para toda sua equipe trabalhar integrada",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Acesso em Qualquer Lugar",
    description: "Sistema 100% na nuvem, acesse de qualquer dispositivo, a qualquer momento",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Suporte Especializado",
    description: "Equipe dedicada para ajudar você em todas as etapas do processo",
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: "Controle Financeiro",
    description: "Gerencie contas a pagar e receber com eficiência e precisão",
  },
  {
    icon: <Printer className="w-6 h-6" />,
    title: "Documentação Digital",
    description: "Armazene e organize todos seus documentos em um só lugar",
  },
];

export const Features = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Tudo que Você Precisa em Um Só Lugar
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Nossa plataforma oferece todas as ferramentas necessárias para uma gestão empresarial eficiente e moderna
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-primary mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-primary mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};