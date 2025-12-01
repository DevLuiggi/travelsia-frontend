import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plane, Calendar, Users } from 'lucide-react';
import { useFlights } from '../hooks/useFlights';
import { FlightList } from '../components/flights';
import { ItineraryGenerator } from '../components/itinerary';
import { Button, Alert, Spinner } from '../components/ui';
import { formatDateShort } from '../utils/formatters';

export function FlightResults() {
  const navigate = useNavigate();
  const { 
    searchParams, 
    searchResult, 
    selectedOffer, 
    selectOffer,
    isSearching,
    error 
  } = useFlights();

  // If no search has been performed, redirect to search
  if (!searchParams && !isSearching) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <Plane className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No hay resultados de búsqueda
          </h2>
          <p className="text-gray-500 mb-4">
            Realiza una búsqueda de vuelos primero
          </p>
          <Button onClick={() => navigate('/flights/search')}>
            Buscar Vuelos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Button
        variant="secondary"
        size="sm"
        onClick={() => navigate('/flights/search')}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Nueva Búsqueda
      </Button>

      {/* Search Summary */}
      {searchParams && (
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <Plane className="w-5 h-5 text-primary-600" />
              <span className="font-semibold">
                {searchParams.origin} → {searchParams.destination}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {formatDateShort(searchParams.departureDate)}
                {searchParams.returnDate && ` - ${formatDateShort(searchParams.returnDate)}`}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{searchParams.adults} adulto{searchParams.adults !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isSearching && (
        <div className="text-center py-12">
          <Spinner size="lg" className="mx-auto mb-4 text-primary-600" />
          <p className="text-gray-600">Buscando vuelos...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <Alert type="error" className="mb-6">
          {error}
        </Alert>
      )}

      {/* Results */}
      {!isSearching && searchResult && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Flight List */}
          <div className="lg:col-span-2">
            <FlightList
              offers={searchResult.offers}
              selectedOffer={selectedOffer}
              onSelect={selectOffer}
            />
          </div>

          {/* Itinerary Generator */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ItineraryGenerator
                defaultDestination={searchParams?.destination}
                defaultStartDate={searchParams?.departureDate}
                defaultEndDate={searchParams?.returnDate}
                searchId={searchResult.searchId}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
