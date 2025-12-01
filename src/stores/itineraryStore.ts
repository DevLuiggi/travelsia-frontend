import { create } from 'zustand';
import type { ItineraryRequest, ItineraryResponse } from '../types';
import { api } from '../services/api';
import { getErrorMessage } from '../utils/errorHandler';

interface ItineraryState {
  request: ItineraryRequest | null;
  itinerary: ItineraryResponse | null;
  isGenerating: boolean;
  error: string | null;

  // Actions
  generateItinerary: (request: ItineraryRequest) => Promise<ItineraryResponse>;
  clearItinerary: () => void;
  clearError: () => void;
}

export const useItineraryStore = create<ItineraryState>((set) => ({
  request: null,
  itinerary: null,
  isGenerating: false,
  error: null,

  generateItinerary: async (request: ItineraryRequest) => {
    set({ isGenerating: true, error: null, request });
    try {
      const itinerary = await api.generateItinerary(request);
      set({ itinerary, isGenerating: false });
      return itinerary;
    } catch (error) {
      set({ error: getErrorMessage(error), isGenerating: false });
      throw error;
    }
  },

  clearItinerary: () => {
    set({
      request: null,
      itinerary: null,
      error: null,
    });
  },

  clearError: () => set({ error: null }),
}));
