# TravelSIA - Requerimientos para Frontend

## 📑 Índice

1. [Tecnologías Recomendadas](#-tecnologías-recomendadas)
2. [Configuración Inicial](#-configuración-inicial)
3. [Flujo de Usuario](#-flujo-de-usuario)
4. [Interfaces TypeScript](#-interfaces-typescript)
5. [Servicio API](#-servicio-api)
6. [Manejo de Errores](#-manejo-de-errores)
7. [Pantallas Requeridas](#-pantallas-requeridas)
8. [Componentes Sugeridos](#-componentes-sugeridos)

---

## 🛠️ Tecnologías Recomendadas

### Stack Principal
| Tecnología | Opción Recomendada | Alternativas |
|------------|-------------------|--------------|
| Framework | React 18+ | Vue 3, Angular 17+ |
| Lenguaje | TypeScript | - |
| HTTP Client | Axios | Fetch API, ky |
| State Management | Zustand / Context API | Redux Toolkit, Pinia (Vue) |
| Routing | React Router v6 | TanStack Router |
| UI Library | Tailwind CSS | Material UI, Chakra UI, shadcn/ui |
| Forms | React Hook Form | Formik |
| Validación | Zod | Yup |
| Date Picker | react-datepicker | date-fns |

### Dependencias Sugeridas

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.0",
    "zustand": "^4.4.0",
    "react-hook-form": "^7.48.0",
    "zod": "@hookform/resolvers": "^3.3.0",
    "date-fns": "^2.30.0",
    "react-datepicker": "^4.24.0",
    "lucide-react": "^0.294.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "@types/react": "^18.2.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

---

## ⚙️ Configuración Inicial

### Variables de Entorno (.env)

```env
VITE_API_URL=http://localhost:4000
VITE_APP_NAME=TravelSIA
```

### Estructura de Carpetas Sugerida

```
src/
├── assets/
│   └── images/
├── components/
│   ├── ui/                    # Componentes reutilizables
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── Spinner.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── flights/
│   │   ├── FlightSearchForm.tsx
│   │   ├── FlightCard.tsx
│   │   └── FlightList.tsx
│   └── itinerary/
│       ├── ItineraryView.tsx
│       ├── DayCard.tsx
│       ├── ActivityCard.tsx
│       └── BudgetBreakdown.tsx
├── pages/
│   ├── Landing.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Dashboard.tsx
│   ├── FlightSearch.tsx
│   ├── FlightResults.tsx
│   ├── Itinerary.tsx
│   └── Profile.tsx
├── services/
│   └── api.ts                 # Cliente API
├── stores/
│   ├── authStore.ts
│   ├── flightStore.ts
│   └── itineraryStore.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useFlights.ts
│   └── useItinerary.ts
├── types/
│   └── index.ts               # Interfaces TypeScript
├── utils/
│   ├── formatters.ts
│   └── validators.ts
├── App.tsx
├── main.tsx
└── index.css
```

---

## 🔄 Flujo de Usuario

### Diagrama de Navegación

```
                    ┌─────────────┐
                    │   Landing   │
                    │    Page     │
                    └──────┬──────┘
                           │
              ┌────────────┴────────────┐
              ▼                         ▼
        ┌───────────┐            ┌───────────┐
        │   Login   │◄──────────►│ Register  │
        └─────┬─────┘            └─────┬─────┘
              │                        │
              └──────────┬─────────────┘
                         ▼
                  ┌─────────────┐
                  │  Dashboard  │◄─────────────┐
                  └──────┬──────┘              │
                         │                     │
         ┌───────────────┼───────────────┐     │
         ▼               ▼               ▼     │
   ┌───────────┐  ┌─────────────┐  ┌─────────┐│
   │  Profile  │  │   Flight    │  │ Search  ││
   │ Settings  │  │   Search    │  │ History ││
   └───────────┘  └──────┬──────┘  └─────────┘│
                         │                     │
                         ▼                     │
                  ┌─────────────┐              │
                  │   Flight    │              │
                  │   Results   │              │
                  └──────┬──────┘              │
                         │                     │
                         ▼                     │
                  ┌─────────────┐              │
                  │  Itinerary  │──────────────┘
                  │  Generated  │
                  └─────────────┘
```

### Estados de la Aplicación

```typescript
// Estado de autenticación
type AuthState = 'loading' | 'authenticated' | 'unauthenticated';

// Estado de búsqueda de vuelos
type FlightSearchState = 'idle' | 'searching' | 'success' | 'error';

// Estado de generación de itinerario
type ItineraryState = 'idle' | 'generating' | 'success' | 'error';
```

---

## 📝 Interfaces TypeScript

### Archivo: `src/types/index.ts`

```typescript
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
  origin: string;        // IATA code (3 letters)
  destination: string;   // IATA code (3 letters)
  departureDate: string; // YYYY-MM-DD
  returnDate?: string;   // YYYY-MM-DD (optional)
  adults: number;        // 1-9
}

export interface FlightLocation {
  iataCode: string;
  terminal?: string;
  at: string;  // ISO datetime
}

export interface FlightSegment {
  departure: FlightLocation;
  arrival: FlightLocation;
  carrierCode: string;
  number: string;
  duration: string;  // ISO 8601 duration (e.g., "PT2H30M")
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
  destination: string;      // IATA code
  startDate: string;        // YYYY-MM-DD
  endDate: string;          // YYYY-MM-DD
  budget: number;           // USD
  searchId?: string;        // Use flights from previous search
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

// Códigos IATA con datos de actividades en el backend
export const SUPPORTED_DESTINATIONS = {
  MAD: { name: 'Madrid', country: 'España' },
  PAR: { name: 'París', country: 'Francia' },
  NYC: { name: 'New York', country: 'Estados Unidos' },
} as const;

export type SupportedDestination = keyof typeof SUPPORTED_DESTINATIONS;
```

---

## 🌐 Servicio API

### Archivo: `src/services/api.ts`

```typescript
import axios, { AxiosInstance, AxiosError } from 'axios';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
  AuthProfile,
  UserPreferences,
  FlightSearchParams,
  FlightSearchResponse,
  FlightSearchHistory,
  FlightSearchDetail,
  ItineraryRequest,
  ItineraryResponse,
  ApiError,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

class ApiService {
  private api: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000, // 30 seconds for AI calls
    });

    // Request interceptor - add token
    this.api.interceptors.request.use((config) => {
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }
      return config;
    });

    // Response interceptor - handle errors
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiError>) => {
        if (error.response?.status === 401) {
          this.clearToken();
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );

    // Load token from storage on init
    this.loadToken();
  }

  // ==================== TOKEN MANAGEMENT ====================

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('travelsia_token', token);
  }

  clearToken(): void {
    this.token = null;
    localStorage.removeItem('travelsia_token');
  }

  loadToken(): void {
    const token = localStorage.getItem('travelsia_token');
    if (token) {
      this.token = token;
    }
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  // ==================== AUTH ====================

  async register(data: RegisterRequest): Promise<User> {
    const response = await this.api.post<User>('/auth/register', data);
    return response.data;
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await this.api.post<LoginResponse>('/auth/login', data);
    if (response.data.access_token) {
      this.setToken(response.data.access_token);
    }
    return response.data;
  }

  async getProfile(): Promise<AuthProfile> {
    const response = await this.api.get<AuthProfile>('/auth/profile');
    return response.data;
  }

  logout(): void {
    this.clearToken();
  }

  // ==================== PREFERENCES ====================

  async getPreferences(): Promise<UserPreferences> {
    const response = await this.api.get<UserPreferences>('/users/preferences');
    return response.data;
  }

  async updatePreferences(preferences: UserPreferences): Promise<UserPreferences> {
    const response = await this.api.put<UserPreferences>('/users/preferences', preferences);
    return response.data;
  }

  // ==================== FLIGHTS ====================

  async searchFlights(params: FlightSearchParams): Promise<FlightSearchResponse> {
    const queryParams = new URLSearchParams({
      origin: params.origin.toUpperCase(),
      destination: params.destination.toUpperCase(),
      departureDate: params.departureDate,
      adults: params.adults.toString(),
    });

    if (params.returnDate) {
      queryParams.append('returnDate', params.returnDate);
    }

    const response = await this.api.get<FlightSearchResponse>(
      `/flights/search?${queryParams}`
    );
    return response.data;
  }

  async getFlightSearchHistory(limit = 10): Promise<FlightSearchHistory[]> {
    const response = await this.api.get<FlightSearchHistory[]>(
      `/flights/searches?limit=${limit}`
    );
    return response.data;
  }

  async getFlightSearchDetail(searchId: string): Promise<FlightSearchDetail> {
    const response = await this.api.get<FlightSearchDetail>(
      `/flights/searches/${searchId}`
    );
    return response.data;
  }

  // ==================== AI ITINERARY ====================

  async generateItinerary(request: ItineraryRequest): Promise<ItineraryResponse> {
    const response = await this.api.post<ItineraryResponse>(
      '/ai/full-itinerary',
      request
    );
    return response.data;
  }
}

// Export singleton instance
export const api = new ApiService();

// Export class for testing
export { ApiService };
```

---

## ⚠️ Manejo de Errores

### Archivo: `src/utils/errorHandler.ts`

```typescript
import { AxiosError } from 'axios';
import type { ApiError } from '../types';

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const apiError = error.response?.data as ApiError | undefined;
    
    // Handle specific status codes
    switch (error.response?.status) {
      case 400:
        return apiError?.message || 'Datos inválidos. Verifica los campos.';
      case 401:
        return 'Sesión expirada. Por favor, inicia sesión nuevamente.';
      case 403:
        return 'No tienes permisos para realizar esta acción.';
      case 404:
        return 'Recurso no encontrado.';
      case 429:
        return 'Demasiadas solicitudes. Intenta en unos minutos.';
      case 500:
        return 'Error del servidor. Intenta más tarde.';
      default:
        return apiError?.message || 'Ocurrió un error inesperado.';
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Ocurrió un error inesperado.';
}

export function isNetworkError(error: unknown): boolean {
  return error instanceof AxiosError && !error.response;
}

export function isAuthError(error: unknown): boolean {
  return error instanceof AxiosError && error.response?.status === 401;
}
```

### Uso en Componentes

```typescript
import { useState } from 'react';
import { api } from '../services/api';
import { getErrorMessage } from '../utils/errorHandler';

function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: LoginRequest) => {
    setLoading(true);
    setError(null);

    try {
      await api.login(data);
      // Navigate to dashboard
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}
      {/* ... form fields */}
    </form>
  );
}
```

---

## 📱 Pantallas Requeridas

### 1. Landing Page
- Hero section con descripción del servicio
- Botones de Login y Registro
- Features destacadas

### 2. Login / Register
- Formulario de email y password
- Validación en tiempo real
- Link para alternar entre login/registro
- Manejo de errores

### 3. Dashboard
| Sección | Descripción |
|---------|-------------|
| Preferencias | Configurar estilo de viaje y actividades favoritas |
| Nueva Búsqueda | Formulario para buscar vuelos |
| Historial | Lista de búsquedas recientes |

### 4. Resultados de Vuelos
- Lista de vuelos disponibles
- Información de precio, duración, escalas
- Selección de vuelo
- Botón "Generar Itinerario"

### 5. Itinerario Generado
| Componente | Contenido |
|------------|-----------|
| Header | Destino, fechas, presupuesto |
| Vuelo Recomendado | Detalles del vuelo seleccionado |
| Desglose de Presupuesto | Gráfico o cards con distribución |
| Timeline de Días | Actividades día por día |
| Explicación IA | Por qué se eligió este itinerario |

### 6. Perfil / Settings
- Información del usuario
- Preferencias de viaje
- Cerrar sesión

---

## 🧩 Componentes Sugeridos

### FlightCard

```tsx
interface FlightCardProps {
  offer: FlightOffer;
  onSelect: (offer: FlightOffer) => void;
  isSelected?: boolean;
}

function FlightCard({ offer, onSelect, isSelected }: FlightCardProps) {
  const outbound = offer.itineraries[0];
  const firstSegment = outbound.segments[0];
  const lastSegment = outbound.segments[outbound.segments.length - 1];

  return (
    <div className={`flight-card ${isSelected ? 'selected' : ''}`}>
      <div className="flight-airline">
        {offer.validatingAirlineCodes[0]}
      </div>
      
      <div className="flight-route">
        <span>{firstSegment.departure.iataCode}</span>
        <span>→</span>
        <span>{lastSegment.arrival.iataCode}</span>
      </div>
      
      <div className="flight-times">
        <span>{formatTime(firstSegment.departure.at)}</span>
        <span>{formatDuration(outbound.duration)}</span>
        <span>{formatTime(lastSegment.arrival.at)}</span>
      </div>
      
      <div className="flight-stops">
        {outbound.segments.length === 1 ? 'Directo' : `${outbound.segments.length - 1} escala(s)`}
      </div>
      
      <div className="flight-price">
        {offer.price.currency} {offer.price.total}
      </div>
      
      <button onClick={() => onSelect(offer)}>
        Seleccionar
      </button>
    </div>
  );
}
```

### DayCard

```tsx
interface DayCardProps {
  day: DayItinerary;
}

function DayCard({ day }: DayCardProps) {
  return (
    <div className="day-card">
      <h3>Día {day.day} - {formatDate(day.date)}</h3>
      
      <div className="activities">
        {day.activities.map((activity, index) => (
          <div key={index} className="activity">
            <span className="activity-time">
              {getTimeIcon(activity.time)} {activity.time}
            </span>
            <span className="activity-name">{activity.activity}</span>
            <span className="activity-cost">{activity.cost}</span>
            <p className="activity-description">{activity.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function getTimeIcon(time: TimeOfDay): string {
  switch (time) {
    case 'Morning': return '🌅';
    case 'Afternoon': return '🌞';
    case 'Evening': return '🌙';
  }
}
```

### BudgetBreakdown

```tsx
interface BudgetBreakdownProps {
  breakdown: BudgetBreakdown;
  totalBudget: number;
}

function BudgetBreakdown({ breakdown, totalBudget }: BudgetBreakdownProps) {
  const items = [
    { label: 'Vuelo', value: breakdown.flight, icon: '✈️' },
    { label: 'Alojamiento', value: breakdown.accommodation, icon: '🏨' },
    { label: 'Actividades', value: breakdown.activities, icon: '🎭' },
    { label: 'Comida/Transporte', value: breakdown.food_transport, icon: '🍽️' },
  ];

  return (
    <div className="budget-breakdown">
      <h3>💰 Desglose de Presupuesto</h3>
      <p>Presupuesto total: ${totalBudget} | Estimado: {breakdown.total}</p>
      
      <div className="budget-items">
        {items.map((item) => (
          <div key={item.label} className="budget-item">
            <span>{item.icon}</span>
            <span>{item.label}</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 🔧 Utilidades Recomendadas

### Archivo: `src/utils/formatters.ts`

```typescript
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Format ISO date string to readable format
 * @example formatDate('2025-12-15') => '15 de diciembre de 2025'
 */
export function formatDate(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, "d 'de' MMMM 'de' yyyy", { locale: es });
}

/**
 * Format ISO datetime to time only
 * @example formatTime('2025-12-15T10:30:00') => '10:30'
 */
export function formatTime(dateTimeString: string): string {
  const date = parseISO(dateTimeString);
  return format(date, 'HH:mm');
}

/**
 * Format ISO 8601 duration to readable format
 * @example formatDuration('PT2H30M') => '2h 30m'
 */
export function formatDuration(isoDuration: string): string {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return isoDuration;
  
  const hours = match[1] ? `${match[1]}h` : '';
  const minutes = match[2] ? `${match[2]}m` : '';
  
  return `${hours} ${minutes}`.trim();
}

/**
 * Format price with currency
 * @example formatPrice('185.00', 'EUR') => '€185.00'
 */
export function formatPrice(amount: string, currency: string): string {
  const symbols: Record<string, string> = {
    EUR: '€',
    USD: '$',
    GBP: '£',
  };
  return `${symbols[currency] || currency} ${amount}`;
}
```

---

## 📋 Checklist de Implementación

### Fase 1: Estructura Base
- [ ] Crear proyecto con Vite + React + TypeScript
- [ ] Configurar Tailwind CSS
- [ ] Configurar React Router
- [ ] Crear estructura de carpetas
- [ ] Implementar servicio API
- [ ] Configurar store de autenticación

### Fase 2: Autenticación
- [ ] Página de Login
- [ ] Página de Registro
- [ ] Protección de rutas
- [ ] Persistencia de sesión

### Fase 3: Funcionalidades Core
- [ ] Dashboard principal
- [ ] Formulario de preferencias
- [ ] Búsqueda de vuelos
- [ ] Lista de resultados de vuelos
- [ ] Selección de vuelo

### Fase 4: Itinerario IA
- [ ] Pantalla de carga durante generación
- [ ] Vista de itinerario generado
- [ ] Desglose de presupuesto
- [ ] Timeline de actividades

### Fase 5: Polish
- [ ] Responsive design
- [ ] Loading states
- [ ] Error handling UI
- [ ] Animaciones y transiciones
- [ ] Testing

---

## 🎨 Paleta de Colores Sugerida

```css
:root {
  /* Primary */
  --primary-50: #eff6ff;
  --primary-500: #3b82f6;
  --primary-600: #2563eb;
  --primary-700: #1d4ed8;
  
  /* Secondary */
  --secondary-500: #8b5cf6;
  
  /* Success */
  --success-500: #22c55e;
  
  /* Warning */
  --warning-500: #f59e0b;
  
  /* Error */
  --error-500: #ef4444;
  
  /* Neutral */
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-500: #6b7280;
  --gray-700: #374151;
  --gray-900: #111827;
}
```

---

*Documento de requerimientos para TravelSIA Frontend - Noviembre 2025*
