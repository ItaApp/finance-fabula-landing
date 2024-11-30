const stats = [
  { number: "98%", label: "Satisfação dos clientes" },
  { number: "+10k", label: "Notas emitidas" },
  { number: "24/7", label: "Suporte disponível" },
];

export const Stats = () => {
  return (
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
  );
};