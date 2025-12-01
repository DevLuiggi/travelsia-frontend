import { useNavigate } from 'react-router-dom';
import { Plane, Sparkles, MapPin, Shield, Clock } from 'lucide-react';
import { Button } from '../components/ui';
import { useAuth } from '../hooks/useAuth';

export function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Plane,
      title: 'Vuelos Reales',
      description: 'Búsqueda de vuelos en tiempo real con la API de Amadeus',
    },
    {
      icon: Sparkles,
      title: 'Itinerarios con IA',
      description: 'Generación de itinerarios personalizados usando OpenAI',
    },
    {
      icon: MapPin,
      title: 'Destinos Populares',
      description: 'Madrid, París, Nueva York y muchos más destinos',
    },
    {
      icon: Shield,
      title: 'Preferencias Personales',
      description: 'Itinerarios adaptados a tu estilo de viaje',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-500 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Plane className="w-16 h-16" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            TravelSIA
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Tu planificador de viajes impulsado por Inteligencia Artificial
          </p>
          
          <p className="text-lg text-white/80 mb-10 max-w-3xl mx-auto">
            Busca vuelos reales, configura tu presupuesto y obtén un itinerario completo 
            día a día generado por IA, adaptado a tus preferencias de viaje.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate('/dashboard')}
                className="text-lg px-8"
              >
                Ir al Dashboard
              </Button>
            ) : (
              <>
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => navigate('/register')}
                  className="text-lg px-8"
                >
                  Comenzar Gratis
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/login')}
                  className="text-lg px-8 border-white text-white hover:bg-white/10"
                >
                  Iniciar Sesión
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            ¿Cómo funciona TravelSIA?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            3 Pasos Simples
          </h2>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Busca Vuelos
                </h3>
                <p className="text-gray-600">
                  Ingresa tu origen, destino y fechas para encontrar vuelos reales disponibles.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Define tu Presupuesto
                </h3>
                <p className="text-gray-600">
                  Indica cuánto quieres gastar y la IA optimizará el itinerario para ti.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Recibe tu Itinerario
                </h3>
                <p className="text-gray-600">
                  Obtén un plan completo día a día con actividades, costos y recomendaciones personalizadas.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')}
            >
              <Clock className="w-5 h-5" />
              Comenzar Ahora
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
