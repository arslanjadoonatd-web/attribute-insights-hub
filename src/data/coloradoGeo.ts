import raw from './coloradoGeo.json';

export interface ZipData {
  geometry: GeoJSON.Polygon | GeoJSON.MultiPolygon;
  center: [number, number];
  bbox: [[number, number], [number, number]];
  spanish: number;
  income: number;
}

export interface CityData {
  geometry: GeoJSON.Polygon | GeoJSON.MultiPolygon;
  center: [number, number];
  bbox: [[number, number], [number, number]];
  spanish: number;
  income: number;
  zips: Record<string, ZipData>;
}

export interface CountyData {
  geoid: string;
  geometry: GeoJSON.Polygon | GeoJSON.MultiPolygon;
  center: [number, number];
  bbox: [[number, number], [number, number]];
  spanish: number;
  income: number;
  cities: Record<string, CityData>;
}

export interface StoreData {
  id: string;
  brand: 'Metro' | 'Cricket';
  name: string;
  county: string;
  city: string | null;
  zip: string | null;
  lat: number;
  lng: number;
  address: string;
  phone: string;
}

export const COUNTIES = raw.counties as unknown as Record<string, CountyData>;
export const STORES = raw.stores as unknown as StoreData[];

export const COUNTY_NAMES = Object.keys(COUNTIES).sort();

/* State-level dummy demographics (replace with real data later) */
export const STATE_DEMOGRAPHICS = { spanish: 21.7, income: 89930, name: 'Colorado' };

/* Distinct, high-contrast palette so neighbouring areas never share a colour */
export const PALETTE = [
  '#6366f1', '#f97316', '#0ea5e9', '#a855f7', '#14b8a6',
  '#f43f5e', '#84cc16', '#eab308', '#ec4899', '#06b6d4',
  '#8b5cf6', '#22c55e', '#f59e0b', '#3b82f6', '#d946ef',
  '#10b981', '#ef4444', '#0891b2', '#7c3aed', '#65a30d',
];

export const colorFor = (index: number) => PALETTE[index % PALETTE.length];

export const STATE_BOUNDS: [[number, number], [number, number]] = [
  [39.05, -105.75],
  [40.35, -103.6],
];
