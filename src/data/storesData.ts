export interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  lat: number;
  lng: number;
  phone: string;
}

export const US_STATES = [
  'All States',
  'California',
  'Texas',
  'Florida',
  'New York',
  'Illinois'
];

export const STATE_CENTER_COORDS: Record<string, [number, number]> = {
  'All States': [39.8283, -98.5795],
  'California': [36.7783, -119.4179],
  'Texas': [31.9686, -99.9018],
  'Florida': [27.6648, -81.5158],
  'New York': [40.7128, -74.0060],
  'Illinois': [40.6331, -89.3985]
};

export interface StateDemographics {
  spanishPercentage: number;
  medianIncome: string;
}

export const STATE_DEMOGRAPHICS: Record<string, StateDemographics> = {
  'All States': { spanishPercentage: 12.5, medianIncome: '$74,580' },
  'California': { spanishPercentage: 26.7, medianIncome: '$91,551' },
  'Texas': { spanishPercentage: 24.7, medianIncome: '$72,284' },
  'Florida': { spanishPercentage: 20.3, medianIncome: '$69,303' },
  'New York': { spanishPercentage: 13.9, medianIncome: '$75,325' },
  'Illinois': { spanishPercentage: 13.2, medianIncome: '$78,855' }
};

export const STORES_DATA: Store[] = [
  // --- CALIFORNIA (5 Stores) ---
  { id: 'ca-1', name: 'Metro by T-Mobile - Downtown LA', address: '600 S Broadway', city: 'Los Angeles', state: 'California', zip: '90014', lat: 34.0453, lng: -118.2520, phone: '(213) 555-0143' },
  { id: 'ca-2', name: 'Metro by T-Mobile - Hollywood', address: '6801 Hollywood Blvd', city: 'Los Angeles', state: 'California', zip: '90028', lat: 34.1016, lng: -118.3387, phone: '(323) 555-0199' },
  { id: 'ca-3', name: 'Metro by T-Mobile - Mission District', address: '2600 Mission St', city: 'San Francisco', state: 'California', zip: '94110', lat: 37.7587, lng: -122.4190, phone: '(415) 555-0188' },
  { id: 'ca-4', name: 'Metro by T-Mobile - San Diego Central', address: '1100 Broadway', city: 'San Diego', state: 'California', zip: '92101', lat: 32.7157, lng: -117.1611, phone: '(619) 555-0122' },
  { id: 'ca-5', name: 'Metro by T-Mobile - San Jose West', address: '925 Blossom Hill Rd', city: 'San Jose', state: 'California', zip: '95123', lat: 37.2348, lng: -121.8601, phone: '(408) 555-0177' },

  // --- TEXAS (6 Stores) ---
  { id: 'tx-1', name: 'Metro by T-Mobile - Houston Downtown', address: '1200 Main St', city: 'Houston', state: 'Texas', zip: '77002', lat: 29.7589, lng: -95.3677, phone: '(713) 555-0199' },
  { id: 'tx-2', name: 'Metro by T-Mobile - Houston Galleria', address: '5015 Westheimer Rd', city: 'Houston', state: 'Texas', zip: '77056', lat: 29.7397, lng: -95.4636, phone: '(713) 555-0144' },
  { id: 'tx-3', name: 'Metro by T-Mobile - Dallas Metro', address: '1900 Main St', city: 'Dallas', state: 'Texas', zip: '75201', lat: 32.7813, lng: -96.7963, phone: '(214) 555-0182' },
  { id: 'tx-4', name: 'Metro by T-Mobile - Fort Worth Plaza', address: '400 Main St', city: 'Fort Worth', state: 'Texas', zip: '76102', lat: 32.7532, lng: -97.3312, phone: '(817) 555-0133' },
  { id: 'tx-5', name: 'Metro by T-Mobile - Austin Central', address: '600 Congress Ave', city: 'Austin', state: 'Texas', zip: '78701', lat: 30.2682, lng: -97.7428, phone: '(512) 555-0166' },
  { id: 'tx-6', name: 'Metro by T-Mobile - San Antonio Riverwalk', address: '300 E Houston St', city: 'San Antonio', state: 'Texas', zip: '78205', lat: 29.4260, lng: -98.4883, phone: '(210) 555-0111' },

  // --- FLORIDA (7 Stores) ---
  { id: 'fl-1', name: 'Metro by T-Mobile - Miami Downtown', address: '150 Flagler St', city: 'Miami', state: 'Florida', zip: '33131', lat: 25.7743, lng: -80.1937, phone: '(305) 555-0112' },
  { id: 'fl-2', name: 'Metro by T-Mobile - Miami Beach', address: '701 Lincoln Rd', city: 'Miami Beach', state: 'Florida', zip: '33139', lat: 25.7906, lng: -80.1385, phone: '(305) 555-0189' },
  { id: 'fl-3', name: 'Metro by T-Mobile - Orlando Central', address: '200 S Orange Ave', city: 'Orlando', state: 'Florida', zip: '32801', lat: 28.5383, lng: -81.3792, phone: '(407) 555-0134' },
  { id: 'fl-4', name: 'Metro by T-Mobile - Tampa Bay', address: '601 N Ashley Dr', city: 'Tampa', state: 'Florida', zip: '33602', lat: 27.9495, lng: -82.4597, phone: '(813) 555-0178' },
  { id: 'fl-5', name: 'Metro by T-Mobile - Jacksonville North', address: '100 N Laura St', city: 'Jacksonville', state: 'Florida', zip: '32202', lat: 30.3282, lng: -81.6588, phone: '(904) 555-0155' },
  { id: 'fl-6', name: 'Metro by T-Mobile - Fort Lauderdale', address: '500 E Broward Blvd', city: 'Fort Lauderdale', state: 'Florida', zip: '33301', lat: 26.1224, lng: -80.1373, phone: '(954) 555-0123' },
  { id: 'fl-7', name: 'Metro by T-Mobile - West Palm Beach', address: '200 Clematis St', city: 'West Palm Beach', state: 'Florida', zip: '33401', lat: 26.7138, lng: -80.0528, phone: '(561) 555-0147' },

  // --- NEW YORK (5 Stores) ---
  { id: 'ny-1', name: 'Metro by T-Mobile - Empire State', address: '350 5th Ave', city: 'New York', state: 'New York', zip: '10118', lat: 40.7484, lng: -73.9857, phone: '(212) 555-0164' },
  { id: 'ny-2', name: 'Metro by T-Mobile - Times Square', address: '1500 Broadway', city: 'New York', state: 'New York', zip: '10036', lat: 40.7567, lng: -73.9862, phone: '(212) 555-0190' },
  { id: 'ny-3', name: 'Metro by T-Mobile - Brooklyn Downtown', address: '450 Fulton St', city: 'Brooklyn', state: 'New York', zip: '11201', lat: 40.6908, lng: -73.9850, phone: '(718) 555-0128' },
  { id: 'ny-4', name: 'Metro by T-Mobile - Queens Jamaica', address: '160-08 Jamaica Ave', city: 'Jamaica', state: 'New York', zip: '11432', lat: 40.7028, lng: -73.7997, phone: '(718) 555-0145' },
  { id: 'ny-5', name: 'Metro by T-Mobile - Buffalo Main', address: '400 Main St', city: 'Buffalo', state: 'New York', zip: '14202', lat: 42.8864, lng: -78.8784, phone: '(716) 555-0119' },

  // --- ILLINOIS (4 Stores) ---
  { id: 'il-1', name: 'Metro by T-Mobile - Chicago Loop', address: '100 N LaSalle St', city: 'Chicago', state: 'Illinois', zip: '60602', lat: 41.8837, lng: -87.6324, phone: '(312) 555-0125' },
  { id: 'il-2', name: 'Metro by T-Mobile - Chicago Michigan Ave', address: '600 N Michigan Ave', city: 'Chicago', state: 'Illinois', zip: '60611', lat: 41.8929, lng: -87.6243, phone: '(312) 555-0167' },
  { id: 'il-3', name: 'Metro by T-Mobile - Peoria Central', address: '300 Main St', city: 'Peoria', state: 'Illinois', zip: '61602', lat: 40.6936, lng: -89.5890, phone: '(309) 555-0183' },
  { id: 'il-4', name: 'Metro by T-Mobile - Springfield Plaza', address: '500 E Adams St', city: 'Springfield', state: 'Illinois', zip: '62701', lat: 39.8017, lng: -89.6437, phone: '(217) 555-0132' }
];