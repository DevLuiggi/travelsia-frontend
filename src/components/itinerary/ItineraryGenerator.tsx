import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Sparkles, MapPin, Calendar, DollarSign } from 'lucide-react';
import { useItinerary } from '../../hooks/useItinerary';
import { useFlights } from '../../hooks/useFlights';
import { Button, Input, Alert, Card, CardHeader, CardTitle, CardContent } from '../ui';
import type { ItineraryFlightInfo } from '../../types';

const itinerarySchema = z.object({
  destination: z.string()
    .min(3, 'Ingresa código IATA del destino')
    .max(3, 'El código IATA debe tener 3 letras'),
  startDate: z.string().min(1, 'Selecciona fecha de inicio'),
  endDate: z.string().min(1, 'Selecciona fecha de fin'),
  budget: z.coerce.number().min(100, 'El presupuesto mínimo es $100 USD'),
});

type ItineraryFormData = z.infer<typeof itinerarySchema>;

interface ItineraryGeneratorProps {
  defaultDestination?: string;
  defaultStartDate?: string;
  defaultEndDate?: string;
  searchId?: string;
  selectedFlightInfo?: ItineraryFlightInfo;
}

export function ItineraryGenerator({
  defaultDestination,
  defaultStartDate,
  defaultEndDate,
  searchId,
  selectedFlightInfo,
}: ItineraryGeneratorProps) {
  const { generateItinerary, isGenerating, error, clearError } = useItinerary();
  const { selectedOffer } = useFlights();
  const navigate = useNavigate();

  // Get tomorrow's date as minimum
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ItineraryFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(itinerarySchema) as any,
    defaultValues: {
      destination: defaultDestination || '',
      startDate: defaultStartDate || '',
      endDate: defaultEndDate || '',
      budget: 800,
    },
  });

  const startDate = watch('startDate');

  const onSubmit = async (data: ItineraryFormData) => {
    try {
      clearError();

      // Build flight offer info from selected offer or passed prop
      let flightOffer: ItineraryFlightInfo | undefined = selectedFlightInfo;
      
      if (!flightOffer && selectedOffer) {
        const firstSegment = selectedOffer.itineraries[0].segments[0];
        const lastSegment = selectedOffer.itineraries[0].segments[
          selectedOffer.itineraries[0].segments.length - 1
        ];
        
        flightOffer = {
          price: selectedOffer.price.total,
          currency: selectedOffer.price.currency,
          airline: selectedOffer.validatingAirlineCodes[0],
          departure: firstSegment.departure.at,
          arrival: lastSegment.arrival.at,
        };
      }

      await generateItinerary({
        destination: data.destination.toUpperCase(),
        startDate: data.startDate,
        endDate: data.endDate,
        budget: data.budget,
        searchId,
        flightOffer,
      });

      navigate('/itinerary');
    } catch {
      // Error is handled by the store
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-secondary-500" />
          Generar Itinerario con IA
        </CardTitle>
      </CardHeader>

      <CardContent>
        {error && (
          <Alert type="error" className="mb-4">
            {error}
          </Alert>
        )}

        {selectedOffer && (
          <Alert type="info" className="mb-4">
            Se usará el vuelo seleccionado para el itinerario
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-9 w-5 h-5 text-gray-400" />
            <Input
              label="Destino (Código IATA)"
              placeholder="ej: MAD"
              className="pl-10"
              error={errors.destination?.message}
              {...register('destination')}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Calendar className="absolute left-3 top-9 w-5 h-5 text-gray-400" />
              <Input
                label="Fecha de Inicio"
                type="date"
                min={minDate}
                className="pl-10"
                error={errors.startDate?.message}
                {...register('startDate')}
              />
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-9 w-5 h-5 text-gray-400" />
              <Input
                label="Fecha de Fin"
                type="date"
                min={startDate || minDate}
                className="pl-10"
                error={errors.endDate?.message}
                {...register('endDate')}
              />
            </div>
          </div>

          <div className="relative">
            <DollarSign className="absolute left-3 top-9 w-5 h-5 text-gray-400" />
            <Input
              label="Presupuesto Total (USD)"
              type="number"
              min={100}
              step={50}
              className="pl-10"
              error={errors.budget?.message}
              helperText="Incluye vuelo, alojamiento, actividades y comidas"
              {...register('budget')}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            isLoading={isGenerating}
          >
            {isGenerating ? (
              'Generando itinerario...'
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generar Itinerario con IA
              </>
            )}
          </Button>
        </form>

        {isGenerating && (
          <div className="mt-4 p-4 bg-primary-50 rounded-lg text-center">
            <p className="text-primary-700">
              🤖 La IA está creando tu itinerario personalizado...
            </p>
            <p className="text-sm text-primary-600 mt-1">
              Esto puede tomar unos segundos
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
