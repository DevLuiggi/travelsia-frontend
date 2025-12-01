import { create } from 'zustand';
import type {
  FlightSearchParams,
  FlightOffer,
  FlightSearchResponse,
  FlightSearchHistory,
} from '../types';
import { api } from '../services/api';
import { getErrorMessage } from '../utils/errorHandler';

interface FlightState {
  searchParams: FlightSearchParams | null;
  searchResult: FlightSearchResponse | null;
  searchHistory: FlightSearchHistory[];
  selectedOffer: FlightOffer | null;
  isSearching: boolean;
  isLoadingHistory: boolean;
  error: string | null;

  // Actions
  searchFlights: (params: FlightSearchParams) => Promise<FlightSearchResponse>;
  fetchSearchHistory: (limit?: number) => Promise<void>;
  selectOffer: (offer: FlightOffer | null) => void;
  clearSearch: () => void;
  clearError: () => void;
}

export const useFlightStore = create<FlightState>((set) => ({
  searchParams: null,
  searchResult: null,
  searchHistory: [],
  selectedOffer: null,
  isSearching: false,
  isLoadingHistory: false,
  error: null,

  searchFlights: async (params: FlightSearchParams) => {
    set({ isSearching: true, error: null, searchParams: params });
    try {
      const result = await api.searchFlights(params);
      set({ searchResult: result, isSearching: false });
      return result;
    } catch (error) {
      set({ error: getErrorMessage(error), isSearching: false });
      throw error;
    }
  },

  fetchSearchHistory: async (limit = 10) => {
    set({ isLoadingHistory: true });
    try {
      const history = await api.getFlightSearchHistory(limit);
      set({ searchHistory: history, isLoadingHistory: false });
    } catch (error) {
      set({ error: getErrorMessage(error), isLoadingHistory: false });
    }
  },

  selectOffer: (offer: FlightOffer | null) => {
    set({ selectedOffer: offer });
  },

  clearSearch: () => {
    set({
      searchParams: null,
      searchResult: null,
      selectedOffer: null,
      error: null,
    });
  },

  clearError: () => set({ error: null }),
}));
