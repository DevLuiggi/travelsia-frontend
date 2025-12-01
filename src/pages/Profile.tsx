import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, LogOut, Settings, Check } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Card, CardHeader, CardTitle, CardContent, Button, Alert } from '../components/ui';
import type { TravelStyle, ActivityType } from '../types';

export function Profile() {
  const { user, preferences, updatePreferences, logout, isLoading, error, clearError, fetchPreferences } = useAuth();
  const navigate = useNavigate();
  
  const [travelStyle, setTravelStyle] = useState<TravelStyle | undefined>(preferences?.travelStyle);
  const [favoriteActivities, setFavoriteActivities] = useState<ActivityType[]>(
    preferences?.favoriteActivities || []
  );
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load preferences on mount
  useEffect(() => {
    fetchPreferences();
  }, [fetchPreferences]);

  // Update local state when preferences change
  useEffect(() => {
    if (preferences) {
      setTravelStyle(preferences.travelStyle);
      setFavoriteActivities(preferences.favoriteActivities || []);
    }
  }, [preferences]);

  const travelStyles: { value: TravelStyle; label: string; emoji: string; description: string }[] = [
    { value: 'economic', label: 'Económico', emoji: '💰', description: 'Optimizar costos sin sacrificar experiencias' },
    { value: 'balanced', label: 'Equilibrado', emoji: '⚖️', description: 'Balance entre comodidad y presupuesto' },
    { value: 'premium', label: 'Premium', emoji: '✨', description: 'Experiencias de lujo y comodidad' },
  ];

  const activityTypes: { value: ActivityType; label: string; emoji: string }[] = [
    { value: 'culture', label: 'Cultura', emoji: '🏛️' },
    { value: 'nature', label: 'Naturaleza', emoji: '🌿' },
    { value: 'gastronomy', label: 'Gastronomía', emoji: '🍽️' },
    { value: 'nightlife', label: 'Vida Nocturna', emoji: '🌙' },
  ];

  const toggleActivity = (activity: ActivityType) => {
    setFavoriteActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((a) => a !== activity)
        : [...prev, activity]
    );
    setSaveSuccess(false);
  };

  const handleSavePreferences = async () => {
    try {
      clearError();
      await updatePreferences({
        travelStyle,
        favoriteActivities,
      });
      setSaveSuccess(true);
      // Redirect to dashboard after short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch {
      // Error handled by store
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Mi Perfil</h1>

      {/* User Info */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-gray-600" />
            Información de Usuario
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <p className="flex items-center gap-2 text-gray-900">
                <Mail className="w-4 h-4 text-gray-500" />
                {user?.email}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Rol: {user?.role === 'ADMIN' ? 'Administrador' : 'Usuario'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-600" />
            Preferencias de Viaje
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert type="error" className="mb-4">
              {error}
            </Alert>
          )}

          {saveSuccess && (
            <Alert type="success" className="mb-4">
              <Check className="w-4 h-4 inline mr-1" />
              Preferencias guardadas correctamente
            </Alert>
          )}

          {/* Travel Style */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Estilo de Viaje
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {travelStyles.map((style) => (
                <button
                  key={style.value}
                  type="button"
                  onClick={() => {
                    setTravelStyle(style.value);
                    setSaveSuccess(false);
                  }}
                  className={`
                    p-4 rounded-lg border-2 text-left transition-all
                    ${travelStyle === style.value
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <span className="text-2xl">{style.emoji}</span>
                  <p className="font-medium text-gray-900 mt-2">{style.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{style.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Favorite Activities */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Actividades Favoritas
            </label>
            <div className="flex flex-wrap gap-3">
              {activityTypes.map((activity) => (
                <button
                  key={activity.value}
                  type="button"
                  onClick={() => toggleActivity(activity.value)}
                  className={`
                    px-4 py-2 rounded-full border-2 transition-all flex items-center gap-2
                    ${favoriteActivities.includes(activity.value)
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }
                  `}
                >
                  <span>{activity.emoji}</span>
                  {activity.label}
                  {favoriteActivities.includes(activity.value) && (
                    <Check className="w-4 h-4" />
                  )}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Selecciona las actividades que más te interesan
            </p>
          </div>

          <Button
            onClick={handleSavePreferences}
            isLoading={isLoading}
            className="w-full sm:w-auto"
          >
            Guardar Preferencias
          </Button>
        </CardContent>
      </Card>

      {/* Logout */}
      <Card>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Cerrar Sesión</p>
              <p className="text-sm text-gray-500">
                Salir de tu cuenta de TravelSIA
              </p>
            </div>
            <Button
              variant="danger"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
