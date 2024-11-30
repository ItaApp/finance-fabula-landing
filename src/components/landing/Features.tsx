import { FileText, ChartBar, Calendar, Printer } from "lucide-react";

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

export const Features = () => {
  return (
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
  );
};