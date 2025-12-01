import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plane, Home, RefreshCw } from 'lucide-react';
import { useItinerary } from '../hooks/useItinerary';
import { ItineraryView } from '../components/itinerary';
import { Button, Spinner } from '../components/ui';

export function Itinerary() {
  const navigate = useNavigate();
  const { itinerary, request, isGenerating, clearItinerary } = useItinerary();

  // Loading state
  if (isGenerating) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-20">
          <Spinner size="lg" className="mx-auto mb-4 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Generando tu itinerario...
          </h2>
          <p className="text-gray-500">
            La IA está creando un plan de viaje personalizado para ti
          </p>
        </div>
      </div>
    );
  }

  // No itinerary state
  if (!itinerary || !request) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-20">
          <Plane className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No hay itinerario generado
          </h2>
          <p className="text-gray-500 mb-6">
            Busca vuelos y genera un itinerario personalizado
          </p>
          <Button onClick={() => navigate('/flights/search')}>
            Buscar Vuelos
          </Button>
        </div>
      </div>
    );
  }

  const handleNewItinerary = () => {
    clearItinerary();
    navigate('/flights/search');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Navigation */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </Button>
        
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate('/dashboard')}
        >
          <Home className="w-4 h-4" />
          Dashboard
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleNewItinerary}
        >
          <RefreshCw className="w-4 h-4" />
          Nuevo Itinerario
        </Button>
      </div>

      {/* Itinerary View */}
      <ItineraryView
        itinerary={itinerary}
        destination={request.destination}
        startDate={request.startDate}
        endDate={request.endDate}
        budget={request.budget}
      />

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <Button
          variant="outline"
          onClick={handleNewItinerary}
        >
          <RefreshCw className="w-5 h-5" />
          Generar Nuevo Itinerario
        </Button>
        
        <Button onClick={() => navigate('/dashboard')}>
          <Home className="w-5 h-5" />
          Volver al Dashboard
        </Button>
      </div>
    </div>
  );
}
