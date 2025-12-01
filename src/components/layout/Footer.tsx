import { Plane } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Plane className="w-6 h-6 text-primary-500" />
            <span className="text-white font-semibold">TravelSIA</span>
          </div>
          
          <p className="text-sm">
            © {currentYear} TravelSIA. Planificador de viajes con IA.
          </p>
          
          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:text-white transition-colors">
              Términos
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacidad
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contacto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
