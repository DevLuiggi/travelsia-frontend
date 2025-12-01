# TravelSIA Backend - Documentación Completa

## 📑 Índice

1. [Revisión del MVP](#-revisión-del-mvp)
2. [Configuración del Entorno](#-configuración-del-entorno)
3. [Flujo de Pruebas](#-flujo-de-pruebas-con-ejemplos)
   - [Autenticación](#1️⃣-autenticación)
   - [Preferencias de Usuario](#2️⃣-preferencias-de-usuario)
   - [Búsqueda de Vuelos](#3️⃣-búsqueda-de-vuelos-amadeus)
   - [Generación de Itinerario IA](#4️⃣-generación-de-itinerario-con-ia)
4. [Diagrama de Arquitectura](#-diagrama-de-arquitectura)
5. [Estructura de Base de Datos](#️-estructura-de-base-de-datos)
6. [Resumen de Endpoints](#-resumen-de-endpoints)
7. [Pruebas Rápidas](#-prueba-rápida-con-curl)
8. [Checklist de Verificación](#-checklist-de-verificación)

> 📄 **Frontend**: Para los requerimientos del frontend, consulta el archivo [FRONTEND_REQUIREMENTS.md](./FRONTEND_REQUIREMENTS.md)

---

## 📋 Revisión del MVP

### ✅ Componentes Implementados

| Componente | Estado | Descripción |
|------------|--------|-------------|
| Autenticación JWT | ✅ Completo | Registro, login, tokens de acceso |
| Usuarios y Roles | ✅ Completo | USER/ADMIN roles, entidad User |
| Preferencias de Usuario | ✅ Completo | travelStyle, favoriteActivities |
| Búsqueda de Vuelos (Amadeus) | ✅ Completo | Flight Offers Search integrado |
| Persistencia de Búsquedas | ✅ Completo | FlightSearch + FlightOfferSnapshot |
| Dataset de Actividades | ✅ Completo | JSON por ciudad (MAD, PAR, NYC) |
| Dataset de Costos | ✅ Completo | Costos base por ciudad |
| Módulo IA (OpenAI) | ✅ Completo | Generación de itinerarios |
| PostgreSQL + TypeORM | ✅ Completo | Docker Compose configurado |

### ⚠️ Observaciones y Mejoras Pendientes

1. **Refresh Token**: El `.env` tiene `JWT_REFRESH_SECRET` pero no está implementado el flujo de refresh token.
2. **Validación de DTOs**: Se recomienda agregar validación con `class-validator` en los endpoints para mayor robustez.
3. **Error Handling**: Se puede mejorar el manejo de errores con mensajes más amigables y códigos HTTP específicos.

> ✅ **Mejoras ya aplicadas**: CORS habilitado, ValidationPipe global configurado, FlightsModule exporta el servicio para uso en AI.

---

## 🔧 Configuración del Entorno

### Requisitos Previos
- Node.js v18+
- Docker y Docker Compose
- Cuenta de Amadeus (test.api.amadeus.com)
- API Key de OpenAI

### Variables de Entorno (.env)
```env
PORT=4000
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=tu_password
PG_DATABASE=travelsia
JWT_ACCESS_SECRET=super_access_secret_32_chars_min
JWT_REFRESH_SECRET=super_refresh_secret_32_chars_min
ACCESS_TOKEN_TTL=15m
REFRESH_TOKEN_TTL=30d
CORS_ORIGIN=http://localhost:5173
AMADEUS_CLIENT_ID=tu_client_id
AMADEUS_CLIENT_SECRET=tu_client_secret
AMADEUS_BASE_URL=https://test.api.amadeus.com
AMADEUS_TEST_MODE=true
OPENAI_API_KEY=tu_openai_key
```

### Iniciar el Proyecto
```bash
# 1. Levantar PostgreSQL
docker-compose up -d

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor en desarrollo
npm run start:dev
```

---

## 🧪 Flujo de Pruebas con Ejemplos

### Base URL: `http://localhost:4000`

---

## 1️⃣ Autenticación

### 1.1 Registro de Usuario
```http
POST /auth/register
Content-Type: application/json

{
  "email": "usuario@test.com",
  "password": "password123"
}
```

**Respuesta Exitosa (201):**
```json
{
  "id": "uuid-del-usuario",
  "email": "usuario@test.com",
  "role": "USER",
  "createdAt": "2025-11-25T10:00:00.000Z",
  "updatedAt": "2025-11-25T10:00:00.000Z"
}
```

---

### 1.2 Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "usuario@test.com",
  "password": "password123"
}
```

**Respuesta Exitosa (201):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

> ⚠️ **IMPORTANTE**: Guarda el `access_token`. Lo necesitarás para todas las siguientes peticiones.

---

### 1.3 Ver Perfil (Verificar Token)
```http
GET /auth/profile
Authorization: Bearer {access_token}
```

**Respuesta:**
```json
{
  "userId": "uuid-del-usuario",
  "email": "usuario@test.com",
  "role": "USER"
}
```

---

## 2️⃣ Preferencias de Usuario

### 2.1 Obtener Preferencias
```http
GET /users/preferences
Authorization: Bearer {access_token}
```

**Respuesta (sin preferencias):**
```json
{}
```

---

### 2.2 Actualizar Preferencias
```http
PUT /users/preferences
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "travelStyle": "economic",
  "favoriteActivities": ["culture", "gastronomy"]
}
```

**Valores válidos para `travelStyle`:**
- `"economic"` - Viajes económicos
- `"balanced"` - Equilibrado
- `"premium"` - Viajes de lujo

**Valores válidos para `favoriteActivities`:**
- `"culture"` - Cultura y museos
- `"nature"` - Naturaleza y parques
- `"gastronomy"` - Gastronomía
- `"nightlife"` - Vida nocturna

---

## 3️⃣ Búsqueda de Vuelos (Amadeus)

### 3.1 Buscar Vuelos
```http
GET /flights/search?origin=MAD&destination=PAR&departureDate=2025-12-15&returnDate=2025-12-20&adults=1
Authorization: Bearer {access_token}
```

**Parámetros Query:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| origin | string | ✅ | Código IATA origen (ej: MAD, LIM, BOG) |
| destination | string | ✅ | Código IATA destino (ej: PAR, NYC) |
| departureDate | string | ✅ | Fecha salida (YYYY-MM-DD) |
| returnDate | string | ❌ | Fecha retorno (YYYY-MM-DD) |
| adults | number | ✅ | Número de adultos (1-9) |

**Respuesta (Array de ofertas de Amadeus):**
```json
{
  "searchId": "uuid-de-la-busqueda",
  "offers": [
    {
      "type": "flight-offer",
      "id": "1",
      "source": "GDS",
      "instantTicketingRequired": false,
      "nonHomogeneous": false,
      "oneWay": false,
      "lastTicketingDate": "2025-12-01",
      "numberOfBookableSeats": 5,
      "itineraries": [
        {
          "duration": "PT2H30M",
          "segments": [
            {
              "departure": {
                "iataCode": "MAD",
                "terminal": "4",
                "at": "2025-12-15T10:00:00"
              },
              "arrival": {
                "iataCode": "CDG",
                "terminal": "2E",
                "at": "2025-12-15T12:30:00"
              },
              "carrierCode": "IB",
              "number": "3456",
              "aircraft": { "code": "320" },
              "operating": { "carrierCode": "IB" },
              "duration": "PT2H30M",
              "id": "1",
              "numberOfStops": 0
            }
          ]
        }
      ],
      "price": {
        "currency": "EUR",
        "total": "185.00",
        "base": "150.00",
        "grandTotal": "185.00"
      },
      "pricingOptions": {
        "fareType": ["PUBLISHED"],
        "includedCheckedBagsOnly": true
      },
      "validatingAirlineCodes": ["IB"],
      "travelerPricings": []
    }
  ]
}
```

> 📝 **Nota**: El `searchId` se puede usar en `/ai/full-itinerary` para que la IA use los vuelos de esa búsqueda.

---

### 3.2 Obtener Historial de Búsquedas
```http
GET /flights/searches?limit=10
Authorization: Bearer {access_token}
```

**Respuesta:**
```json
[
  {
    "id": "uuid-busqueda",
    "origin": "MAD",
    "destination": "PAR",
    "departureDate": "2025-12-15",
    "returnDate": "2025-12-20",
    "adults": 1,
    "createdAt": "2025-11-25T10:00:00.000Z"
  }
]
```

---

### 3.3 Obtener Búsqueda con Ofertas
```http
GET /flights/searches/:searchId
Authorization: Bearer {access_token}
```

**Respuesta:**
```json
{
  "id": "uuid-busqueda",
  "origin": "MAD",
  "destination": "PAR",
  "departureDate": "2025-12-15",
  "returnDate": "2025-12-20",
  "adults": 1,
  "createdAt": "2025-11-25T10:00:00.000Z",
  "snapshots": [
    {
      "id": "uuid-snapshot",
      "offerData": { "...": "datos completos del vuelo" }
    }
  ]
}
```

---

## 4️⃣ Generación de Itinerario con IA

### 4.1 Generar Itinerario Completo
```http
POST /ai/full-itinerary
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "destination": "MAD",
  "startDate": "2025-12-15",
  "endDate": "2025-12-18",
  "budget": 800,
  "searchId": "uuid-de-busqueda-previa"
}
```

**O con vuelo específico:**
```http
POST /ai/full-itinerary
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "destination": "MAD",
  "startDate": "2025-12-15",
  "endDate": "2025-12-18",
  "budget": 800,
  "flightOffer": {
    "price": "185.00",
    "currency": "EUR",
    "airline": "Iberia",
    "departure": "2025-12-15T10:00:00",
    "arrival": "2025-12-15T12:30:00"
  }
}
```

**Parámetros Body:**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| destination | string | ✅ | Código IATA del destino |
| startDate | string | ✅ | Fecha inicio (YYYY-MM-DD) |
| endDate | string | ✅ | Fecha fin (YYYY-MM-DD) |
| budget | number | ✅ | Presupuesto total en USD |
| searchId | string | ❌ | ID de búsqueda previa (usa sus vuelos) |
| flightOffer | object | ❌ | Información del vuelo seleccionado |

**Respuesta:**
```json
{
  "summary": "Un viaje de 4 días a Madrid con enfoque en cultura y gastronomía, optimizado para un presupuesto económico.",
  "recommended_flight": {
    "airline": "Iberia",
    "price": "185 EUR",
    "departure": "2025-12-15T10:00:00",
    "arrival": "2025-12-15T12:30:00",
    "reason": "Mejor relación calidad-precio con horario conveniente"
  },
  "budget_breakdown": {
    "flight": "200 USD",
    "accommodation": "240 USD",
    "activities": "150 USD",
    "food_transport": "200 USD",
    "total": "790 USD"
  },
  "itinerary": [
    {
      "day": 1,
      "date": "2025-12-15",
      "activities": [
        {
          "time": "Morning",
          "activity": "Llegada y check-in en hotel",
          "cost": "0 USD",
          "description": "Tiempo para descansar y ubicarse en la ciudad"
        },
        {
          "time": "Afternoon",
          "activity": "Museo del Prado",
          "cost": "15 USD",
          "description": "Uno de los museos más importantes del mundo, ideal para amantes de la cultura"
        },
        {
          "time": "Evening",
          "activity": "Paseo por el Parque del Retiro",
          "cost": "0 USD",
          "description": "Relajarse en el pulmón verde de Madrid"
        }
      ]
    },
    {
      "day": 2,
      "date": "2025-12-16",
      "activities": [
        {
          "time": "Morning",
          "activity": "Palacio Real de Madrid",
          "cost": "12 USD",
          "description": "Visita a la residencia oficial de los Reyes de España"
        },
        {
          "time": "Afternoon",
          "activity": "Tour de Tapas por La Latina",
          "cost": "40 USD",
          "description": "Recorrido gastronómico por los mejores bares, perfecto para tu interés en gastronomía"
        },
        {
          "time": "Evening",
          "activity": "Cena en el centro",
          "cost": "25 USD",
          "description": "Disfrutar de la cocina madrileña"
        }
      ]
    }
  ],
  "explanation": "Este itinerario está diseñado para un viajero con estilo económico e intereses en cultura y gastronomía. Se priorizaron actividades culturales como el Museo del Prado y el Tour de Tapas que coinciden con tus preferencias. El presupuesto se distribuyó de manera que el alojamiento y comida no excedan los límites, dejando margen para actividades de calidad."
}
```

---

## 5️⃣ Códigos IATA Soportados (con datos de actividades)

| Ciudad | Código | Actividades | Costos Base |
|--------|--------|-------------|-------------|
| Madrid | MAD | ✅ 3 actividades | ✅ food: $40, transport: $10 |
| París | PAR | ✅ 3 actividades | ✅ food: $60, transport: $15 |
| New York | NYC | ✅ 3 actividades | ✅ food: $80, transport: $20 |

> 📝 Para otros destinos, la IA generará actividades basándose en su conocimiento general.

---

## 🖥️ Requerimientos para el Frontend

> 📄 **Documentación completa del frontend disponible en:** [FRONTEND_REQUIREMENTS.md](./FRONTEND_REQUIREMENTS.md)
> 
> Incluye: Tecnologías recomendadas, estructura de carpetas, interfaces TypeScript, servicio API, componentes, y más.

---

## 📊 Diagrama de Arquitectura

```text
┌─────────────────────────────────────────────────────────────────────┐
│                          FRONTEND                                    │
│                    (React/Vue/Angular)                              │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP REST (JSON)
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     NESTJS BACKEND (:4000)                          │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │                      Controllers                                │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │ │
│  │  │   Auth   │  │  Users   │  │ Flights  │  │    AI    │       │ │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │ │
│  └────────────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │                       Services                                  │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │ │
│  │  │AuthSvc   │  │UsersSvc  │  │FlightsSvc│  │  AiSvc   │       │ │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │ │
│  └────────────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │                    Data Service (JSON)                          │ │
│  │              activities.json  |  costs.json                     │ │
│  └────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
         │                    │                      │
         │                    │                      │
         ▼                    ▼                      ▼
┌──────────────┐    ┌──────────────┐    ┌────────────────────┐
│  PostgreSQL  │    │   Amadeus    │    │      OpenAI        │
│   (Docker)   │    │     API      │    │    GPT-3.5-turbo   │
│              │    │              │    │                    │
│ - users      │    │ Flight Offers│    │ Itinerary          │
│ - preferences│    │   Search     │    │ Generation         │
│ - searches   │    │              │    │                    │
│ - snapshots  │    │              │    │                    │
└──────────────┘    └──────────────┘    └────────────────────┘
```

---

## 🗃️ Estructura de Base de Datos

```sql
-- Tabla: users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  "passwordHash" VARCHAR(255) NOT NULL,
  role VARCHAR(10) DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN')),
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW(),
  "preferencesId" UUID REFERENCES user_preferences(id)
);

-- Tabla: user_preferences
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "travelStyle" VARCHAR(50),
  "favoriteActivities" TEXT, -- Stored as comma-separated
  "userId" UUID REFERENCES users(id)
);

-- Tabla: flight_searches
CREATE TABLE flight_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  origin VARCHAR(10) NOT NULL,
  destination VARCHAR(10) NOT NULL,
  "departureDate" VARCHAR(20) NOT NULL,
  "returnDate" VARCHAR(20),
  adults INTEGER NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

-- Tabla: flight_offer_snapshots
CREATE TABLE flight_offer_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "offerData" JSONB NOT NULL,
  "searchId" UUID REFERENCES flight_searches(id)
);
```

---

## 🔐 Seguridad Implementada

| Aspecto | Implementación |
|---------|----------------|
| Contraseñas | Hash con bcrypt (salt automático) |
| Autenticación | JWT con expiración configurable |
| Autorización | Guards por roles (USER/ADMIN) |
| Headers | Authorization: Bearer token |

---

## 📝 Resumen de Endpoints

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| POST | /auth/register | ❌ | Registrar usuario |
| POST | /auth/login | ❌ | Iniciar sesión |
| GET | /auth/profile | ✅ | Ver perfil actual |
| GET | /users/preferences | ✅ | Obtener preferencias |
| PUT | /users/preferences | ✅ | Actualizar preferencias |
| GET | /flights/search | ✅ | Buscar vuelos |
| GET | /flights/searches | ✅ | Historial de búsquedas |
| GET | /flights/searches/:id | ✅ | Detalle de búsqueda con ofertas |
| POST | /ai/full-itinerary | ✅ | Generar itinerario IA |

---

## ⚡ Prueba Rápida con cURL

```bash
# 1. Registrar usuario
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'

# 2. Login
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'

# 3. Guardar el token y usarlo (reemplaza TOKEN)
TOKEN="eyJ..."

# 4. Ver perfil
curl -X GET http://localhost:4000/auth/profile \
  -H "Authorization: Bearer $TOKEN"

# 5. Actualizar preferencias
curl -X PUT http://localhost:4000/users/preferences \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"travelStyle":"economic","favoriteActivities":["culture","gastronomy"]}'

# 6. Buscar vuelos (guarda el searchId de la respuesta)
curl -X GET "http://localhost:4000/flights/search?origin=MAD&destination=PAR&departureDate=2025-12-15&returnDate=2025-12-20&adults=1" \
  -H "Authorization: Bearer $TOKEN"

# 7. Ver historial de búsquedas
curl -X GET "http://localhost:4000/flights/searches?limit=5" \
  -H "Authorization: Bearer $TOKEN"

# 8. Generar itinerario (sin searchId)
curl -X POST http://localhost:4000/ai/full-itinerary \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "destination": "MAD",
    "startDate": "2025-12-15",
    "endDate": "2025-12-18",
    "budget": 800
  }'

# 9. Generar itinerario (con searchId de la búsqueda previa)
curl -X POST http://localhost:4000/ai/full-itinerary \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "destination": "MAD",
    "startDate": "2025-12-15",
    "endDate": "2025-12-18",
    "budget": 800,
    "searchId": "uuid-de-la-busqueda"
  }'
```

---

## 🧪 Prueba Rápida con PowerShell (Windows)

```powershell
# 1. Registrar usuario
$body = @{email="test@test.com"; password="123456"} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:4000/auth/register" -Method Post -Body $body -ContentType "application/json"

# 2. Login
$login = Invoke-RestMethod -Uri "http://localhost:4000/auth/login" -Method Post -Body $body -ContentType "application/json"
$token = $login.access_token

# 3. Headers con token
$headers = @{Authorization = "Bearer $token"}

# 4. Ver perfil
Invoke-RestMethod -Uri "http://localhost:4000/auth/profile" -Headers $headers

# 5. Actualizar preferencias
$prefs = @{travelStyle="economic"; favoriteActivities=@("culture","gastronomy")} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:4000/users/preferences" -Method Put -Body $prefs -ContentType "application/json" -Headers $headers

# 6. Buscar vuelos
$search = Invoke-RestMethod -Uri "http://localhost:4000/flights/search?origin=MAD&destination=PAR&departureDate=2025-12-15&adults=1" -Headers $headers
$searchId = $search.searchId

# 7. Generar itinerario
$itinerary = @{
    destination = "MAD"
    startDate = "2025-12-15"
    endDate = "2025-12-18"
    budget = 800
    searchId = $searchId
} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:4000/ai/full-itinerary" -Method Post -Body $itinerary -ContentType "application/json" -Headers $headers
```

---

## ✅ Checklist de Verificación

- [ ] Docker Compose levantado (PostgreSQL corriendo)
- [ ] Variables de entorno configuradas (.env)
- [ ] `npm install` ejecutado
- [ ] Servidor iniciado (`npm run start:dev`)
- [ ] Registro de usuario funciona
- [ ] Login retorna access_token
- [ ] Preferencias se guardan correctamente
- [ ] Búsqueda de vuelos retorna resultados de Amadeus
- [ ] Generación de itinerario funciona con OpenAI

---

*Documentación generada para TravelSIA MVP - Noviembre 2025*
