import { FlightSearchForm } from '../components/flights';

export function FlightSearch() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Buscar Vuelos
        </h1>
        <p className="text-gray-600">
          Encuentra los mejores vuelos para tu próximo viaje
        </p>
      </div>

      <FlightSearchForm />
    </div>
  );
}
