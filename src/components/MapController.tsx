import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

// Leaflet ke default marker icons ka path fix karne ke liye
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface MapControllerProps {
  center: [number, number];
  zoom: number;
}

export const MapController = ({ center, zoom }: MapControllerProps) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5 });
  }, [center, zoom, map]);

  return null;
};