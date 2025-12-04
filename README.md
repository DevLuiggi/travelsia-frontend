# TravelSIA Backend

Backend API para la plataforma de viajes inteligentes **TravelSIA**. Desarrollado con NestJS, PostgreSQL, y APIs de terceros para búsqueda de vuelos y generación de itinerarios con IA.

## 🚀 Características

- **Autenticación JWT** - Registro y login seguro con tokens
- **Gestión de Usuarios** - Perfiles extendidos con preferencias de viaje
- **Búsqueda de Vuelos** - Integración con Amadeus API
- **Itinerarios con IA** - Generación personalizada con Perplexity AI
- **Google Sheets Integration** - Sincronización de intenciones de viaje para AppSheet
- **Documentación Swagger** - API completamente documentada

## 📋 Requisitos

- Node.js >= 18
- PostgreSQL (o cuenta en Neon)
- Claves API: Amadeus, Perplexity

## 🛠️ Instalación Local

```bash
# Clonar repositorio
git clone https://github.com/Travelsia/travelsia-backend.git
cd travelsia-backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Iniciar en desarrollo
npm run start:dev
```

## ⚙️ Variables de Entorno

```env
# Server
PORT=4000
NODE_ENV=development

# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# JWT
JWT_ACCESS_SECRET=your_secret_min_32_chars
JWT_REFRESH_SECRET=your_refresh_secret_min_32_chars
ACCESS_TOKEN_TTL=15m
REFRESH_TOKEN_TTL=30d

# CORS
CORS_ORIGIN=http://localhost:5173,https://your-frontend.netlify.app

# Amadeus API
AMADEUS_CLIENT_ID=your_client_id
AMADEUS_CLIENT_SECRET=your_client_secret
AMADEUS_BASE_URL=https://test.api.amadeus.com
AMADEUS_TEST_MODE=true

# Perplexity API
PERPLEXITY_API_KEY=your_perplexity_key

# Google Sheets (opcional, para AppSheet)
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/your_script_id/exec
```

## 📚 Documentación API

### Swagger UI
Disponible en: `http://localhost:4000/api/docs`

**Producción:** https://travelsia-backend.onrender.com/api/docs

---

## 🔐 Auth Endpoints

### POST /auth/register
Registra un nuevo usuario con datos extendidos.

**Request Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "MiPassword123",
  "firstName": "Juan",
  "lastName": "Pérez",
  "phone": "+51999888777",
  "country": "Perú",
  "city": "Lima",
  "birthDate": "1990-05-15"
}
```

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "email": "usuario@ejemplo.com",
  "firstName": "Juan",
  "lastName": "Pérez",
  "phone": "+51999888777",
  "country": "Perú",
  "city": "Lima",
  "role": "USER",
  "createdAt": "2025-12-03T00:00:00.000Z"
}
```

### POST /auth/login
Autentica un usuario y devuelve token JWT.

**Request Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "MiPassword123"
}
```

**Response:** `200 OK`
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### GET /auth/profile
Obtiene el perfil del usuario autenticado.

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "email": "usuario@ejemplo.com",
  "firstName": "Juan",
  "lastName": "Pérez",
  "phone": "+51999888777",
  "country": "Perú",
  "city": "Lima",
  "role": "USER",
  "preferences": {
    "travelStyle": "economic",
    "favoriteActivities": ["culture", "gastronomy"]
  }
}
```

### PUT /auth/profile
Actualiza el perfil del usuario.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "firstName": "Juan Carlos",
  "phone": "+51999000111"
}
```

---

## 👤 Users Endpoints

### GET /users/preferences
Obtiene las preferencias de viaje del usuario.

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "travelStyle": "economic",
  "favoriteActivities": ["culture", "gastronomy"],
  "userId": "user-uuid"
}
```

### PUT /users/preferences
Actualiza las preferencias de viaje.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "travelStyle": "moderate",
  "favoriteActivities": ["adventure", "nature", "gastronomy"]
}
```

---

## ✈️ Flights Endpoints

### GET /flights/search
Busca vuelos usando Amadeus API. La búsqueda se guarda vinculada al usuario y se sincroniza con Google Sheets.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
| Param | Required | Example | Description |
|-------|----------|---------|-------------|
| origin | ✅ | MIA | Código IATA origen |
| destination | ✅ | LIM | Código IATA destino |
| departureDate | ✅ | 2025-12-20 | Fecha salida |
| returnDate | ❌ | 2025-12-27 | Fecha retorno |
| adults | ✅ | 1 | Número de adultos |
| travelPurpose | ❌ | leisure | Propósito del viaje |
| estimatedBudget | ❌ | 1500 | Presupuesto en USD |

**Example:**
```
GET /flights/search?origin=MIA&destination=LIM&departureDate=2025-12-20&adults=1&travelPurpose=leisure
```

**Response:** `200 OK`
```json
{
  "searchId": "uuid",
  "offers": [
    {
      "type": "flight-offer",
      "id": "1",
      "source": "GDS",
      "price": { "total": "450.00", "currency": "USD" },
      "itineraries": [...]
    }
  ]
}
```

### GET /flights/my-searches
Obtiene el historial de búsquedas del usuario.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
| Param | Required | Default | Description |
|-------|----------|---------|-------------|
| limit | ❌ | 20 | Máximo de resultados |

### GET /flights/searches/:id
Obtiene una búsqueda específica con sus ofertas.

### GET /flights/searches
Obtiene búsquedas recientes de todos los usuarios.

---

## 🤖 AI Endpoints

### POST /ai/full-itinerary
Genera un itinerario personalizado usando Perplexity AI.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "destination": "Lima",
  "startDate": "2025-12-20",
  "endDate": "2025-12-25",
  "budget": 1200,
  "searchId": "optional-flight-search-uuid"
}
```

**Response:** `201 Created`
```json
{
  "summary": "Un viaje cultural de 5 días explorando Lima",
  "recommended_flight": {
    "airline": "LATAM Airlines",
    "price": "350 USD",
    "departure": "2025-12-20T08:00:00",
    "arrival": "2025-12-20T14:30:00",
    "reason": "Mejor relación precio-duración"
  },
  "budget_breakdown": {
    "flight": "350 USD",
    "accommodation": "400 USD",
    "activities": "200 USD",
    "food_transport": "150 USD",
    "total": "1100 USD"
  },
  "itinerary": [
    {
      "day": 1,
      "date": "2025-12-20",
      "activities": [
        {
          "time": "Morning",
          "activity": "Llegada y check-in",
          "cost": "0 USD",
          "description": "Instalación en el hotel"
        },
        {
          "time": "Afternoon",
          "activity": "Centro Histórico",
          "cost": "15 USD",
          "description": "Recorrido por la Plaza de Armas"
        }
      ]
    }
  ],
  "explanation": "Este itinerario se adapta a tu estilo económico..."
}
```

---

## 📊 Google Sheets Integration

Las búsquedas de vuelos se sincronizan automáticamente con Google Sheets para visualización en AppSheet.

### Configuración

1. **Crear Google Sheet** con columnas:
   ```
   SearchID | UserID | Email | Name | Phone | Country | City | Origin | Destination | DepartureDate | ReturnDate | Adults | TravelPurpose | Budget | TravelStyle | FavoriteActivities | CreatedAt
   ```

2. **Crear Google Apps Script:**
   ```javascript
   function doPost(e) {
     const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     const data = JSON.parse(e.postData.contents);
     
     if (data.action === 'appendRow') {
       sheet.appendRow(data.data);
     }
     
     return ContentService.createTextOutput(JSON.stringify({success: true}))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

3. **Deploy como Web App:**
   - Deploy → New deployment → Web App
   - Execute as: Me
   - Who has access: Anyone
   - Copiar URL

4. **Agregar variable de entorno:**
   ```
   GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```

---

## 🗄️ Base de Datos

### Entidades

#### User
```typescript
{
  id: UUID,
  email: string (unique),
  passwordHash: string,
  firstName?: string,
  lastName?: string,
  phone?: string,
  country?: string,
  city?: string,
  birthDate?: Date,
  role: 'USER' | 'ADMIN',
  createdAt: Date,
  updatedAt: Date,
  preferences: UserPreferences,
  flightSearches: FlightSearch[]
}
```

#### UserPreferences
```typescript
{
  id: UUID,
  userId: UUID,
  travelStyle?: 'economic' | 'moderate' | 'luxury',
  favoriteActivities?: string[]
}
```

#### FlightSearch
```typescript
{
  id: UUID,
  userId?: UUID,
  origin: string,
  destination: string,
  departureDate: string,
  returnDate?: string,
  adults: number,
  travelPurpose?: string,
  estimatedBudget?: number,
  syncedToSheets: boolean,
  createdAt: Date,
  snapshots: FlightOfferSnapshot[]
}
```

#### FlightOfferSnapshot
```typescript
{
  id: UUID,
  searchId: UUID,
  offerData: JSON
}
```

---

## 🚀 Deploy

### Producción (Render + Neon)

1. **Base de Datos (Neon):**
   - Crear proyecto en https://neon.tech
   - Copiar connection string

2. **Backend (Render):**
   - Conectar repositorio de GitHub
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start:prod`
   - Agregar variables de entorno

3. **Variables en Render:**
   ```
   DATABASE_URL=postgresql://...
   JWT_ACCESS_SECRET=...
   JWT_REFRESH_SECRET=...
   AMADEUS_CLIENT_ID=...
   AMADEUS_CLIENT_SECRET=...
   AMADEUS_BASE_URL=https://test.api.amadeus.com
   PERPLEXITY_API_KEY=...
   CORS_ORIGIN=https://your-frontend.netlify.app
   NODE_ENV=production
   PORT=4000
   GOOGLE_SHEETS_WEBHOOK_URL=...
   ```

---

## 📁 Estructura del Proyecto

```
src/
├── main.ts                 # Bootstrap + Swagger config
├── app.module.ts           # Root module
├── app.controller.ts       # Health check
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts  # Login, Register, Profile
│   ├── auth.service.ts
│   ├── jwt.strategy.ts     # JWT validation
│   ├── roles.decorator.ts
│   ├── roles.guard.ts
│   └── dto/
│       └── auth.dto.ts     # DTOs con Swagger
├── users/
│   ├── users.module.ts
│   ├── users.controller.ts # Preferences endpoints
│   ├── users.service.ts
│   ├── user.entity.ts
│   ├── user-preferences.entity.ts
│   └── dto/
│       └── users.dto.ts
├── flights/
│   ├── flights.module.ts
│   ├── flights.controller.ts
│   ├── flights.service.ts  # Amadeus + Google Sheets
│   ├── flight-search.entity.ts
│   ├── flight-offer-snapshot.entity.ts
│   └── dto/
│       └── flights.dto.ts
├── ai/
│   ├── ai.module.ts
│   ├── ai.controller.ts
│   ├── ai.service.ts       # Perplexity integration
│   └── dto/
│       └── ai.dto.ts
├── common/
│   ├── data/
│   │   ├── data.module.ts
│   │   └── data.service.ts # JSON datasets
│   └── google-sheets/
│       ├── google-sheets.module.ts
│       └── google-sheets.service.ts
└── assets/
    └── data/
        ├── activities.json
        └── costs.json
```

---

## 🧪 Scripts

```bash
# Desarrollo
npm run start:dev

# Build
npm run build

# Producción
npm run start:prod

# Tests
npm run test
npm run test:e2e

# Linting
npm run lint
```

---

## 📄 Licencia

MIT

---

## 👥 Equipo

**Travelsia Team** - Tecnologías Emergentes 2025
