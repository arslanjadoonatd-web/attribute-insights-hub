import { useMemo, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import './Dashboard.css';
import {
  COUNTIES,
  COUNTY_NAMES,
  STORES,
  STATE_DEMOGRAPHICS,
  STATE_BOUNDS,
  colorFor,
} from '../data/coloradoGeo';
import type { StoreData } from '../data/coloradoGeo';

type Bounds = [[number, number], [number, number]];

const ALL = 'All';

const FitBounds = ({ bounds }: { bounds: Bounds }) => {
  const map = useMap();
  useEffect(() => {
    map.flyToBounds(bounds, { padding: [24, 24], duration: 1.1 });
  }, [bounds, map]);
  return null;
};

const storeIcon = (brand: StoreData['brand']) =>
  L.divIcon({
    className: '',
    html: `<div class="store-marker ${brand === 'Metro' ? 'marker-metro' : 'marker-cricket'}" style="width:14px;height:14px"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });

const money = (n: number) => `$${n.toLocaleString('en-US')}`;

const Dashboard = () => {
  const [county, setCounty] = useState(ALL);
  const [city, setCity] = useState(ALL);
  const [zip, setZip] = useState(ALL);

  const countyData = county !== ALL ? COUNTIES[county] : null;
  const cityNames = useMemo(
    () => (countyData ? Object.keys(countyData.cities).sort() : []),
    [countyData],
  );
  const cityData = countyData && city !== ALL ? countyData.cities[city] : null;
  const zipNames = useMemo(() => (cityData ? Object.keys(cityData.zips).sort() : []), [cityData]);
  const zipData = cityData && zip !== ALL ? cityData.zips[zip] : null;

  /* ---- demographics follow the deepest active filter ---- */
  const scope = zipData
    ? { label: `ZIP ${zip}`, spanish: zipData.spanish, income: zipData.income }
    : cityData
      ? { label: city, spanish: cityData.spanish, income: cityData.income }
      : countyData
        ? { label: county, spanish: countyData.spanish, income: countyData.income }
        : { label: STATE_DEMOGRAPHICS.name, spanish: STATE_DEMOGRAPHICS.spanish, income: STATE_DEMOGRAPHICS.income };

  const stores = useMemo(
    () =>
      STORES.filter(
        (s) =>
          (county === ALL || s.county === county) &&
          (city === ALL || s.city === city) &&
          (zip === ALL || s.zip === zip),
      ),
    [county, city, zip],
  );
  const metroCount = stores.filter((s) => s.brand === 'Metro').length;
  const cricketCount = stores.length - metroCount;

  /* ---- which polygon layer is drawn (never overlapping levels) ---- */
  const layers = useMemo(() => {
    if (zipData) return [{ key: zip, name: `ZIP ${zip}`, geometry: zipData.geometry, count: 0 }];
    if (cityData)
      return zipNames.map((z) => ({
        key: z,
        name: z,
        geometry: cityData.zips[z].geometry,
        count: STORES.filter((s) => s.zip === z).length,
      }));
    if (countyData)
      return cityNames.map((c) => ({
        key: c,
        name: c,
        geometry: countyData.cities[c].geometry,
        count: STORES.filter((s) => s.county === county && s.city === c).length,
      }));
    return COUNTY_NAMES.map((c) => ({
      key: c,
      name: c,
      geometry: COUNTIES[c].geometry,
      count: STORES.filter((s) => s.county === c).length,
    }));
  }, [county, city, zip, countyData, cityData, cityNames, zipNames, zipData]);

  const bounds: Bounds = zipData?.bbox ?? cityData?.bbox ?? countyData?.bbox ?? STATE_BOUNDS;

  const level = zipData ? 'ZIP area' : cityData ? 'ZIP codes' : countyData ? 'Cities' : 'Counties';

  const onLayerClick = (name: string) => {
    if (!countyData) setCounty(name);
    else if (!cityData) setCity(name);
    else if (!zipData) setZip(name);
  };

  return (
    <div className="dash">
      <header className="dash-head">
        <div>
          <h1>Colorado Retail Intelligence</h1>
          <p>Metro by T-Mobile &amp; Cricket Wireless coverage across the Denver metro counties</p>
        </div>
        <span className="scope-chip">Active scope: {scope.label}</span>
      </header>

      <section className="kpis">
        <div className="card kpi">
          <div className="kpi-icon" style={{ background: '#10b981' }}>M</div>
          <div>
            <div className="kpi-label">Metro by T-Mobile</div>
            <div className="kpi-value">{metroCount}</div>
            <div className="kpi-sub">stores in scope</div>
          </div>
        </div>
        <div className="card kpi">
          <div className="kpi-icon" style={{ background: '#ef4444' }}>C</div>
          <div>
            <div className="kpi-label">Cricket Wireless</div>
            <div className="kpi-value">{cricketCount}</div>
            <div className="kpi-sub">stores in scope</div>
          </div>
        </div>
        <div className="card kpi">
          <div className="kpi-icon" style={{ background: '#6366f1' }}>ES</div>
          <div>
            <div className="kpi-label">Spanish speakers</div>
            <div className="kpi-value">{scope.spanish}%</div>
            <div className="kpi-sub">of population — {scope.label}</div>
          </div>
        </div>
        <div className="card kpi">
          <div className="kpi-icon" style={{ background: '#f97316' }}>$</div>
          <div>
            <div className="kpi-label">Median household income</div>
            <div className="kpi-value">{money(scope.income)}</div>
            <div className="kpi-sub">{scope.label}</div>
          </div>
        </div>
      </section>

      <section className="card filters">
        <div className="field">
          <label htmlFor="f-state">State</label>
          <select id="f-state" value="Colorado" disabled>
            <option>Colorado</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="f-county">County</label>
          <select
            id="f-county"
            value={county}
            onChange={(e) => {
              setCounty(e.target.value);
              setCity(ALL);
              setZip(ALL);
            }}
          >
            <option value={ALL}>All counties</option>
            {COUNTY_NAMES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="f-city">City</label>
          <select
            id="f-city"
            value={city}
            disabled={!countyData}
            onChange={(e) => {
              setCity(e.target.value);
              setZip(ALL);
            }}
          >
            <option value={ALL}>All cities</option>
            {cityNames.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="f-zip">ZIP code</label>
          <select id="f-zip" value={zip} disabled={!cityData} onChange={(e) => setZip(e.target.value)}>
            <option value={ALL}>All ZIP codes</option>
            {zipNames.map((z) => (
              <option key={z} value={z}>{z}</option>
            ))}
          </select>
        </div>
        <button
          className="reset"
          type="button"
          onClick={() => {
            setCounty(ALL);
            setCity(ALL);
            setZip(ALL);
          }}
        >
          Reset filters
        </button>
      </section>

      <section className="map-wrap">
        <div className="card map-card">
          <MapContainer center={[39.7392, -104.9903]} zoom={9} scrollWheelZoom zoomControl>
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; OpenStreetMap &copy; CARTO'
            />
            <FitBounds bounds={bounds} />
            {layers.map((l, i) => (
              <GeoJSON
                key={`${level}-${l.key}`}
                data={l.geometry as never}
                style={{
                  color: colorFor(i),
                  weight: 1.6,
                  opacity: 0.95,
                  fillColor: colorFor(i),
                  fillOpacity: 0.35,
                }}
                eventHandlers={{ click: () => onLayerClick(l.name) }}
              >
                <Popup>
                  <div className="popup-title">{l.name}</div>
                  <div className="popup-meta">{l.count} stores</div>
                </Popup>
              </GeoJSON>
            ))}
            {stores.map((s) => (
              <Marker key={s.id} position={[s.lat, s.lng]} icon={storeIcon(s.brand)}>
                <Popup>
                  <div className="popup-title">{s.name}</div>
                  <div className="popup-meta">
                    {s.address}
                    <br />
                    {s.city ?? s.county} {s.zip ?? ''}
                    <br />
                    {s.phone}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <aside className="card legend">
          <h2>{level}</h2>
          {layers.map((l, i) => (
            <button className="legend-row" key={l.key} type="button" onClick={() => onLayerClick(l.name)}>
              <span className="swatch" style={{ background: colorFor(i) }} />
              {l.name}
              <span className="legend-count">{l.count}</span>
            </button>
          ))}
          <div className="legend-divider" />
          <h2>Brands</h2>
          <div className="brand-row">
            <span className="dot" style={{ background: '#10b981' }} /> Metro by T-Mobile
          </div>
          <div className="brand-row">
            <span className="dot" style={{ background: '#ef4444' }} /> Cricket Wireless
          </div>
        </aside>
      </section>
    </div>
  );
};

export default Dashboard;
