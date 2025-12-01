// ============================================================
// AUTH
// ============================================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
}

export interface AuthProfile {
  userId: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

// ============================================================
// PREFERENCES
// ============================================================

export type TravelStyle = 'economic' | 'balanced' | 'premium';

export type ActivityType = 'culture' | 'nature' | 'gastronomy' | 'nightlife';

export interface UserPreferences {
  travelStyle?: TravelStyle;
  favoriteActivities?: ActivityType[];
}

// ============================================================
// FLIGHTS
// ============================================================

export interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
}

export interface FlightLocation {
  iataCode: string;
  terminal?: string;
  at: string;
}

export interface FlightSegment {
  departure: FlightLocation;
  arrival: FlightLocation;
  carrierCode: string;
  number: string;
  duration: string;
  numberOfStops: number;
}

export interface FlightItinerary {
  duration: string;
  segments: FlightSegment[];
}

export interface FlightPrice {
  currency: string;
  total: string;
  base: string;
  grandTotal: string;
}

export interface FlightOffer {
  id: string;
  itineraries: FlightItinerary[];
  price: FlightPrice;
  validatingAirlineCodes: string[];
  numberOfBookableSeats?: number;
  lastTicketingDate?: string;
}

export interface FlightSearchResponse {
  searchId: string;
  offers: FlightOffer[];
}

export interface FlightSearchHistory {
  id: string;
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  createdAt: string;
}

export interface FlightSearchDetail extends FlightSearchHistory {
  snapshots: {
    id: string;
    offerData: FlightOffer;
  }[];
}

// ============================================================
// AI ITINERARY
// ============================================================

export interface ItineraryFlightInfo {
  price: string;
  currency: string;
  airline: string;
  departure: string;
  arrival: string;
}

export interface ItineraryRequest {
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  searchId?: string;
  flightOffer?: ItineraryFlightInfo;
}

export type TimeOfDay = 'Morning' | 'Afternoon' | 'Evening';

export interface Activity {
  time: TimeOfDay;
  activity: string;
  cost: string;
  description: string;
}

export interface DayItinerary {
  day: number;
  date: string;
  activities: Activity[];
}

export interface BudgetBreakdown {
  flight: string;
  accommodation: string;
  activities: string;
  food_transport: string;
  total: string;
}

export interface RecommendedFlight {
  airline: string;
  price: string;
  departure: string;
  arrival: string;
  reason: string;
}

export interface ItineraryResponse {
  summary: string;
  recommended_flight?: RecommendedFlight;
  budget_breakdown: BudgetBreakdown;
  itinerary: DayItinerary[];
  explanation: string;
}

// ============================================================
// API ERROR
// ============================================================

export interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
}

// ============================================================
// COMMON
// ============================================================

export const SUPPORTED_DESTINATIONS = {
  MAD: { name: 'Madrid', country: 'España' },
  PAR: { name: 'París', country: 'Francia' },
  NYC: { name: 'New York', country: 'Estados Unidos' },
} as const;

export type SupportedDestination = keyof typeof SUPPORTED_DESTINATIONS;

// Common airports for quick selection
export const COMMON_AIRPORTS = [
  { code: 'MAD', name: 'Madrid', country: 'España' },
  { code: 'BCN', name: 'Barcelona', country: 'España' },
  { code: 'PAR', name: 'París', country: 'Francia' },
  { code: 'CDG', name: 'París Charles de Gaulle', country: 'Francia' },
  { code: 'NYC', name: 'New York', country: 'Estados Unidos' },
  { code: 'JFK', name: 'New York JFK', country: 'Estados Unidos' },
  { code: 'LHR', name: 'Londres Heathrow', country: 'Reino Unido' },
  { code: 'FCO', name: 'Roma Fiumicino', country: 'Italia' },
  { code: 'AMS', name: 'Amsterdam', country: 'Países Bajos' },
  { code: 'FRA', name: 'Frankfurt', country: 'Alemania' },
  { code: 'LIM', name: 'Lima', country: 'Perú' },
  { code: 'BOG', name: 'Bogotá', country: 'Colombia' },
  { code: 'MEX', name: 'Ciudad de México', country: 'México' },
  { code: 'SCL', name: 'Santiago', country: 'Chile' },
  { code: 'EZE', name: 'Buenos Aires', country: 'Argentina' },
] as const;
