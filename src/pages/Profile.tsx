import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, LogOut, Settings, Check, Phone, MapPin, Calendar, Edit2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Card, CardHeader, CardTitle, CardContent, Button, Alert, Input } from '../components/ui';
import type { TravelStyle, ActivityType } from '../types';

export function Profile() {
  const { user, preferences, updatePreferences, updateProfile, logout, isLoading, error, clearError, fetchPreferences, fetchProfile } = useAuth();
  const navigate = useNavigate();
  
  const [travelStyle, setTravelStyle] = useState<TravelStyle | undefined>(preferences?.travelStyle);
  const [favoriteActivities, setFavoriteActivities] = useState<ActivityType[]>(
    preferences?.favoriteActivities || []
  );
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  
  // Profile form state
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [country, setCountry] = useState(user?.country || '');
  const [city, setCity] = useState(user?.city || '');

  // Load preferences and profile on mount
  useEffect(() => {
    fetchPreferences();
    fetchProfile();
  }, [fetchPreferences, fetchProfile]);

  // Update local state when preferences change
  useEffect(() => {
    if (preferences) {
      setTravelStyle(preferences.travelStyle);
      setFavoriteActivities(preferences.favoriteActivities || []);
    }
  }, [preferences]);

  // Update local state when user changes
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setPhone(user.phone || '');
      setCountry(user.country || '');
      setCity(user.city || '');
    }
  }, [user]);

  const travelStyles: { value: TravelStyle; label: string; emoji: string; description: string }[] = [
    { value: 'economic', label: 'Económico', emoji: '💰', description: 'Optimizar costos sin sacrificar experiencias' },
    { value: 'moderate', label: 'Moderado', emoji: '⚖️', description: 'Balance entre comodidad y presupuesto' },
    { value: 'luxury', label: 'Lujo', emoji: '✨', description: 'Experiencias premium y comodidad total' },
  ];

  const activityTypes: { value: ActivityType; label: string; emoji: string }[] = [
    { value: 'culture', label: 'Cultura', emoji: '🏛️' },
    { value: 'nature', label: 'Naturaleza', emoji: '🌿' },
    { value: 'gastronomy', label: 'Gastronomía', emoji: '🍽️' },
    { value: 'nightlife', label: 'Vida Nocturna', emoji: '🌙' },
    { value: 'adventure', label: 'Aventura', emoji: '🎯' },
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

  const handleSaveProfile = async () => {
    try {
      clearError();
      await updateProfile({
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        phone: phone || undefined,
        country: country || undefined,
        city: city || undefined,
      });
      setProfileSaveSuccess(true);
      setEditingProfile(false);
      setTimeout(() => setProfileSaveSuccess(false), 3000);
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
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-600" />
              Información de Usuario
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditingProfile(!editingProfile)}
            >
              <Edit2 className="w-4 h-4" />
              {editingProfile ? 'Cancelar' : 'Editar'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {profileSaveSuccess && (
            <Alert type="success" className="mb-4">
              <Check className="w-4 h-4 inline mr-1" />
              Perfil actualizado correctamente
            </Alert>
          )}

          {!editingProfile ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {user?.firstName && user?.lastName 
                      ? `${user.firstName} ${user.lastName}` 
                      : 'Sin nombre'}
                  </p>
                  <p className="flex items-center gap-2 text-gray-600 text-sm">
                    <Mail className="w-4 h-4" />
                    {user?.email}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                {user?.phone && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{user.phone}</span>
                  </div>
                )}
                {(user?.city || user?.country) && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{[user.city, user.country].filter(Boolean).join(', ')}</span>
                  </div>
                )}
                {user?.birthDate && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(user.birthDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              
              <p className="text-sm text-gray-500">
                Rol: {user?.role === 'ADMIN' ? 'Administrador' : 'Usuario'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Nombre"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Juan"
                />
                <Input
                  label="Apellido"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Pérez"
                />
              </div>
              <Input
                label="Teléfono"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+51 999 888 777"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="País"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Perú"
                />
                <Input
                  label="Ciudad"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Lima"
                />
              </div>
              <Button
                onClick={handleSaveProfile}
                isLoading={isLoading}
              >
                Guardar Cambios
              </Button>
            </div>
          )}
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
