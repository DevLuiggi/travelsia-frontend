import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Plane, Calendar, Users, ArrowRight } from 'lucide-react';
import { useFlights } from '../../hooks/useFlights';
import { Button, Input, Alert } from '../ui';
import { COMMON_AIRPORTS, IATA_AIRPORTS } from '../../types';
import { useMemo, useState } from 'react';

const flightSearchSchema = z.object({
  origin: z.string()
    .min(3, 'Ingresa código IATA de origen')
    .max(3, 'El código IATA debe tener 3 letras')
    .toUpperCase(),
  destination: z.string()
    .min(3, 'Ingresa código IATA de destino')
    .max(3, 'El código IATA debe tener 3 letras')
    .toUpperCase(),
  departureDate: z.string().min(1, 'Selecciona fecha de salida'),
  returnDate: z.string().optional(),
  adults: z.coerce.number().min(1, 'Mínimo 1 adulto').max(9, 'Máximo 9 adultos'),
});

type FlightSearchFormData = z.infer<typeof flightSearchSchema>;

export function FlightSearchForm() {
  const { searchFlights, isSearching, error, clearError } = useFlights();
  const navigate = useNavigate();

  // Get tomorrow's date as minimum
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FlightSearchFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(flightSearchSchema) as any,
    defaultValues: {
      adults: 1,
    },
  });

  const originValue = watch('origin') || '';
  const destinationValue = watch('destination') || '';
  const departureDate = watch('departureDate');

  const [originOpen, setOriginOpen] = useState(false);
  const [destinationOpen, setDestinationOpen] = useState(false);

  const filteredOriginOptions = useMemo(() => {
    const q = originValue.trim().toUpperCase();
    if (!q) return IATA_AIRPORTS.slice(0, 20);
    return IATA_AIRPORTS.filter(opt =>
      opt.value.includes(q) || opt.label.toUpperCase().includes(q)
    ).slice(0, 20);
  }, [originValue]);

  const filteredDestinationOptions = useMemo(() => {
    const q = destinationValue.trim().toUpperCase();
    if (!q) return IATA_AIRPORTS.slice(0, 20);
    return IATA_AIRPORTS.filter(opt =>
      opt.value.includes(q) || opt.label.toUpperCase().includes(q)
    ).slice(0, 20);
  }, [destinationValue]);

  const onSubmit = async (data: FlightSearchFormData) => {
    try {
      clearError();
      await searchFlights({
        origin: data.origin.toUpperCase(),
        destination: data.destination.toUpperCase(),
        departureDate: data.departureDate,
        returnDate: data.returnDate || undefined,
        adults: data.adults,
      });
      navigate('/flights/results');
    } catch {
      // Error is handled by the store
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Plane className="w-6 h-6 text-primary-600" />
        Buscar Vuelos
      </h2>

      {error && (
        <Alert type="error" className="mb-4">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Origin */}
          <div className="relative">
            {(() => {
              const originReg = register('origin');
              return (
                <Input
                  label="Origen (Código IATA)"
                  placeholder="ej: MAD"
                  error={errors.origin?.message}
                  {...originReg}
                  onFocus={(e) => {
                    setOriginOpen(true);
                    // @ts-expect-error forward RHF event
                    originReg.onFocus?.(e);
                  }}
                  onChange={(e) => {
                    setOriginOpen(true);
                    originReg.onChange(e);
                  }}
                  onBlur={(e) => {
                    // small delay to allow click on suggestion
                    setTimeout(() => setOriginOpen(false), 120);
                    originReg.onBlur(e);
                  }}
                />
              );
            })()}
            {originOpen && filteredOriginOptions.length > 0 && (
              <div className="absolute z-20 mt-1 w-full max-h-56 overflow-auto rounded-md border border-gray-200 bg-white shadow">
                {filteredOriginOptions.map((opt) => (
                  <button
                    type="button"
                    key={`origin-${opt.value}`}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setValue('origin', opt.value, { shouldValidate: true, shouldDirty: true });
                      setOriginOpen(false);
                    }}
                  >
                    <span className="font-medium">{opt.value}</span>
                    <span className="text-gray-600 ml-2">{opt.label}</span>
                  </button>
                ))}
              </div>
            )}
            <p className="text-xs text-gray-500 mt-1">Código de 3 letras del aeropuerto</p>
          </div>

          {/* Destination */}
          <div className="relative">
            {(() => {
              const destReg = register('destination');
              return (
                <Input
                  label="Destino (Código IATA)"
                  placeholder="ej: PAR"
                  error={errors.destination?.message}
                  {...destReg}
                  onFocus={(e) => {
                    setDestinationOpen(true);
                    // @ts-expect-error forward RHF event
                    destReg.onFocus?.(e);
                  }}
                  onChange={(e) => {
                    setDestinationOpen(true);
                    destReg.onChange(e);
                  }}
                  onBlur={(e) => {
                    setTimeout(() => setDestinationOpen(false), 120);
                    destReg.onBlur(e);
                  }}
                />
              );
            })()}
            {destinationOpen && filteredDestinationOptions.length > 0 && (
              <div className="absolute z-20 mt-1 w-full max-h-56 overflow-auto rounded-md border border-gray-200 bg-white shadow">
                {filteredDestinationOptions.map((opt) => (
                  <button
                    type="button"
                    key={`destination-${opt.value}`}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setValue('destination', opt.value, { shouldValidate: true, shouldDirty: true });
                      setDestinationOpen(false);
                    }}
                  >
                    <span className="font-medium">{opt.value}</span>
                    <span className="text-gray-600 ml-2">{opt.label}</span>
                  </button>
                ))}
              </div>
            )}
            <p className="text-xs text-gray-500 mt-1">Código de 3 letras del aeropuerto</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Departure Date */}
          <div className="relative">
            <Calendar className="absolute left-3 top-9 w-5 h-5 text-gray-400" />
            <Input
              label="Fecha de Salida"
              type="date"
              min={minDate}
              className="pl-10"
              error={errors.departureDate?.message}
              {...register('departureDate')}
            />
          </div>

          {/* Return Date */}
          <div className="relative">
            <Calendar className="absolute left-3 top-9 w-5 h-5 text-gray-400" />
            <Input
              label="Fecha de Regreso (Opcional)"
              type="date"
              min={departureDate || minDate}
              className="pl-10"
              error={errors.returnDate?.message}
              {...register('returnDate')}
            />
          </div>

          {/* Adults */}
          <div className="relative">
            <Users className="absolute left-3 top-9 w-5 h-5 text-gray-400" />
            <Input
              label="Adultos"
              type="number"
              min={1}
              max={9}
              className="pl-10"
              error={errors.adults?.message}
              {...register('adults')}
            />
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full"
          isLoading={isSearching}
        >
          Buscar Vuelos
          <ArrowRight className="w-5 h-5" />
        </Button>
      </form>

      {/* Common airports reference */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm font-medium text-gray-700 mb-2">
          Aeropuertos comunes:
        </p>
        <div className="flex flex-wrap gap-2">
          {COMMON_AIRPORTS.slice(0, 8).map((airport) => (
            <span
              key={airport.code}
              className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600"
            >
              {airport.code} - {airport.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
