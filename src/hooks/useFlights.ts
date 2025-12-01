import { useFlightStore } from '../stores/flightStore';

export function useFlights() {
  const {
    searchParams,
    searchResult,
    searchHistory,
    selectedOffer,
    isSearching,
    isLoadingHistory,
    error,
    searchFlights,
    fetchSearchHistory,
    selectOffer,
    clearSearch,
    clearError,
  } = useFlightStore();

  return {
    searchParams,
    searchResult,
    searchHistory,
    selectedOffer,
    isSearching,
    isLoadingHistory,
    error,
    searchFlights,
    fetchSearchHistory,
    selectOffer,
    clearSearch,
    clearError,
  };
}
