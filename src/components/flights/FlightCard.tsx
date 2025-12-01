import { Plane, Clock, ArrowRight, Check } from 'lucide-react';
import type { FlightOffer } from '../../types';
import { formatTime, formatDuration, formatPrice, formatStops } from '../../utils/formatters';
import { Button, Card } from '../ui';

interface FlightCardProps {
  offer: FlightOffer;
  onSelect: (offer: FlightOffer) => void;
  isSelected?: boolean;
}

export function FlightCard({ offer, onSelect, isSelected }: FlightCardProps) {
  const outbound = offer.itineraries[0];
  const returnFlight = offer.itineraries[1];
  const firstSegment = outbound.segments[0];
  const lastSegment = outbound.segments[outbound.segments.length - 1];

  const totalStops = outbound.segments.length - 1;

  return (
    <Card
      className={`
        transition-all duration-200
        ${isSelected ? 'ring-2 ring-primary-500 bg-primary-50' : 'hover:shadow-lg'}
      `}
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Airline */}
        <div className="flex items-center gap-3 lg:w-32">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <Plane className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">
              {offer.validatingAirlineCodes[0]}
            </p>
            <p className="text-xs text-gray-500">
              {firstSegment.carrierCode}{firstSegment.number}
            </p>
          </div>
        </div>

        {/* Route Info */}
        <div className="flex-1 space-y-4">
          {/* Outbound Flight */}
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">
                {formatTime(firstSegment.departure.at)}
              </p>
              <p className="text-sm text-gray-600">
                {firstSegment.departure.iataCode}
              </p>
            </div>

            <div className="flex-1 flex flex-col items-center">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                {formatDuration(outbound.duration)}
              </div>
              <div className="w-full flex items-center gap-1">
                <div className="flex-1 border-t-2 border-gray-300 border-dashed" />
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500">
                {formatStops(totalStops)}
              </p>
            </div>

            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">
                {formatTime(lastSegment.arrival.at)}
              </p>
              <p className="text-sm text-gray-600">
                {lastSegment.arrival.iataCode}
              </p>
            </div>
          </div>

          {/* Return Flight (if exists) */}
          {returnFlight && (
            <div className="flex items-center gap-4 pt-2 border-t border-gray-200">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">
                  {formatTime(returnFlight.segments[0].departure.at)}
                </p>
                <p className="text-sm text-gray-600">
                  {returnFlight.segments[0].departure.iataCode}
                </p>
              </div>

              <div className="flex-1 flex flex-col items-center">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  {formatDuration(returnFlight.duration)}
                </div>
                <div className="w-full flex items-center gap-1">
                  <div className="flex-1 border-t-2 border-gray-300 border-dashed" />
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500">
                  {formatStops(returnFlight.segments.length - 1)}
                </p>
              </div>

              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">
                  {formatTime(returnFlight.segments[returnFlight.segments.length - 1].arrival.at)}
                </p>
                <p className="text-sm text-gray-600">
                  {returnFlight.segments[returnFlight.segments.length - 1].arrival.iataCode}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Price & Select */}
        <div className="flex flex-col items-end gap-2 lg:w-40">
          <div className="text-right">
            <p className="text-2xl font-bold text-primary-600">
              {formatPrice(offer.price.total, offer.price.currency)}
            </p>
            <p className="text-xs text-gray-500">precio total</p>
          </div>

          <Button
            variant={isSelected ? 'primary' : 'outline'}
            size="sm"
            onClick={() => onSelect(offer)}
            className="w-full"
          >
            {isSelected ? (
              <>
                <Check className="w-4 h-4" />
                Seleccionado
              </>
            ) : (
              'Seleccionar'
            )}
          </Button>
        </div>
      </div>

      {/* Additional Info */}
      {offer.numberOfBookableSeats && offer.numberOfBookableSeats < 5 && (
        <p className="mt-3 text-xs text-orange-600 font-medium">
          ⚠️ Solo quedan {offer.numberOfBookableSeats} asientos disponibles
        </p>
      )}
    </Card>
  );
}
