import axios, { type AxiosInstance, type AxiosError } from 'axios';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
  AuthProfile,
  UpdateProfileRequest,
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
      timeout: 60000, // 60 seconds for AI calls
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
          // Don't redirect if already on auth pages
          if (!window.location.pathname.includes('/login') && 
              !window.location.pathname.includes('/register')) {
            window.location.href = '/login';
          }
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

  getToken(): string | null {
    return this.token;
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

  async updateProfile(data: UpdateProfileRequest): Promise<AuthProfile> {
    const response = await this.api.put<AuthProfile>('/auth/profile', data);
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

    if (params.travelPurpose) {
      queryParams.append('travelPurpose', params.travelPurpose);
    }

    if (params.estimatedBudget) {
      queryParams.append('estimatedBudget', params.estimatedBudget.toString());
    }

    const response = await this.api.get<FlightSearchResponse>(
      `/flights/search?${queryParams}`
    );
    return response.data;
  }

  async getFlightSearchHistory(limit = 10): Promise<FlightSearchHistory[]> {
    const response = await this.api.get<FlightSearchHistory[]>(
      `/flights/my-searches?limit=${limit}`
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
