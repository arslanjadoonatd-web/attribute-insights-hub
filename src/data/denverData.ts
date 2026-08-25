export interface StoreMarker {
  id: string;
  name: string;
  brand: 'Metro' | 'Cricket';
  county: string;
  city: string;
  zip: string;
  lat: number;
  lng: number;
  address: string;
  phone: string;
}

export const ALL_US_STATES = ['Alabama', 'Alaska', 'Arizona', 'California', 'Colorado', 'Florida', 'New York', 'Texas'];

export const DENVER_DEMOGRAPHICS: Record<string, { spanishPercentage: number; medianIncome: string }> = {
  'All': { spanishPercentage: 21.5, medianIncome: '$84,200' },
  'Denver County': { spanishPercentage: 29.3, medianIncome: '$78,177' },
  'Adams County': { spanishPercentage: 41.2, medianIncome: '$76,846' },
  'Arapahoe County': { spanishPercentage: 20.4, medianIncome: '$86,072' },
  'Jefferson County': { spanishPercentage: 15.8, medianIncome: '$92,470' },
  'Boulder County': { spanishPercentage: 14.1, medianIncome: '$92,512' },
  'Douglas County': { spanishPercentage: 9.2, medianIncome: '$127,443' }
};

export const DENVER_DATA: Record<string, Record<string, string[]>> = {
  "Denver County": {
    "Denver": ["80202", "80203", "80204", "80205"]
  },
  "Adams County": {
    "Aurora": ["80010", "80011"],
    "Thornton": ["80221", "80229"]
  },
  "Arapahoe County": {
    "Centennial": ["80111", "80112"],
    "Englewood": ["80110", "80113"]
  },
  "Jefferson County": {
    "Lakewood": ["80214", "80215"],
    "Arvada": ["80002", "80003"]
  },
  "Boulder County": {
    "Boulder": ["80301", "80302"],
    "Longmont": ["80501", "80503"]
  },
  "Douglas County": {
    "Castle Rock": ["80104", "80108"],
    "Parker": ["80134", "80138"]
  }
};

export const SAMPLE_STORES: StoreMarker[] = [
  { id: '1', name: 'Metro by T-Mobile - Denver Downtown', brand: 'Metro', county: 'Denver County', city: 'Denver', zip: '80202', lat: 39.7392, lng: -104.9903, address: '1600 California St', phone: '(303) 555-0199' },
  { id: '2', name: 'Cricket Wireless - Denver East', brand: 'Cricket', county: 'Denver County', city: 'Denver', zip: '80205', lat: 39.7541, lng: -104.9778, address: '2801 Colorado Blvd', phone: '(303) 555-0144' },
  { id: '3', name: 'Metro by T-Mobile - Aurora Colfax', brand: 'Metro', county: 'Adams County', city: 'Aurora', zip: '80010', lat: 39.7400, lng: -104.8319, address: '9801 E Colfax Ave', phone: '(303) 555-0188' },
  { id: '4', name: 'Cricket Wireless - Boulder Main', brand: 'Cricket', county: 'Boulder County', city: 'Boulder', zip: '80302', lat: 40.0150, lng: -105.2705, address: '1900 Pearl St', phone: '(303) 555-0122' },
  { id: '5', name: 'Metro by T-Mobile - Lakewood Alameda', brand: 'Metro', county: 'Jefferson County', city: 'Lakewood', zip: '80226', lat: 39.7047, lng: -105.0814, address: '7600 W Alameda Ave', phone: '(303) 555-0177' }
];

export const COLOR_PALETTE = [
  "#8b5cf6", "#ec4899", "#3b82f6", "#10b981", "#f59e0b", 
  "#06b6d4", "#6366f1", "#f97316", "#84cc16", "#d946ef"
];

// Level 1: Counties Shapes
export const COUNTY_GEOMETRIES: Record<string, [number, number][]> = {
  "Denver County": [[39.798, -105.053], [39.798, -104.885], [39.624, -104.885], [39.624, -105.053]],
  "Adams County": [[39.998, -105.053], [39.998, -103.700], [39.798, -103.700], [39.798, -104.885]],
  "Arapahoe County": [[39.739, -104.885], [39.739, -103.700], [39.560, -103.700], [39.560, -105.053]],
  "Jefferson County": [[39.950, -105.350], [39.950, -105.053], [39.300, -105.053], [39.300, -105.350]],
  "Boulder County": [[40.260, -105.600], [40.260, -105.053], [39.950, -105.053], [39.950, -105.600]],
  "Douglas County": [[39.560, -105.053], [39.560, -104.600], [39.130, -104.600], [39.130, -105.053]]
};

// Level 2: Cities Shapes
export const CITY_GEOMETRIES: Record<string, Record<string, [number, number][]>> = {
  "Adams County": {
    "Aurora": [[39.798, -104.885], [39.798, -104.600], [39.680, -104.600], [39.680, -104.885]],
    "Thornton": [[39.998, -105.053], [39.998, -104.885], [39.880, -104.885], [39.880, -105.053]]
  },
  "Jefferson County": {
    "Lakewood": [[39.760, -105.150], [39.760, -105.053], [39.650, -105.053], [39.650, -105.150]],
    "Arvada": [[39.850, -105.200], [39.850, -105.053], [39.760, -105.053], [39.760, -105.200]]
  },
  "Boulder County": {
    "Boulder": [[40.080, -105.350], [40.080, -105.180], [39.980, -105.180], [39.980, -105.350]],
    "Longmont": [[40.220, -105.180], [40.220, -105.053], [40.120, -105.053], [40.120, -105.180]]
  },
  "Denver County": {
    "Denver": [[39.798, -105.053], [39.798, -104.885], [39.624, -104.885], [39.624, -105.053]]
  }
};

// Level 3: Zip Code Shapes
export const ZIP_GEOMETRIES: Record<string, [number, number][]> = {
  "80202": [[39.760, -105.010], [39.760, -104.980], [39.730, -104.980], [39.730, -105.010]],
  "80203": [[39.740, -104.980], [39.740, -104.960], [39.720, -104.960], [39.720, -104.980]],
  "80204": [[39.740, -105.040], [39.740, -105.010], [39.710, -105.010], [39.710, -105.040]],
  "80205": [[39.780, -104.980], [39.780, -104.950], [39.740, -104.950], [39.740, -104.980]],
  "80010": [[39.760, -104.885], [39.760, -104.830], [39.720, -104.830], [39.720, -104.885]],
  "80011": [[39.798, -104.830], [39.798, -104.750], [39.740, -104.750], [39.740, -104.830]]
};