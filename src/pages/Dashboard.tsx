// import React, { useState, useMemo, useRef, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import { Store, MapPin, Phone, Search, Filter, Smartphone, ChevronDown, Check, Users, DollarSign } from 'lucide-react';
// import { STORES_DATA, US_STATES, STATE_CENTER_COORDS, STATE_DEMOGRAPHICS, type Store as StoreType } from '../data/storesData';
// import { MapController } from '../components/MapController';

// export const Dashboard: React.FC = () => {
//     const [selectedState, setSelectedState] = useState<string>('All States');
//     const [searchQuery, setSearchQuery] = useState<string>('');
//     const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

//     // Reference for detecting click outside of the dropdown
//     const dropdownRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//                 setIsDropdownOpen(false);
//             }
//         };
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => document.removeEventListener('mousedown', handleClickOutside);
//     }, []);

//     // Filter Stores based on Selected State & Search Query
//     const filteredStores = useMemo(() => {
//         return STORES_DATA.filter((store) => {
//             const matchesState = selectedState === 'All States' || store.state === selectedState;
//             const matchesSearch =
//                 store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                 store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                 store.address.toLowerCase().includes(searchQuery.toLowerCase());

//             return matchesState && matchesSearch;
//         });
//     }, [selectedState, searchQuery]);

//     // Map view position (center) & Zoom level change logic
//     const mapConfig = useMemo(() => {
//         const center = STATE_CENTER_COORDS[selectedState] || [39.8283, -98.5795];
//         const zoom = selectedState === 'All States' ? 4 : 6;
//         return { center, zoom };
//     }, [selectedState]);

//     return (
//         <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%', overflow: 'hidden', backgroundColor: '#f8fafc', fontFamily: 'sans-serif', margin: 0, padding: 0 }}>

//             {/* Top Header - 100% Width & Compact Height */}
//             <header style={{
//                 background: 'linear-gradient(90deg, #37289e 0%, #632bd6 50%, #8f4bf0 100%)',
//                 color: 'white',
//                 padding: '8px 34px',
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
//                 width: '100%',
//                 boxSizing: 'border-box'
//             }}>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//                     {/* Icon Container */}
//                     <div style={{
//                         backgroundColor: 'rgba(255, 255, 255, 0.15)',
//                         backdropFilter: 'blur(5px)',
//                         padding: '6px',
//                         borderRadius: '8px',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center'
//                     }}>
//                         <Smartphone size={20} color="white" />
//                     </div>

//                     {/* Title & Subtitle */}
//                     <div>
//                         <h1 style={{ fontSize: '18px', color: '#e0d6fe', fontWeight: '700', margin: 0, letterSpacing: '-0.3px' }}>
//                             Metro by T-Mobile Locator
//                         </h1>
//                         <p style={{ fontSize: '12px', color: '#e0d6fe', margin: 0, opacity: 0.9 }}>
//                             US Franchises & Stores Dashboard
//                         </p>
//                     </div>
//                 </div>

//                 {/* Modern Custom Dropdown Filter */}
//                 <div ref={dropdownRef} style={{ position: 'relative' }}>
//                     <button
//                         type="button"
//                         onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                         style={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             gap: '8px',
//                             backgroundColor: 'rgba(255, 255, 255, 0.95)',
//                             backdropFilter: 'blur(8px)',
//                             padding: '6px 14px',
//                             borderRadius: '8px',
//                             border: 'none',
//                             boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
//                             color: '#3b0764',
//                             fontWeight: '600',
//                             fontSize: '13px',
//                             cursor: 'pointer',
//                             transition: 'all 0.2s ease',
//                             outline: 'none'
//                         }}
//                     >
//                         <Filter size={14} color="#632bd6" />
//                         <span>{selectedState}</span>
//                         <ChevronDown
//                             size={14}
//                             color="#632bd6"
//                             style={{
//                                 transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
//                                 transition: 'transform 0.2s ease'
//                             }}
//                         />
//                     </button>

//                     {/* Floating Dropdown Menu */}
//                     {isDropdownOpen && (
//                         <div
//                             style={{
//                                 position: 'absolute',
//                                 top: 'calc(100% + 6px)',
//                                 right: 0,
//                                 backgroundColor: '#ffffff',
//                                 borderRadius: '10px',
//                                 boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
//                                 border: '1px solid #f1f5f9',
//                                 padding: '6px',
//                                 minWidth: '160px',
//                                 zIndex: 9999,
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 gap: '2px'
//                             }}
//                         >
//                             {US_STATES.map((state) => {
//                                 const isSelected = selectedState === state;
//                                 return (
//                                     <div
//                                         key={state}
//                                         onClick={() => {
//                                             setSelectedState(state);
//                                             setIsDropdownOpen(false);
//                                         }}
//                                         style={{
//                                             display: 'flex',
//                                             alignItems: 'center',
//                                             justifyContent: 'space-between',
//                                             padding: '8px 12px',
//                                             borderRadius: '6px',
//                                             fontSize: '13px',
//                                             fontWeight: isSelected ? '700' : '500',
//                                             color: isSelected ? '#632bd6' : '#334155',
//                                             backgroundColor: isSelected ? '#f3e8ff' : 'transparent',
//                                             cursor: 'pointer',
//                                             transition: 'background-color 0.15s ease'
//                                         }}
//                                         onMouseEnter={(e) => {
//                                             if (!isSelected) e.currentTarget.style.backgroundColor = '#f8fafc';
//                                         }}
//                                         onMouseLeave={(e) => {
//                                             if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
//                                         }}
//                                     >
//                                         <span>{state}</span>
//                                         {isSelected && <Check size={14} color="#632bd6" />}
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     )}
//                 </div>
//             </header>

//             {/* Main Content Area */}
//             <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

//                 {/* Left Sidebar - Filtered Stores List */}
//                 <div style={{ width: '360px', backgroundColor: 'white', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>

//                     {/* Search Input Box */}
//                     <div style={{ padding: '16px', borderBottom: '1px solid #e2e8f0' }}>
//                         <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f1f5f9', padding: '8px 12px', borderRadius: '8px', gap: '8px' }}>
//                             <Search size={18} color="#64748b" />
//                             <input
//                                 type="text"
//                                 placeholder="Search city, address..."
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', width: '100%', fontSize: '14px' }}
//                             />
//                         </div>
//                         <div style={{ fontSize: '12px', color: '#64748b', marginTop: '12px' }}>
//                             Showing <b>{filteredStores.length}</b> stores in <b>{selectedState}</b>
//                         </div>
//                     </div>

//                     {/* Demographic Stats Info Card */}
//                     <div style={{
//                         backgroundColor: '#f3e8ff',
//                         padding: '12px 16px',
//                         borderBottom: '1px solid #e9d5ff',
//                         display: 'flex',
//                         justifyContent: 'space-between',
//                         alignItems: 'center'
//                     }}>
//                         {/* Spanish Population Stat */}
//                         <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                             <div style={{ backgroundColor: '#e9d5ff', padding: '6px', borderRadius: '6px' }}>
//                                 <Users size={16} color="#632bd6" />
//                             </div>
//                             <div>
//                                 <div style={{ fontSize: '10px', color: '#6b21a8', fontWeight: '700', letterSpacing: '0.5px' }}>
//                                     SPANISH SPEAKERS
//                                 </div>
//                                 <div style={{ fontSize: '14px', fontWeight: '800', color: '#3b0764' }}>
//                                     {STATE_DEMOGRAPHICS[selectedState]?.spanishPercentage}%
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Median Household Income Stat */}
//                         <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                             <div style={{ backgroundColor: '#e9d5ff', padding: '6px', borderRadius: '6px' }}>
//                                 <DollarSign size={16} color="#632bd6" />
//                             </div>
//                             <div>
//                                 <div style={{ fontSize: '10px', color: '#6b21a8', fontWeight: '700', letterSpacing: '0.5px' }}>
//                                     MEDIAN INCOME
//                                 </div>
//                                 <div style={{ fontSize: '14px', fontWeight: '800', color: '#3b0764' }}>
//                                     {STATE_DEMOGRAPHICS[selectedState]?.medianIncome}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Stores List */}
//                     <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
//                         {filteredStores.length === 0 ? (
//                             <div style={{ textAlign: 'center', padding: '32px 16px', color: '#64748b' }}>
//                                 No stores found matching your query.
//                             </div>
//                         ) : (
//                             filteredStores.map((store: StoreType) => (
//                                 <div
//                                     key={store.id}
//                                     style={{
//                                         padding: '12px',
//                                         borderRadius: '8px',
//                                         border: '1px solid #f1f5f9',
//                                         marginBottom: '8px',
//                                         backgroundColor: '#fafafa',
//                                         boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
//                                         transition: 'all 0.2s ease'
//                                     }}
//                                 >
//                                     <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#1e293b', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
//                                         <Store size={16} color="#e20074" />
//                                         {store.name}
//                                     </h3>
//                                     <div style={{ fontSize: '12px', color: '#475569', display: 'flex', flexDirection: 'column', gap: '4px' }}>
//                                         <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
//                                             <MapPin size={14} color="#64748b" />
//                                             <span>{store.address}, {store.city}, {store.state} {store.zip}</span>
//                                         </div>
//                                         <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
//                                             <Phone size={14} color="#64748b" />
//                                             <span>{store.phone}</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 </div>

//                 {/* Right Side - Interactive Map View */}
//                 <div style={{ flex: 1, position: 'relative' }}>
//                     <MapContainer
//                         center={mapConfig.center}
//                         zoom={mapConfig.zoom}
//                         style={{ width: '100%', height: '100%' }}
//                         zoomControl={true}
//                     >
//                         {/* Map Pan and Zoom Controller */}
//                         <MapController center={mapConfig.center} zoom={mapConfig.zoom} />

//                         {/* OpenStreetMap Tile Layer */}
//                         <TileLayer
//                             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         />

//                         {/* Store Markers */}
//                         {filteredStores.map((store: StoreType) => (
//                             <Marker key={store.id} position={[store.lat, store.lng]}>
//                                 <Popup>
//                                     <div style={{ padding: '4px' }}>
//                                         <h4 style={{ margin: '0 0 4px 0', color: '#e20074', fontSize: '14px' }}>{store.name}</h4>
//                                         <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#334155' }}>
//                                             {store.address}, {store.city}, {store.state}
//                                         </p>
//                                         <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>
//                                             <strong>Phone:</strong> {store.phone}
//                                         </p>
//                                     </div>
//                                 </Popup>
//                             </Marker>
//                         ))}
//                     </MapContainer>
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default Dashboard;




























import React, { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from 'react-leaflet';
import { Store, MapPin, Phone, Search, RotateCcw, Smartphone, Users, DollarSign } from 'lucide-react';
import L from 'leaflet';
import { 
  DENVER_DATA, 
  SAMPLE_STORES, 
  ALL_US_STATES, 
  DENVER_DEMOGRAPHICS, 
  COLOR_PALETTE,
  COUNTY_GEOMETRIES,
  CITY_GEOMETRIES,
  ZIP_GEOMETRIES,
  type StoreMarker 
} from '../data/denverData';

// Custom Marker Icons Logic
const createCustomIcon = (colorClass: string) => {
  return L.divIcon({
    className: `custom-marker ${colorClass}`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

const greenIcon = createCustomIcon('custom-marker-green');
const redIcon = createCustomIcon('custom-marker-red');

// Leaflet Auto-Zoom Controller Component
const MapViewController: React.FC<{ bounds: [number, number][] | null }> = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    if (bounds && bounds.length > 0) {
      map.fitBounds(bounds, { padding: [30, 30], animate: true });
    } else {
      map.setView([39.7392, -104.9903], 9, { animate: true });
    }
  }, [bounds, map]);
  return null;
};

export const Dashboard: React.FC = () => {
  const [selectedState] = useState<string>('Colorado');
  const [selectedCounty, setSelectedCounty] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedZip, setSelectedZip] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const countiesList = useMemo(() => Object.keys(DENVER_DATA), []);

  const availableCities = useMemo(() => {
    if (selectedCounty !== 'All') {
      return Object.keys(DENVER_DATA[selectedCounty] || {});
    }
    const allCities = new Set<string>();
    Object.values(DENVER_DATA).forEach((countyData) => {
      Object.keys(countyData).forEach((city) => allCities.add(city));
    });
    return Array.from(allCities).sort();
  }, [selectedCounty]);

  const availableZipCodes = useMemo(() => {
    if (selectedCounty !== 'All' && selectedCity !== 'All') {
      return DENVER_DATA[selectedCounty]?.[selectedCity] || [];
    }
    const zips = new Set<string>();
    Object.values(DENVER_DATA).forEach((countyData) => {
      Object.values(countyData).forEach((zipList) => {
        zipList.forEach((z) => zips.add(z));
      });
    });
    return Array.from(zips).sort();
  }, [selectedCounty, selectedCity]);

  const handleResetFilters = () => {
    setSelectedCounty('All');
    setSelectedCity('All');
    setSelectedZip('All');
    setSearchQuery('');
  };

  const filteredStores = useMemo(() => {
    return SAMPLE_STORES.filter((store) => {
      const matchCounty = selectedCounty === 'All' || store.county === selectedCounty;
      const matchCity = selectedCity === 'All' || store.city === selectedCity;
      const matchZip = selectedZip === 'All' || store.zip === selectedZip;
      const matchSearch =
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.address.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCounty && matchCity && matchZip && matchSearch;
    });
  }, [selectedCounty, selectedCity, selectedZip, searchQuery]);

  // Dynamic Bounds Calculation for Auto Zoom
  const activeZoomBounds = useMemo(() => {
    if (selectedZip !== 'All' && ZIP_GEOMETRIES[selectedZip]) {
      return ZIP_GEOMETRIES[selectedZip];
    }
    if (selectedCity !== 'All' && selectedCounty !== 'All' && CITY_GEOMETRIES[selectedCounty]?.[selectedCity]) {
      return CITY_GEOMETRIES[selectedCounty][selectedCity];
    }
    if (selectedCounty !== 'All' && COUNTY_GEOMETRIES[selectedCounty]) {
      return COUNTY_GEOMETRIES[selectedCounty];
    }
    return null;
  }, [selectedCounty, selectedCity, selectedZip]);

  // Dynamic Polygons Data Switcher
  const renderedPolygons = useMemo(() => {
    // LEVEL 3: Zip Code Selected or City Selected (Show Zip Codes)
    if (selectedCity !== 'All') {
      const zipsToRender = selectedZip !== 'All' ? [selectedZip] : (availableZipCodes || []);
      return zipsToRender.map((zip, idx) => ({
        id: zip,
        title: `Zip Code: ${zip}`,
        coords: ZIP_GEOMETRIES[zip] || [],
        color: COLOR_PALETTE[idx % COLOR_PALETTE.length]
      })).filter(item => item.coords.length > 0);
    }

    // LEVEL 2: County Selected (Show Cities in Different Colors)
    if (selectedCounty !== 'All') {
      const citiesInCounty = CITY_GEOMETRIES[selectedCounty] || {};
      return Object.entries(citiesInCounty).map(([cityName, coords], idx) => ({
        id: cityName,
        title: `City: ${cityName}`,
        coords: coords,
        color: COLOR_PALETTE[idx % COLOR_PALETTE.length]
      }));
    }

    // LEVEL 1: All Selected (Show Counties in Different Colors)
    return Object.entries(COUNTY_GEOMETRIES).map(([countyName, coords], idx) => ({
      id: countyName,
      title: countyName,
      coords: coords,
      color: COLOR_PALETTE[idx % COLOR_PALETTE.length]
    }));
  }, [selectedCounty, selectedCity, selectedZip, availableZipCodes]);

  const activeDemographics = useMemo(() => {
    return DENVER_DEMOGRAPHICS[selectedCounty] || DENVER_DEMOGRAPHICS['All'];
  }, [selectedCounty]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%', maxWidth: '100vw', overflow: 'hidden', margin: 0, padding: 0, fontFamily: 'sans-serif' }}>
      
      {/* Top Bar */}
      <header style={{ background: 'linear-gradient(90deg, #37289e 0%, #632bd6 50%, #8f4bf0 100%)', color: 'white', padding: '8px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.15)', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', padding: '6px', borderRadius: '8px', display: 'flex' }}>
            <Smartphone size={20} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '15px', fontWeight: '700', margin: 0, color: '#ffffff' }}>Metro & Cricket Locator</h1>
            <p style={{ fontSize: '11px', color: '#e0d6fe', margin: 0 }}>Denver Metro Region</p>
          </div>
        </div>

        {/* Dynamic Cascading Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ backgroundColor: '#e2e8f0', padding: '5px 10px', borderRadius: '6px' }}>
            <select value={selectedState} disabled style={{ border: 'none', background: 'transparent', fontWeight: '600', color: '#475569', fontSize: '12px' }}>
              {ALL_US_STATES.map((st) => (
                <option key={st} value={st} disabled={st !== 'Colorado'}>{st}</option>
              ))}
            </select>
          </div>

          <div style={{ backgroundColor: 'white', padding: '5px 10px', borderRadius: '6px' }}>
            <select value={selectedCounty} onChange={(e) => { setSelectedCounty(e.target.value); setSelectedCity('All'); setSelectedZip('All'); }} style={{ border: 'none', background: 'transparent', fontWeight: '600', color: '#3b0764', fontSize: '12px', cursor: 'pointer' }}>
              <option value="All">All Counties</option>
              {countiesList.map((county) => (
                <option key={county} value={county}>{county}</option>
              ))}
            </select>
          </div>

          <div style={{ backgroundColor: 'white', padding: '5px 10px', borderRadius: '6px' }}>
            <select value={selectedCity} onChange={(e) => { setSelectedCity(e.target.value); setSelectedZip('All'); }} style={{ border: 'none', background: 'transparent', fontWeight: '600', color: '#3b0764', fontSize: '12px', cursor: 'pointer' }}>
              <option value="All">All Cities</option>
              {availableCities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div style={{ backgroundColor: 'white', padding: '5px 10px', borderRadius: '6px' }}>
            <select value={selectedZip} onChange={(e) => setSelectedZip(e.target.value)} style={{ border: 'none', background: 'transparent', fontWeight: '600', color: '#3b0764', fontSize: '12px', cursor: 'pointer' }}>
              <option value="All">All Zip Codes</option>
              {availableZipCodes.map((zip) => (
                <option key={zip} value={zip}>{zip}</option>
              ))}
            </select>
          </div>

          <button onClick={handleResetFilters} style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
            <RotateCcw size={13} /> Reset
          </button>
        </div>
      </header>

      {/* Content */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* Left Sidebar */}
        <div style={{ width: '360px', backgroundColor: 'white', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '14px', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f1f5f9', padding: '8px 12px', borderRadius: '8px', gap: '8px' }}>
              <Search size={18} color="#64748b" />
              <input
                type="text"
                placeholder="Search city, address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', width: '100%', fontSize: '14px' }}
              />
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '10px' }}>
              Showing <b>{filteredStores.length}</b> stores
            </div>
          </div>

          <div style={{ backgroundColor: '#f3e8ff', padding: '12px 16px', borderBottom: '1px solid #e9d5ff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ backgroundColor: '#e9d5ff', padding: '6px', borderRadius: '6px' }}>
                <Users size={16} color="#632bd6" />
              </div>
              <div>
                <div style={{ fontSize: '10px', color: '#6b21a8', fontWeight: '700' }}>SPANISH SPEAKERS</div>
                <div style={{ fontSize: '14px', fontWeight: '800', color: '#3b0764' }}>
                  {activeDemographics.spanishPercentage}%
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ backgroundColor: '#e9d5ff', padding: '6px', borderRadius: '6px' }}>
                <DollarSign size={16} color="#632bd6" />
              </div>
              <div>
                <div style={{ fontSize: '10px', color: '#6b21a8', fontWeight: '700' }}>MEDIAN INCOME</div>
                <div style={{ fontSize: '14px', fontWeight: '800', color: '#3b0764' }}>
                  {activeDemographics.medianIncome}
                </div>
              </div>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
            {filteredStores.map((store: StoreMarker) => (
              <div key={store.id} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #f1f5f9', marginBottom: '8px', backgroundColor: '#fafafa' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#1e293b', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Store size={16} color={store.brand === 'Metro' ? '#10b981' : '#ef4444'} />
                  {store.name}
                </h3>
                <div style={{ fontSize: '12px', color: '#475569', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={14} color="#64748b" />
                    <span>{store.address}, {store.city}, {store.county} {store.zip}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Phone size={14} color="#64748b" />
                    <span>{store.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map View */}
        <div style={{ flex: 1, position: 'relative' }}>
          <MapContainer center={[39.7392, -104.9903]} zoom={9} style={{ width: '100%', height: '100%' }}>
            <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            
            {/* Auto-Zoom Controller */}
            <MapViewController bounds={activeZoomBounds} />

            {/* Render Multi-level Dynamic Color Polygons */}
            {renderedPolygons.map((poly) => (
              <Polygon
                key={poly.id}
                positions={poly.coords}
                pathOptions={{
                  fillColor: poly.color,
                  fillOpacity: 0.35,
                  color: poly.color,
                  weight: 2
                }}
              >
                <Popup>
                  <div style={{ padding: '2px', fontWeight: 'bold', color: poly.color }}>
                    {poly.title}
                  </div>
                </Popup>
              </Polygon>
            ))}

            {/* Store Markers */}
            {filteredStores.map((store: StoreMarker) => (
              <Marker key={store.id} position={[store.lat, store.lng]} icon={store.brand === 'Metro' ? greenIcon : redIcon}>
                <Popup>
                  <div style={{ padding: '4px' }}>
                    <h4 style={{ margin: '0 0 4px 0', color: store.brand === 'Metro' ? '#10b981' : '#ef4444' }}>{store.name}</h4>
                    <p style={{ margin: 0, fontSize: '12px' }}>{store.address}, {store.city}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;