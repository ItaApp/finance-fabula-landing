export const Footer = () => {
  return (
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
  );
};