import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Plane, 
  Search, 
  History, 
  Settings, 
  Sparkles, 
  ArrowRight,
  MapPin,
  Calendar
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useFlights } from '../hooks/useFlights';
import { Card, CardHeader, CardTitle, CardContent, Button, Spinner } from '../components/ui';
import { formatDateShort } from '../utils/formatters';

export function Dashboard() {
  const { user, preferences } = useAuth();
  const { searchHistory, fetchSearchHistory, isLoadingHistory } = useFlights();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSearchHistory(5);
  }, [fetchSearchHistory]);

  const quickActions = [
    {
      icon: Search,
      title: 'Buscar Vuelos',
      description: 'Encuentra vuelos a tu destino',
      link: '/flights/search',
      color: 'bg-blue-500',
    },
    {
      icon: Sparkles,
      title: 'Generar Itinerario',
      description: 'Crea un plan de viaje con IA',
      link: '/flights/search',
      color: 'bg-purple-500',
    },
    {
      icon: Settings,
      title: 'Preferencias',
      description: 'Configura tu estilo de viaje',
      link: '/profile',
      color: 'bg-green-500',
    },
  ];

  const getTravelStyleLabel = (style?: string) => {
    switch (style) {
      case 'economic': return '💰 Económico';
      case 'balanced': return '⚖️ Equilibrado';
      case 'luxury': return '✨ Lujo';
      default: return 'No configurado';
    }
  };

  const getActivityLabel = (activity: string) => {
    switch (activity) {
      case 'culture': return '🏛️ Cultura';
      case 'nature': return '🌿 Naturaleza';
      case 'gastronomy': return '🍽️ Gastronomía';
      case 'nightlife': return '🌙 Vida Nocturna';
      case 'adventure': return '🎯 Aventura'
      default: return activity;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ¡Bienvenido, {user?.email?.split('@')[0]}! 👋
        </h1>
        <p className="text-gray-600">
          ¿Listo para planificar tu próximo viaje?
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {quickActions.map((action, index) => (
          <Card
            key={index}
            hover
            onClick={() => navigate(action.link)}
            className="cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className={`${action.color} p-3 rounded-lg`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{action.title}</h3>
                <p className="text-sm text-gray-500">{action.description}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preferences Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-gray-600" />
              Tus Preferencias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Estilo de Viaje</p>
                <p className="font-medium">
                  {getTravelStyleLabel(preferences?.travelStyle)}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Actividades Favoritas</p>
                {preferences?.favoriteActivities && preferences.favoriteActivities.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {preferences.favoriteActivities.map((activity) => (
                      <span
                        key={activity}
                        className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                      >
                        {getActivityLabel(activity)}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="font-medium">No configuradas</p>
                )}
              </div>

              <Link
                to="/profile"
                className="text-primary-600 hover:underline text-sm font-medium inline-flex items-center gap-1"
              >
                Editar preferencias
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Searches */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="w-5 h-5 text-gray-600" />
              Búsquedas Recientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingHistory ? (
              <div className="flex justify-center py-8">
                <Spinner />
              </div>
            ) : searchHistory.length > 0 ? (
              <div className="space-y-3">
                {searchHistory.map((search) => (
                  <div
                    key={search.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <Plane className="w-5 h-5 text-primary-600" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 flex items-center gap-2">
                        <span>{search.origin}</span>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <span>{search.destination}</span>
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        {formatDateShort(search.departureDate)}
                        {search.returnDate && ` - ${formatDateShort(search.returnDate)}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">No hay búsquedas recientes</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => navigate('/flights/search')}
                >
                  Buscar Vuelos
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* CTA Banner */}
      <Card className="mt-8 bg-gradient-to-r from-primary-600 to-secondary-500 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Sparkles className="w-10 h-10" />
            <div>
              <h3 className="text-xl font-bold">¿Listo para tu próxima aventura?</h3>
              <p className="text-white/80">
                Deja que la IA planifique el viaje perfecto para ti
              </p>
            </div>
          </div>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate('/flights/search')}
          >
            Comenzar
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
