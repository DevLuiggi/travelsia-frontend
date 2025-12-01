import { Plane, Sparkles, MapPin, Calendar, Info } from 'lucide-react';
import type { ItineraryResponse } from '../../types';
import { formatDateTime } from '../../utils/formatters';
import { DayCard } from './DayCard';
import { BudgetBreakdown } from './BudgetBreakdown';
import { Card, CardHeader, CardTitle, CardContent } from '../ui';

interface ItineraryViewProps {
  itinerary: ItineraryResponse;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
}

export function ItineraryView({
  itinerary,
  destination,
  startDate,
  endDate,
  budget,
}: ItineraryViewProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-500 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Tu Itinerario Personalizado</h2>
        </div>
        
        <div className="flex flex-wrap gap-4 mt-4 text-white/90">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>Destino: {destination}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{startDate} - {endDate}</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5 text-primary-600" />
            Resumen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">{itinerary.summary}</p>
        </CardContent>
      </Card>

      {/* Recommended Flight */}
      {itinerary.recommended_flight && (
        <Card className="border-2 border-primary-200 bg-primary-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary-700">
              <Plane className="w-5 h-5" />
              ✈️ Vuelo Recomendado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Aerolínea</p>
                <p className="font-semibold">{itinerary.recommended_flight.airline}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Precio</p>
                <p className="font-semibold text-green-600">{itinerary.recommended_flight.price}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Salida</p>
                <p className="font-semibold">{formatDateTime(itinerary.recommended_flight.departure)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Llegada</p>
                <p className="font-semibold">{formatDateTime(itinerary.recommended_flight.arrival)}</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-600">
                <span className="font-medium">¿Por qué este vuelo? </span>
                {itinerary.recommended_flight.reason}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Budget Breakdown */}
      <BudgetBreakdown breakdown={itinerary.budget_breakdown} totalBudget={budget} />

      {/* Day by Day Itinerary */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary-600" />
          Itinerario Día a Día
        </h3>
        <div className="space-y-4">
          {itinerary.itinerary.map((day) => (
            <DayCard key={day.day} day={day} />
          ))}
        </div>
      </div>

      {/* AI Explanation */}
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-secondary-500" />
            ¿Por qué este itinerario?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 italic">{itinerary.explanation}</p>
        </CardContent>
      </Card>
    </div>
  );
}
