import { Plane, SearchX } from 'lucide-react';
import type { FlightOffer } from '../../types';
import { FlightCard } from './FlightCard';

interface FlightListProps {
  offers: FlightOffer[];
  selectedOffer: FlightOffer | null;
  onSelect: (offer: FlightOffer) => void;
}

export function FlightList({ offers, selectedOffer, onSelect }: FlightListProps) {
  if (offers.length === 0) {
    return (
      <div className="text-center py-12">
        <SearchX className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No se encontraron vuelos
        </h3>
        <p className="text-gray-500">
          Intenta con otras fechas o destinos
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Plane className="w-5 h-5 text-primary-600" />
          {offers.length} vuelo{offers.length !== 1 ? 's' : ''} encontrado{offers.length !== 1 ? 's' : ''}
        </h3>
      </div>

      <div className="space-y-4">
        {offers.map((offer) => (
          <FlightCard
            key={offer.id}
            offer={offer}
            onSelect={onSelect}
            isSelected={selectedOffer?.id === offer.id}
          />
        ))}
      </div>
    </div>
  );
}
