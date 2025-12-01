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
      case 409:
        return apiError?.message || 'El recurso ya existe.';
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

export function isValidationError(error: unknown): boolean {
  return error instanceof AxiosError && error.response?.status === 400;
}

export function isNotFoundError(error: unknown): boolean {
  return error instanceof AxiosError && error.response?.status === 404;
}
