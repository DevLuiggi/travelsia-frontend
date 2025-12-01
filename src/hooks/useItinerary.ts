import { useItineraryStore } from '../stores/itineraryStore';

export function useItinerary() {
  const {
    request,
    itinerary,
    isGenerating,
    error,
    generateItinerary,
    clearItinerary,
    clearError,
  } = useItineraryStore();

  return {
    request,
    itinerary,
    isGenerating,
    error,
    generateItinerary,
    clearItinerary,
    clearError,
  };
}
