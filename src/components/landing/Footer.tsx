export const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Sobre Nós</h3>
          <p className="text-primary-foreground/80">
            Simplificando a gestão financeira e fiscal para empresas de todos os tamanhos desde 2020.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Contato</h3>
          <p className="text-primary-foreground/80">
            contato@empresa.com.br<br />
            (11) 9999-9999<br />
            Seg-Sex, 9h-18h
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
                Suporte
              </a>
            </li>
            <li>
              <a href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
                Documentação
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
              Instagram
            </a>
            <a href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
              Facebook
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-primary-foreground/20 text-center text-primary-foreground/60">
        <p>&copy; 2024 ERP ITA. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};