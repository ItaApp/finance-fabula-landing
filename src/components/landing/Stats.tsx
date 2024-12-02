const stats = [
  { number: "98%", label: "Satisfação dos clientes" },
  { number: "+10k", label: "Notas fiscais emitidas" },
  { number: "24/7", label: "Suporte disponível" },
  { number: "-30%", label: "Redução em custos operacionais" },
];

export const Stats = () => {
  return (
    <section className="bg-primary py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-primary-foreground/80 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};