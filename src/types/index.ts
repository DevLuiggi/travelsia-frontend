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

export const IATA_AIRPORTS = [
  {
    "value": "ABD",
    "label": "ABADAN - IRAN (ABD)"
  },
  {
    "value": "ABJ",
    "label": "ABIDJAN - COSTA DE MARFIL (ABJ)"
  },
  {
    "value": "AUH",
    "label": "ABU DHABI - EMIRATOS ARABES (AUH)"
  },
  {
    "value": "ACA",
    "label": "ACAPULCO - MEXICO (ACA)"
  },
  {
    "value": "ACC",
    "label": "ACCRA - GHANA (ACC)"
  },
  {
    "value": "ADD",
    "label": "ADDIS ABEBA - ETIOPIA (ADD)"
  },
  {
    "value": "ADL",
    "label": "ADELAIDE - AUSTRALIA (ADL)"
  },
  {
    "value": "ALY",
    "label": "ALEJANDRIA - EGIPTO (ALY)"
  },
  {
    "value": "ALP",
    "label": "ALEPRO - SIRIA (ALP)"
  },
  {
    "value": "ARR",
    "label": "ALTO RI O SENGUERR - ARGENTINA (ARR)"
  },
  {
    "value": "AMM",
    "label": "AMMAN - JORDANIA (AMM)"
  },
  {
    "value": "AMS",
    "label": "AMSTERDAM - HOLANDA (AMS)"
  },
  {
    "value": "ANC",
    "label": "ANCHORAGE , ALASKA - ESTADOS UNIDOS (ANC)"
  },
  {
    "value": "ANK",
    "label": "ANKARA - TURQUIA (ANK)"
  },
  {
    "value": "TNR",
    "label": "ANTANANARIVO - MADAGASCAR (TNR)"
  },
  {
    "value": "ANU",
    "label": "ANTIGUA - ANTIGUA Y BARBUDA (ANU)"
  },
  {
    "value": "ANF",
    "label": "ANTOFAGASTA - CHILE (ANF)"
  },
  {
    "value": "APW",
    "label": "APIA - SAMOA O. (APW)"
  },
  {
    "value": "AJU",
    "label": "ARACAJU - SE - BRASIL (AJU)"
  },
  {
    "value": "AQP",
    "label": "AREQUIPA - PERU (AQP)"
  },
  {
    "value": "ALG",
    "label": "ARGEL - ARGELIA (ALG)"
  },
  {
    "value": "ARI",
    "label": "ARICA - CHILE (ARI)"
  },
  {
    "value": "AUA",
    "label": "ARUBA - ANTILLAS HOLANDESAS (AUA)"
  },
  {
    "value": "ASM",
    "label": "ASMARA - ETIOPIA (ASM)"
  },
  {
    "value": "ASU",
    "label": "ASUNCION - PARAGUAY (ASU)"
  },
  {
    "value": "ATH",
    "label": "ATENAS - GRECIA (ATH)"
  },
  {
    "value": "ATL",
    "label": "ATLANTA - ESTADOS UNIDOS (ATL)"
  },
  {
    "value": "AKL",
    "label": "AUCKLAND - NUEVA ZELANDA (AKL)"
  },
  {
    "value": "AYP",
    "label": "AYACUCHO - PERU (AYP)"
  },
  {
    "value": "BGW",
    "label": "BAGDAD - IRAK (BGW)"
  },
  {
    "value": "BHI",
    "label": "BAHIA BLANCA - ARGENTINA (BHI)"
  },
  {
    "value": "BAH",
    "label": "BAHREIN - BAHREIN (BAH)"
  },
  {
    "value": "BBA",
    "label": "BALMACEDA - CHILE (BBA)"
  },
  {
    "value": "BWI",
    "label": "BALTIMORE - MARYLAND, U.S.A. (BWI)"
  },
  {
    "value": "BKO",
    "label": "BAMAKO - MALI (BKO)"
  },
  {
    "value": "BKK",
    "label": "BANGKOK - THAILANDIA (BKK)"
  },
  {
    "value": "BGF",
    "label": "BANGUI - REP. CENTROAFRICANA (BGF)"
  },
  {
    "value": "BJL",
    "label": "BANJUL - GAMBIA (BJL)"
  },
  {
    "value": "BGI",
    "label": "BARBADOS - BARBADOS, ANTILLAS (BGI)"
  },
  {
    "value": "BCN",
    "label": "BARCELONA - ESPAÑA (BCN)"
  },
  {
    "value": "BLA",
    "label": "BARCELONA - VENEZUELA (BLA)"
  },
  {
    "value": "BRC",
    "label": "BARILOCHE - ARGENTINA (BRC)"
  },
  {
    "value": "BAQ",
    "label": "BARRANQUILLA - COLOMBIA (BAQ)"
  },
  {
    "value": "BSR",
    "label": "BASRA - IRAQ (BSR)"
  },
  {
    "value": "BEI",
    "label": "BEIRUT - LIBANO (BEI)"
  },
  {
    "value": "BEY",
    "label": "BEIRUT - LIBANO (BEY)"
  },
  {
    "value": "BEL",
    "label": "BELEM - BRASIL (BEL)"
  },
  {
    "value": "BEG",
    "label": "BELGRADO - YUGOSLAVIA (BEG)"
  },
  {
    "value": "BHZ",
    "label": "BELO HORIZONTE - BRAZIL (BHZ)"
  },
  {
    "value": "BEN",
    "label": "BENGHAZI - LIBIA (BEN)"
  },
  {
    "value": "BGO",
    "label": "BERGEN - NORUEGA (BGO)"
  },
  {
    "value": "BER",
    "label": "BERLIN - ALEMANIA (BER)"
  },
  {
    "value": "BIO",
    "label": "BILBAO - ESPAÑA (BIO)"
  },
  {
    "value": "BLZ",
    "label": "BLANTYRE - MALAWI (BLZ)"
  },
  {
    "value": "BOG",
    "label": "BOGOTA - COLOMBIA (BOG)"
  },
  {
    "value": "BLR",
    "label": "BOLIVAR - ARGENTINA (BLR)"
  },
  {
    "value": "BLQ",
    "label": "BOLOGNA - ITALIA (BLQ)"
  },
  {
    "value": "BOM",
    "label": "BOMBAY - INDIA (BOM)"
  },
  {
    "value": "BON",
    "label": "BONAIRE - ANTILLAS HOLANDESAS (BON)"
  },
  {
    "value": "BOS",
    "label": "BOSTON - ESTADOS UNIDOS (BOS)"
  },
  {
    "value": "BSB",
    "label": "BRASILIA - DF, BRASIL (BSB)"
  },
  {
    "value": "BTS",
    "label": "BRATISLAVA - CHECOSLOVAQUIA (BTS)"
  },
  {
    "value": "BZV",
    "label": "BRAZZAVILLE - REP. POP. DEL CONGO (BZV)"
  },
  {
    "value": "BNE",
    "label": "BRISBANE - AUSTRALIA (BNE)"
  },
  {
    "value": "BRU",
    "label": "BRUSELAS - BELGICA (BRU)"
  },
  {
    "value": "BUH",
    "label": "BUCAREST - RUMANIA (BUH)"
  },
  {
    "value": "BUD",
    "label": "BUDAPEST - HUNGRIA (BUD)"
  },
  {
    "value": "BUE",
    "label": "BUENOS AIRES - ARGENTINA (BUE)"
  },
  {
    "value": "BNF",
    "label": "BUFFALO - NUEVA YORK, U.S.A. (BNF)"
  },
  {
    "value": "BJM",
    "label": "BUJUMBURA - BURUNDI (BJM)"
  },
  {
    "value": "BKY",
    "label": "BUKAVU - ZAIRE (BKY)"
  },
  {
    "value": "BUQ",
    "label": "BULAWAYO - ZIMBAWE (BUQ)"
  },
  {
    "value": "BWN",
    "label": "B.SERI BEGAWAN - BRUNEI (BWN)"
  },
  {
    "value": "CNS",
    "label": "CAIRNS - AUSTRALIA (CNS)"
  },
  {
    "value": "CJC",
    "label": "CALAMA - CHILE (CJC)"
  },
  {
    "value": "CCU",
    "label": "CALCUTA - INDIA (CCU)"
  },
  {
    "value": "YYC",
    "label": "CALGARY - CANADA (YYC)"
  },
  {
    "value": "CLO",
    "label": "CALI - COLOMBIA (CLO)"
  },
  {
    "value": "CUN",
    "label": "CANCUN - MEXICO (CUN)"
  },
  {
    "value": "CPT",
    "label": "CAPE TOWN - SUD AFRICA (CPT)"
  },
  {
    "value": "CCS",
    "label": "CARACAS - VENEZUELA (CCS)"
  },
  {
    "value": "CTG",
    "label": "CARTAGENA - COLOMBIA (CTG)"
  },
  {
    "value": "CAS",
    "label": "CASABLANCA - MARRUECOS (CAS)"
  },
  {
    "value": "CTC",
    "label": "CATAMARCA - ARGENTINA (CTC)"
  },
  {
    "value": "CAT",
    "label": "CATANIA - ITALIA (CAT)"
  },
  {
    "value": "CVH",
    "label": "CAVIAHUE - ARGENTINA (CVH)"
  },
  {
    "value": "CAY",
    "label": "CAYENA - GUAYANA FRANCESA (CAY)"
  },
  {
    "value": "CYL",
    "label": "CAYO LARGO - CUBA (CYL)"
  },
  {
    "value": "CEB",
    "label": "CEBU - FILIPINAS (CEB)"
  },
  {
    "value": "CPC",
    "label": "CHAPELCO - ARGENTINA (CPC)"
  },
  {
    "value": "CHI",
    "label": "CHICAGO - ESTADOS UNIDOS (CHI)"
  },
  {
    "value": "CIX",
    "label": "CHICLAYO - PERU (CIX)"
  },
  {
    "value": "OEL",
    "label": "CHOELE CHOEL - ARGENTINA (OEL)"
  },
  {
    "value": "CHM",
    "label": "CHOS MALAL - ARGENTINA (CHM)"
  },
  {
    "value": "CHC",
    "label": "CHRISTCHURCH - NUEVA ZELANDA (CHC)"
  },
  {
    "value": "CVG",
    "label": "CINCINNATI - OHIO, U.S.A. (CVG)"
  },
  {
    "value": "CLE",
    "label": "CLEVELAND - OHIO, U.S.A. (CLE)"
  },
  {
    "value": "CBB",
    "label": "COCHABAMBA - BOLIVIA (CBB)"
  },
  {
    "value": "CMB",
    "label": "COLOMBO - SRI LANKA (CMB)"
  },
  {
    "value": "CGN",
    "label": "COLONIA - ALEMANIA (CGN)"
  },
  {
    "value": "CYR",
    "label": "COLONIA - URUGUAY (CYR)"
  },
  {
    "value": "CLT",
    "label": "COLONIA CATRIEL - ARGENTINA (CLT)"
  },
  {
    "value": "CMH",
    "label": "COLUMBUS - OHIO, U.S.A. (CMH)"
  },
  {
    "value": "CRD",
    "label": "COMODORO RIVADAVIA - ARGENTINA (CRD)"
  },
  {
    "value": "CKY",
    "label": "CONAKRI - GUINEA (CKY)"
  },
  {
    "value": "CCP",
    "label": "CONCEPCION - CHILE (CCP)"
  },
  {
    "value": "COC",
    "label": "CONCORDIA - ARGENTINA (COC)"
  },
  {
    "value": "CPH",
    "label": "COPENHAGUE - DINAMARCA (CPH)"
  },
  {
    "value": "CPO",
    "label": "COPIAPO - CHILE (CPO)"
  },
  {
    "value": "COR",
    "label": "CORDOBA - ARGENTINA (COR)"
  },
  {
    "value": "CSU",
    "label": "CORONEL SUAREZ - ARGENTINA (CSU)"
  },
  {
    "value": "SUZ",
    "label": "CORONEL SUAREZ - ARGENTINA (SUZ)"
  },
  {
    "value": "CNQ",
    "label": "CORRIENTES - ARGENTINA (CNQ)"
  },
  {
    "value": "COO",
    "label": "COTONOU - BENIN (COO)"
  },
  {
    "value": "CGB",
    "label": "CUIABA - BRASIL (CGB)"
  },
  {
    "value": "CUR",
    "label": "CURACAO - ANTILLAS (CUR)"
  },
  {
    "value": "CWB",
    "label": "CURITIBA - BRASIL (CWB)"
  },
  {
    "value": "CUT",
    "label": "CUTRAL -CO - ARGENTINA (CUT)"
  },
  {
    "value": "CUZ",
    "label": "CUZCO - PERU (CUZ)"
  },
  {
    "value": "DKR",
    "label": "DAKAR - SENEGAL (DKR)"
  },
  {
    "value": "DLC",
    "label": "DALIAN - REP. POP. CHINA (DLC)"
  },
  {
    "value": "DFW",
    "label": "DALLAS/FORT WORTH - ESTADOS UNIDOS (DFW)"
  },
  {
    "value": "DAM",
    "label": "DAMASCO - SIRIA (DAM)"
  },
  {
    "value": "DAR",
    "label": "DAR ES SALAAM - TANZANIA (DAR)"
  },
  {
    "value": "DAY",
    "label": "DAYTON - OHAIO - USA (DAY)"
  },
  {
    "value": "DEL",
    "label": "DELHI - INDIA (DEL)"
  },
  {
    "value": "DPS",
    "label": "DENPASAR -BALI - INDONESIA (DPS)"
  },
  {
    "value": "DEN",
    "label": "DENVER - COLORADO, U.S.A. (DEN)"
  },
  {
    "value": "DTT",
    "label": "DETROIT - MICHIGAN, U.S.A. (DTT)"
  },
  {
    "value": "DHA",
    "label": "DHAHRAN - ARABIA SAUDITA (DHA)"
  },
  {
    "value": "DAC",
    "label": "DHAKA - BANGLADES H (DAC)"
  },
  {
    "value": "DIR",
    "label": "DIRE DAWA - ETIOPIA (DIR)"
  },
  {
    "value": "JIB",
    "label": "DJIBOUTI - DJIBOUTI (JIB)"
  },
  {
    "value": "DOH",
    "label": "DOHA - QATAR (DOH)"
  },
  {
    "value": "DLA",
    "label": "DOUALA - CAMERUN (DLA)"
  },
  {
    "value": "DXB",
    "label": "DUBAI - EMIRATOS A. UNIDOS (DXB)"
  },
  {
    "value": "DUB",
    "label": "DUBLIN - IRLANDA (DUB)"
  },
  {
    "value": "DBV",
    "label": "DUBROVNIK - CROACIA (DBV)"
  },
  {
    "value": "DUS",
    "label": "DUSSELDORF - ALEMANIA (DUS)"
  },
  {
    "value": "YEG",
    "label": "EDMONTON - CANADA (YEG)"
  },
  {
    "value": "EHL",
    "label": "EL BOLSON - ARGENTINA (EHL)"
  },
  {
    "value": "CAI",
    "label": "EL CAIRO - EGIPTO (CAI)"
  },
  {
    "value": "CLF",
    "label": "EL CALAFATE - ARGENTINA (CLF)"
  },
  {
    "value": "ECL",
    "label": "EL CHALTEN - ARGENTINA (ECL)"
  },
  {
    "value": "EMX",
    "label": "EL MAITEN - ARGENTINA (EMX)"
  },
  {
    "value": "ESR",
    "label": "EL SALVADOR - CHILE (ESR)"
  },
  {
    "value": "EBB",
    "label": "ENTEBE - UGANDA (EBB)"
  },
  {
    "value": "IZM",
    "label": "ESMIRNA - TURQUIA (IZM)"
  },
  {
    "value": "EQS",
    "label": "ESQUEL - ARGENTINA (EQS)"
  },
  {
    "value": "IST",
    "label": "ESTAMBUL - TURQUIA (IST)"
  },
  {
    "value": "STO",
    "label": "ESTOCOLMO - SUECIA (STO)"
  },
  {
    "value": "SXB",
    "label": "ESTRASBURGO - FRANCIA (SXB)"
  },
  {
    "value": "FAO",
    "label": "FARO - PORTUGAL (FAO)"
  },
  {
    "value": "PHL",
    "label": "FILADELFIA - PENNSYLVANIA, U.S.A (PHL)"
  },
  {
    "value": "FLN",
    "label": "FLORIANOPOLIS - BRAZIL (FLN)"
  },
  {
    "value": "FMA",
    "label": "FORMOSA - ARGENTINA (FMA)"
  },
  {
    "value": "FDF",
    "label": "FORT DE FRANCE - MARTINICA (FDF)"
  },
  {
    "value": "FLL",
    "label": "FORT LAUDERDALE, FLORIDA - E.E.U.U. (FLL)"
  },
  {
    "value": "FOR",
    "label": "FORTALEZA - CE, BRASIL (FOR)"
  },
  {
    "value": "FRA",
    "label": "FRANKFURT - ALEMANIA (FRA)"
  },
  {
    "value": "FNA",
    "label": "FREETOWN - SIERRA LEON A (FNA)"
  },
  {
    "value": "FUK",
    "label": "FUKUOKA - JAPON (FUK)"
  },
  {
    "value": "FNC",
    "label": "FUNCHAL - IS. MADEIRA, PORTUGAL (FNC)"
  },
  {
    "value": "GBE",
    "label": "GABORONE - BOTSWANA (GBE)"
  },
  {
    "value": "GPO",
    "label": "GENERAL PICO - ARGENTINA (GPO)"
  },
  {
    "value": "GNR",
    "label": "GENERAL ROCA - ARGENTINA (GNR)"
  },
  {
    "value": "GOA",
    "label": "GENOVA - ITALIA (GOA)"
  },
  {
    "value": "GEO",
    "label": "GEORGETOWN - GUYANA (GEO)"
  },
  {
    "value": "GIB",
    "label": "GIBRALTAR - GIBRALTAR (GIB)"
  },
  {
    "value": "GVA",
    "label": "GINEBRA - SUIZA (GVA)"
  },
  {
    "value": "GGS",
    "label": "GOBERNADOR GREGORES - ARGENTINA (GGS)"
  },
  {
    "value": "GYN",
    "label": "GOIANIA - BRASIL (GYN)"
  },
  {
    "value": "GOT",
    "label": "GOTEMBURGO - SUECIA (GOT)"
  },
  {
    "value": "OYA",
    "label": "GOYA - ARGENTINA (OYA)"
  },
  {
    "value": "GRZ",
    "label": "GRAZ - AUSTRIA (GRZ)"
  },
  {
    "value": "GUM",
    "label": "GUAM - GUAM (GUM)"
  },
  {
    "value": "CAN",
    "label": "GUANGZHOU - REP. POP. CHINA (CAN)"
  },
  {
    "value": "GUA",
    "label": "GUATEMALA - GUATEMALA (GUA)"
  },
  {
    "value": "OUA",
    "label": "GUATEMALA - GUATEMALA (OUA)"
  },
  {
    "value": "GYE",
    "label": "GUAYAQUIL - ECUADOR (GYE)"
  },
  {
    "value": "HAV",
    "label": "HABANA - CUBA (HAV)"
  },
  {
    "value": "HAM",
    "label": "HAMBURGO - ALEMANIA FEDERAL (HAM)"
  },
  {
    "value": "HAN",
    "label": "HANOI - VIETNAM (HAN)"
  },
  {
    "value": "HRE",
    "label": "HARARE - ZIMBAWE (HRE)"
  },
  {
    "value": "BDL",
    "label": "HARTFORD - CONNECTICUT, U.S.A. (BDL)"
  },
  {
    "value": "HEL",
    "label": "HELSINKI - FINLANDIA (HEL)"
  },
  {
    "value": "SGN",
    "label": "HO CHI MINH - VIETNAM (SGN)"
  },
  {
    "value": "HKG",
    "label": "HONG KONG - HONG KONG (HKG)"
  },
  {
    "value": "HNL",
    "label": "HONOLULU ( HAWAII ) - ESTADOS UNIDOS (HNL)"
  },
  {
    "value": "HOR",
    "label": "HORTA - IS. AZORES, PORTUGAL (HOR)"
  },
  {
    "value": "HOU",
    "label": "HOUSTON - ESTADOS UNIDOS (HOU)"
  },
  {
    "value": "IGU",
    "label": "IGUACU - BRASIL (IGU)"
  },
  {
    "value": "IGR",
    "label": "IGUAZU - ARGENTINA (IGR)"
  },
  {
    "value": "ILH",
    "label": "ILHA DO SAL - CABO VERDE (ILH)"
  },
  {
    "value": "SID",
    "label": "ILHA DO SAL - CABO VERDE (SID)"
  },
  {
    "value": "IND",
    "label": "INDIANAPOLIS - INDIANA, U.S.A. (IND)"
  },
  {
    "value": "IJC",
    "label": "INGENIERO JACOBACCI - ARGENTINA (IJC)"
  },
  {
    "value": "IQQ",
    "label": "IQUIQUE - CHILE (IQQ)"
  },
  {
    "value": "IQT",
    "label": "IQUITOS - PERU (IQT)"
  },
  {
    "value": "IPC",
    "label": "ISLA DE PASCUA - CHILE (IPC)"
  },
  {
    "value": "ISB",
    "label": "ISLAMABAD - PAKISTAN (ISB)"
  },
  {
    "value": "JKT",
    "label": "JAKARTA - INDONESIA (JKT)"
  },
  {
    "value": "JED",
    "label": "JEDDAH - ARABIA SAUDITA (JED)"
  },
  {
    "value": "JRS",
    "label": "JERUSALEM - ISRAEL (JRS)"
  },
  {
    "value": "JPA",
    "label": "JOAO PESSOA - PB, BRASIL (JPA)"
  },
  {
    "value": "JNB",
    "label": "JOHANNESBURGO - SUD AFRICA (JNB)"
  },
  {
    "value": "JSM",
    "label": "JOSE DE SAN MARTIN - ARGENTINA (JSM)"
  },
  {
    "value": "JUJ",
    "label": "JUJUY - ARGENTINA (JUJ)"
  },
  {
    "value": "KBL",
    "label": "KABUL - AFGANISTAN (KBL)"
  },
  {
    "value": "KAN",
    "label": "KANO - NIGERIA (KAN)"
  },
  {
    "value": "MKC",
    "label": "KANSAS - MISSOURI - USA (MKC)"
  },
  {
    "value": "KHH",
    "label": "KAOHSIUNG - TAIWAN (KHH)"
  },
  {
    "value": "KHI",
    "label": "KARACHI - PAKISTAN (KHI)"
  },
  {
    "value": "KTM",
    "label": "KATMANDU - NEPAL (KTM)"
  },
  {
    "value": "KRT",
    "label": "KHARTUM - SUDAN (KRT)"
  },
  {
    "value": "KGL",
    "label": "KIGALI - RWANDA (KGL)"
  },
  {
    "value": "KIN",
    "label": "KINGSTON - JAMAICA (KIN)"
  },
  {
    "value": "FIH",
    "label": "KINSHASA - ZAIRE (FIH)"
  },
  {
    "value": "KLU",
    "label": "KLAGENFURT - AUSTRIA (KLU)"
  },
  {
    "value": "BKI",
    "label": "KOTA KINABALU - MALASIA (BKI)"
  },
  {
    "value": "KRS",
    "label": "KRISTIANSAND - NORUEGA (KRS)"
  },
  {
    "value": "JUL",
    "label": "KUALA LUMPUR - MALASIA (JUL)"
  },
  {
    "value": "KUL",
    "label": "KUALA LUMPUR - MALASIA (KUL)"
  },
  {
    "value": "KWI",
    "label": "KUWAIT - KUWAIT (KWI)"
  },
  {
    "value": "LCE",
    "label": "LA CEIBA - HONDURAS (LCE)"
  },
  {
    "value": "LCG",
    "label": "LA CORUÑA - ESPAÑA (LCG)"
  },
  {
    "value": "LPB",
    "label": "LA PAZ - BOLIVIA (LPB)"
  },
  {
    "value": "LPG",
    "label": "LA PLATA - ARGENTINA (LPG)"
  },
  {
    "value": "IRJ",
    "label": "LA RIOJA - ARGENTINA (IRJ)"
  },
  {
    "value": "LSC",
    "label": "LA SERENA - CHILE (LSC)"
  },
  {
    "value": "ING",
    "label": "LAGO ARGENTINO - ARGENTINA (ING)"
  },
  {
    "value": "LOS",
    "label": "LAGOS - NIGERIA (LOS)"
  },
  {
    "value": "SUF",
    "label": "LAMEZIA TERME - ITALIA (SUF)"
  },
  {
    "value": "LCA",
    "label": "LARNACA - CHIPRE (LCA)"
  },
  {
    "value": "CHS",
    "label": "LAS HERAS - ARGENTINA (CHS)"
  },
  {
    "value": "LPA",
    "label": "LAS PALMAS - ESPAÑA (LPA)"
  },
  {
    "value": "LAS",
    "label": "LAS VEGAS - NEVADA - USA (LAS)"
  },
  {
    "value": "LBV",
    "label": "LIBREVILLE - GABON (LBV)"
  },
  {
    "value": "LIL",
    "label": "LILLE - FRANCIA (LIL)"
  },
  {
    "value": "LLW",
    "label": "LILONGWE - MALAWI (LLW)"
  },
  {
    "value": "LIM",
    "label": "LIMA - PERU (LIM)"
  },
  {
    "value": "LNZ",
    "label": "LINZ - AUSTRIA (LNZ)"
  },
  {
    "value": "LIS",
    "label": "LISBOA - PORTUGAL (LIS)"
  },
  {
    "value": "LJU",
    "label": "LJUBLJANA - ESLOVENIA (LJU)"
  },
  {
    "value": "LFW",
    "label": "LOME - TOGO (LFW)"
  },
  {
    "value": "LCP",
    "label": "LONCOPUE - ARGENTINA (LCP)"
  },
  {
    "value": "LON",
    "label": "LONDRES - INGLATERRA (LON)"
  },
  {
    "value": "LAX",
    "label": "LOS ANGELES - ESTADOS UNIDOS (LAX)"
  },
  {
    "value": "LSQ",
    "label": "LOS ANGELES - CHILE (LSQ)"
  },
  {
    "value": "LAD",
    "label": "LUANDA - ANGOLA (LAD)"
  },
  {
    "value": "FBM",
    "label": "LUBUMBASHI - ZAIRE (FBM)"
  },
  {
    "value": "LUN",
    "label": "LUSAKA - ZAMBIA (LUN)"
  },
  {
    "value": "LUX",
    "label": "LUXEMBURGO - LUXEMBURGO (LUX)"
  },
  {
    "value": "LYS",
    "label": "LYON - FRANCIA (LYS)"
  },
  {
    "value": "MCP",
    "label": "MACAPA - BRASIL (MCP)"
  },
  {
    "value": "MCZ",
    "label": "MACEIO - BRASIL (MCZ)"
  },
  {
    "value": "MAA",
    "label": "MADRAS - INDIA (MAA)"
  },
  {
    "value": "MAD",
    "label": "MADRID - ESPAÑA (MAD)"
  },
  {
    "value": "AGP",
    "label": "MALAGA - ESPAÑA (AGP)"
  },
  {
    "value": "MLG",
    "label": "MALARGUE - ARGENTINA (MLG)"
  },
  {
    "value": "MMA",
    "label": "MALMO - SUECIA (MMA)"
  },
  {
    "value": "MLA",
    "label": "MALTA - MALTA (MLA)"
  },
  {
    "value": "MGA",
    "label": "MANAGUA - NICARAGUA (MGA)"
  },
  {
    "value": "MAO",
    "label": "MANAOS - BRASIL (MAO)"
  },
  {
    "value": "MNL",
    "label": "MANILA - FILIPINAS (MNL)"
  },
  {
    "value": "MPM",
    "label": "MAPUTO - MOZAMBIQUE (MPM)"
  },
  {
    "value": "MDQ",
    "label": "MAR DEL PLATA - ARGENTINA (MDQ)"
  },
  {
    "value": "MAR",
    "label": "MARACAIBO - VENEZUELA (MAR)"
  },
  {
    "value": "MRS",
    "label": "MARSELLA - FRANCIA (MRS)"
  },
  {
    "value": "MCT",
    "label": "MASCATE - OMAN (MCT)"
  },
  {
    "value": "MRU",
    "label": "MAURICIO - IS. MAURICIO (MRU)"
  },
  {
    "value": "MDE",
    "label": "MEDELLIN - COLOMBIA (MDE)"
  },
  {
    "value": "MEL",
    "label": "MELBOURNE - AUSTRALIA (MEL)"
  },
  {
    "value": "MDZ",
    "label": "MENDOZA - ARGENTINA (MDZ)"
  },
  {
    "value": "MEM",
    "label": "MENPHIS - TENNESSE, U.S.A. (MEM)"
  },
  {
    "value": "MID",
    "label": "MERIDA - MEXICO (MID)"
  },
  {
    "value": "MEX",
    "label": "MEXICO - MEXICO (MEX)"
  },
  {
    "value": "MIA",
    "label": "MIAMI - ESTADOS UNIDOS (MIA)"
  },
  {
    "value": "MIL",
    "label": "MILAN - ITALIA MILAN (MIL)"
  },
  {
    "value": "MKE",
    "label": "MILWAUKEE - WISCONSIN, U.S.A. (MKE)"
  },
  {
    "value": "MSP",
    "label": "MINNEAPOLIS - MINNESOTA, U.S.A. (MSP)"
  },
  {
    "value": "MLW",
    "label": "MONROVIA - LIBERIA (MLW)"
  },
  {
    "value": "MBJ",
    "label": "MONTEGO BAY - JAMAICA (MBJ)"
  },
  {
    "value": "MVD",
    "label": "MONTEVIDEO - URUGUAY (MVD)"
  },
  {
    "value": "YUL",
    "label": "MONTREAL - CANADA (YUL)"
  },
  {
    "value": "MOW",
    "label": "MOSCU - U.R.S.S. (MOW)"
  },
  {
    "value": "MLH",
    "label": "MULHOUSE - FRANCIA (MLH)"
  },
  {
    "value": "MUC",
    "label": "MUNICH - ALEMANIA FEDERAL (MUC)"
  },
  {
    "value": "NAN",
    "label": "NADI - FIJI (NAN)"
  },
  {
    "value": "NGO",
    "label": "NAGOYA - JAPON (NGO)"
  },
  {
    "value": "NAP",
    "label": "NAPOLES - ITALIA (NAP)"
  },
  {
    "value": "BNA",
    "label": "NASHVILLE - TENNESSEE - USA (BNA)"
  },
  {
    "value": "NAS",
    "label": "NASSAU - BAHAMAS (NAS)"
  },
  {
    "value": "NAT",
    "label": "NATAL - RN, BRASIL (NAT)"
  },
  {
    "value": "NEC",
    "label": "NECOCHEA - ARGENTINA (NEC)"
  },
  {
    "value": "NQN",
    "label": "NEUQUEN - ARGENTINA (NQN)"
  },
  {
    "value": "NIM",
    "label": "NIAMEI - NIGERIA (NIM)"
  },
  {
    "value": "NIC",
    "label": "NICOSIA - CHIPRE (NIC)"
  },
  {
    "value": "IUE",
    "label": "NIUE - ISLA NIUE (IUE)"
  },
  {
    "value": "NCE",
    "label": "NIZA - FRANCIA (NCE)"
  },
  {
    "value": "ORF",
    "label": "NORFOLK - VIRGINIA - USA (ORF)"
  },
  {
    "value": "NKC",
    "label": "NOUAKCHOTT - MAURITANIA (NKC)"
  },
  {
    "value": "NOU",
    "label": "NOUMEA - NUEVA CALEDONIA (NOU)"
  },
  {
    "value": "MSY",
    "label": "NUEVA ORLEANS - ESTADOS UNIDOS (MSY)"
  },
  {
    "value": "NYC",
    "label": "NUEVA YORK - ESTADOS UNIDOS (NYC)"
  },
  {
    "value": "NDJ",
    "label": "NDJAMENA - CHAD (NDJ)"
  },
  {
    "value": "ODS",
    "label": "ODESSA - C.E.I. (ODS)"
  },
  {
    "value": "OKA",
    "label": "OKINAWA - JAPON (OKA)"
  },
  {
    "value": "OLC",
    "label": "OLAVARRIA - ARGENTINA (OLC)"
  },
  {
    "value": "OPO",
    "label": "OPORTO - PORTUGAL (OPO)"
  },
  {
    "value": "ORL",
    "label": "ORLANDO - ESTADOS UNIDOS (ORL)"
  },
  {
    "value": "OSA",
    "label": "OSAKA - JAPON (OSA)"
  },
  {
    "value": "OSL",
    "label": "OSLO - NORUEGA (OSL)"
  },
  {
    "value": "ZOS",
    "label": "OSORNO - CHILE (ZOS)"
  },
  {
    "value": "YOW",
    "label": "OTTAWA - CANADA (YOW)"
  },
  {
    "value": "PPG",
    "label": "PAGO PAGO - SAMOA (PPG)"
  },
  {
    "value": "PMO",
    "label": "PALERMO - ITALIA (PMO)"
  },
  {
    "value": "PTY",
    "label": "PANAMA - PANAMA (PTY)"
  },
  {
    "value": "PPT",
    "label": "PAPEETE - TAHITI (PPT)"
  },
  {
    "value": "PBM",
    "label": "PARAMARIBO - SURINAM (PBM)"
  },
  {
    "value": "PRA",
    "label": "PARANA - ARGENTINA (PRA)"
  },
  {
    "value": "PAR",
    "label": "PARIS - FRANCIA (PAR)"
  },
  {
    "value": "AOL",
    "label": "PASO DE LOS LIBRES - ARGENTINA (AOL)"
  },
  {
    "value": "PEK",
    "label": "PEKIN - P.R.CHINA (PEK)"
  },
  {
    "value": "PEN",
    "label": "PENANG - MALASIA (PEN)"
  },
  {
    "value": "PMQ",
    "label": "PERITO MORENO - ARGENTINA (PMQ)"
  },
  {
    "value": "PER",
    "label": "PERTH - AUSTRALIA (PER)"
  },
  {
    "value": "PHX",
    "label": "PHOENIX - ARIZONA, U.S.A. (PHX)"
  },
  {
    "value": "HKT",
    "label": "PHUKET - TAILANDIA (HKT)"
  },
  {
    "value": "PAJ",
    "label": "PINAMAR - ARGENTINA (PAJ)"
  },
  {
    "value": "PIT",
    "label": "PITTSBURG - PENNSYLVANIA, U.S.A (PIT)"
  },
  {
    "value": "PIU",
    "label": "PIURA - PERU (PIU)"
  },
  {
    "value": "PTP",
    "label": "POINTE A PITRE - GUADALUPE (PTP)"
  },
  {
    "value": "PDL",
    "label": "PONTA DELGADA - IS. AZORES, PORTUGAL (PDL)"
  },
  {
    "value": "PMV",
    "label": "PORLAMAR - VENEZUELA (PMV)"
  },
  {
    "value": "PAP",
    "label": "PORT AU PRINCE - HAITI (PAP)"
  },
  {
    "value": "POS",
    "label": "PORT OF SPAIN - TRINIDAD (POS)"
  },
  {
    "value": "PDX",
    "label": "PORTLAND - OREGON, U.S.A. (PDX)"
  },
  {
    "value": "POA",
    "label": "PORTO ALEGRE - BRASIL (POA)"
  },
  {
    "value": "PXO",
    "label": "PORTO SANTO - IS. MADEIRA (PXO)"
  },
  {
    "value": "PSS",
    "label": "POSADAS - ARGENTINA (PSS)"
  },
  {
    "value": "PRG",
    "label": "PRAGA - CHECOSLOVAQUIA (PRG)"
  },
  {
    "value": "PCL",
    "label": "PUCALLPA - PERU (PCL)"
  },
  {
    "value": "PUD",
    "label": "PUERTO DESEADO - ARGENTINA (PUD)"
  },
  {
    "value": "DRY",
    "label": "PUERTO MADRYN - ARGENTINA (DRY)"
  },
  {
    "value": "PEM",
    "label": "PUERTO MALDONADO - PERU (PEM)"
  },
  {
    "value": "PMC",
    "label": "PUERTO MONTT - CHILE (PMC)"
  },
  {
    "value": "PUQ",
    "label": "PUNTA ARENAS - CHILE (PUQ)"
  },
  {
    "value": "PUJ",
    "label": "PUNTA CANA - REP. DOMINICANA (PUJ)"
  },
  {
    "value": "PDP",
    "label": "PUNTA DEL ESTE - URUGUAY (PDP)"
  },
  {
    "value": "PMI",
    "label": "P. DE MALLORCA - IS. BALEARES, ESPAñA (PMI)"
  },
  {
    "value": "UIO",
    "label": "QUITO - ECUADOR (UIO)"
  },
  {
    "value": "RDU",
    "label": "RALEIGH - CAROLINA DEL N., U. (RDU)"
  },
  {
    "value": "RGN",
    "label": "RANGOON - BURMA (RGN)"
  },
  {
    "value": "RAR",
    "label": "RAROTONGA - COOK, PACIFICO SUR (RAR)"
  },
  {
    "value": "REC",
    "label": "RECIFE - BRASIL (REC)"
  },
  {
    "value": "RCQ",
    "label": "RECONQUISTA - ARGENTINA (RCQ)"
  },
  {
    "value": "REG",
    "label": "REGGIO - CALABRIA - ITALIA (REG)"
  },
  {
    "value": "RES",
    "label": "RESISTENCIA - ARGENTINA (RES)"
  },
  {
    "value": "REK",
    "label": "REYKJAVIK - ISLANDIA (REK)"
  },
  {
    "value": "RIC",
    "label": "RICHMOND - VIRGINIA, U.S.A. (RIC)"
  },
  {
    "value": "RNS",
    "label": "RINCON DE LOS SAUCES - ARGENTINA (RNS)"
  },
  {
    "value": "RCU",
    "label": "RIO CUARTO - ARGENTINA (RCU)"
  },
  {
    "value": "RIO",
    "label": "RIO DE JANEIRO - BRASIL (RIO)"
  },
  {
    "value": "RGL",
    "label": "RIO GALLEGOS - ARGENTINA (RGL)"
  },
  {
    "value": "RGA",
    "label": "RIO GRANDE - ARGENTINA (RGA)"
  },
  {
    "value": "ROY",
    "label": "RIO MAYO - ARGENTINA (ROY)"
  },
  {
    "value": "RYO",
    "label": "RIO TURBIO - ARGENTINA (RYO)"
  },
  {
    "value": "RUH",
    "label": "RIYADH - ARABIA SAUDITA (RUH)"
  },
  {
    "value": "RTB",
    "label": "ROATAN - HONDURAS (RTB)"
  },
  {
    "value": "ROC",
    "label": "ROCHESTER - NEW YORK - USA (ROC)"
  },
  {
    "value": "ROM",
    "label": "ROMA - ITALIA (ROM)"
  },
  {
    "value": "ROS",
    "label": "ROSARIO - ARGENTINA (ROS)"
  },
  {
    "value": "RUN",
    "label": "SAINT DENIS - IS. REUNION, FRANCIA (RUN)"
  },
  {
    "value": "SPN",
    "label": "SAIPAN - ISLAS MARIANAS (SPN)"
  },
  {
    "value": "SLC",
    "label": "SALT LAKE CITY - UTAH, U.S.A. (SLC)"
  },
  {
    "value": "SLA",
    "label": "SALTA - ARGENTINA (SLA)"
  },
  {
    "value": "SSA",
    "label": "SALVADOR - BRASIL (SSA)"
  },
  {
    "value": "SZG",
    "label": "SALZBURGO - AUSTRIA (SZG)"
  },
  {
    "value": "OES",
    "label": "SAN ANTONIO OESTE - ARGENTINA (OES)"
  },
  {
    "value": "SAN",
    "label": "SAN DIEGO - CALIFORNIA, U.S.A. (SAN)"
  },
  {
    "value": "SFO",
    "label": "SAN FRANCISCO - ESTADOS UNIDOS (SFO)"
  },
  {
    "value": "SJC",
    "label": "SAN JOSE - CALIFORNIA - USA (SJC)"
  },
  {
    "value": "SJO",
    "label": "SAN JOSE - COSTA RICA (SJO)"
  },
  {
    "value": "SJU",
    "label": "SAN JUAN - PUERTO RICO (SJU)"
  },
  {
    "value": "UAQ",
    "label": "SAN JUAN - ARGENTINA (UAQ)"
  },
  {
    "value": "ULA",
    "label": "SAN JULIAN - ARGENTINA (ULA)"
  },
  {
    "value": "LUQ",
    "label": "SAN LUIS - ARGENTINA (LUQ)"
  },
  {
    "value": "SAP",
    "label": "SAN PEDRO SULA - HONDURAS (SAP)"
  },
  {
    "value": "AFA",
    "label": "SAN RAFAEL - ARGENTINA (AFA)"
  },
  {
    "value": "SAL",
    "label": "SAN SALVADOR - EL SALVADOR (SAL)"
  },
  {
    "value": "SAH",
    "label": "SANAA - REP. ARABE DEL YEMEN (SAH)"
  },
  {
    "value": "RZA",
    "label": "SANTA CRUZ - ARGENTINA (RZA)"
  },
  {
    "value": "SRZ",
    "label": "SANTA CRUZ - BOLIVIA (SRZ)"
  },
  {
    "value": "SFN",
    "label": "SANTA FE - ARGENTINA (SFN)"
  },
  {
    "value": "SMR",
    "label": "SANTA MARTA - COLOMBIA (SMR)"
  },
  {
    "value": "RSA",
    "label": "SANTA ROSA - ARGENTINA (RSA)"
  },
  {
    "value": "SST",
    "label": "SANTA TERESITA - ARGENTINA (SST)"
  },
  {
    "value": "SCL",
    "label": "SANTIAGO DE CHILE - CHILE (SCL)"
  },
  {
    "value": "SCQ",
    "label": "SANTIAGO DE COMPOSTELA - ESPAÑA (SCQ)"
  },
  {
    "value": "SDE",
    "label": "SANTIAGO DEL ESTERO - ARGENTINA (SDE)"
  },
  {
    "value": "SDQ",
    "label": "SANTO DOMINGO - REP. DOMINICANA (SDQ)"
  },
  {
    "value": "SLZ",
    "label": "SAO LUIZ - MA, BRASIL (SLZ)"
  },
  {
    "value": "SAO",
    "label": "SAO PAULO - BRASIL (SAO)"
  },
  {
    "value": "SEA",
    "label": "SEATTLE - ESTADOS UNIDOS (SEA)"
  },
  {
    "value": "SEL",
    "label": "SEUL - COREA DEL SUR (SEL)"
  },
  {
    "value": "SVQ",
    "label": "SEVILLA - ESPAÑA (SVQ)"
  },
  {
    "value": "SHA",
    "label": "SHANGHAI - CHINA (SHA)"
  },
  {
    "value": "SNN",
    "label": "SHANNON - IRLANDA (SNN)"
  },
  {
    "value": "SHJ",
    "label": "SHARJAH - EMIR. ARABES (SHJ)"
  },
  {
    "value": "SGV",
    "label": "SIERRA GRANDE - ARGENTINA (SGV)"
  },
  {
    "value": "SIN",
    "label": "SINGAPUR - SINGAPUR (SIN)"
  },
  {
    "value": "SOF",
    "label": "SOFIA - BULGARIA (SOF)"
  },
  {
    "value": "SLU",
    "label": "ST LUCIA - SANTA LUCIA, ANTILLAS (SLU)"
  },
  {
    "value": "SVG",
    "label": "STAVANGER - NORUEGA (SVG)"
  },
  {
    "value": "STR",
    "label": "STUTTGART - ALEMANIA (STR)"
  },
  {
    "value": "STX",
    "label": "ST. CROIX - IS. VIRGENES (STX)"
  },
  {
    "value": "STL",
    "label": "ST. LOUIS - MISSOURI, U.S.A. (STL)"
  },
  {
    "value": "SXM",
    "label": "ST. MAARTEN - ANTILLAS HOLANDESAS (SXM)"
  },
  {
    "value": "STT",
    "label": "ST. THOMAS - IS. VIRGENES (STT)"
  },
  {
    "value": "SYD",
    "label": "SYDNEY - AUSTRALIA (SYD)"
  },
  {
    "value": "TBT",
    "label": "TABATINGA - BRASIL (TBT)"
  },
  {
    "value": "TCQ",
    "label": "TACNA - PERU (TCQ)"
  },
  {
    "value": "TPE",
    "label": "TAIPEI - TAIWAN (TPE)"
  },
  {
    "value": "TPA",
    "label": "TAMPA - FLORIDA, U.S.A. (TPA)"
  },
  {
    "value": "NDL",
    "label": "TANDIL - ARGENTINA (NDL)"
  },
  {
    "value": "TDL",
    "label": "TANDIL - ARGENTINA (TDL)"
  },
  {
    "value": "TNG",
    "label": "TANGER - MARRUECOS (TNG)"
  },
  {
    "value": "TJA",
    "label": "TARIJA - BOLIVIA (TJA)"
  },
  {
    "value": "TFF",
    "label": "TEFE - BRASIL (TFF)"
  },
  {
    "value": "TGU",
    "label": "TEGUCIGALPA - HONDURAS (TGU)"
  },
  {
    "value": "THR",
    "label": "TEHERAN - IRAN (THR)"
  },
  {
    "value": "TLV",
    "label": "TEL AVIV - ISRAEL (TLV)"
  },
  {
    "value": "ZCO",
    "label": "TEMUCO - CHILE (ZCO)"
  },
  {
    "value": "TCI",
    "label": "TENERIFE - ISLAS CANARIAS (TCI)"
  },
  {
    "value": "TER",
    "label": "TERCEIRA - IS. AZORES (TER)"
  },
  {
    "value": "SKG",
    "label": "TESALONICA - GRECIA (SKG)"
  },
  {
    "value": "TSR",
    "label": "TIMISOALA - RUMANIA (TSR)"
  },
  {
    "value": "TIA",
    "label": "TIRANA - ALBANIA (TIA)"
  },
  {
    "value": "TYO",
    "label": "TOKYO - JAPON (TYO)"
  },
  {
    "value": "TBU",
    "label": "TONGATAPU - ISLAS TONGA (TBU)"
  },
  {
    "value": "YYZ",
    "label": "TORONTO - CANADA (YYZ)"
  },
  {
    "value": "REL",
    "label": "TRELEW - ARGENTINA (REL)"
  },
  {
    "value": "TIP",
    "label": "TRIPOLI - LIBIA (TIP)"
  },
  {
    "value": "TRU",
    "label": "TRUJILLO - PERU (TRU)"
  },
  {
    "value": "TUS",
    "label": "TUCSON - ARIZONA, U.S.A. (TUS)"
  },
  {
    "value": "TUC",
    "label": "TUCUMAN - ARGENTINA (TUC)"
  },
  {
    "value": "TUN",
    "label": "TUNEZ - TUNICIA (TUN)"
  },
  {
    "value": "TRN",
    "label": "TURIN - ITALIA (TRN)"
  },
  {
    "value": "USH",
    "label": "USHUAIA - ARGENTINA (USH)"
  },
  {
    "value": "ZAL",
    "label": "VALDIVIA - CHILE (ZAL)"
  },
  {
    "value": "VLC",
    "label": "VALENCIA - ESPAÑA (VLC)"
  },
  {
    "value": "YVR",
    "label": "VANCOUVER - CANADA (YVR)"
  },
  {
    "value": "VRA",
    "label": "VARADERO - CUBA (VRA)"
  },
  {
    "value": "WAW",
    "label": "VARSOVIA - POLONIA (WAW)"
  },
  {
    "value": "VCE",
    "label": "VENECIA - ITALIA (VCE)"
  },
  {
    "value": "YYJ",
    "label": "VICTORIA - CANADA (YYJ)"
  },
  {
    "value": "VFA",
    "label": "VICTORIA FALLS - ZIMBAWE (VFA)"
  },
  {
    "value": "VDM",
    "label": "VIEDMA - ARGENTINA (VDM)"
  },
  {
    "value": "VIE",
    "label": "VIENA - AUSTRIA (VIE)"
  },
  {
    "value": "VGO",
    "label": "VIGO - ESPAÑA (VGO)"
  },
  {
    "value": "VLG",
    "label": "VILLA GESELL - ARGENTINA (VLG)"
  },
  {
    "value": "VME",
    "label": "VILLA MERCEDES - ARGENTINA (VME)"
  },
  {
    "value": "VNO",
    "label": "VILNA - LITUANIA (VNO)"
  },
  {
    "value": "KNA",
    "label": "VIÑA DEL MAR - CHILE (KNA)"
  },
  {
    "value": "WAS",
    "label": "WASHINGTON D. C. - ESTADOS UNIDOS (WAS)"
  },
  {
    "value": "WLG",
    "label": "WELLINGTON - NUEVA ZELANDA (WLG)"
  },
  {
    "value": "WDH",
    "label": "WINDHOEK - NAMIBIA (WDH)"
  },
  {
    "value": "YOG",
    "label": "WINDSOR - CANADA (YOG)"
  },
  {
    "value": "YWG",
    "label": "WINNIPEG - CANADA (YWG)"
  },
  {
    "value": "XMN",
    "label": "XIAMEN - REPUBLICA POP. CHINA (XMN)"
  },
  {
    "value": "ZAG",
    "label": "ZAGREB - CROACIA (ZAG)"
  },
  {
    "value": "APZ",
    "label": "ZAPALA - ARGENTINA (APZ)"
  },
  {
    "value": "ZRH",
    "label": "ZURICH - SUIZA (ZRH)"
  }
];


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
