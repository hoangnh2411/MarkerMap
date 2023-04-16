import React from 'react';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { MapContainer } from 'react-leaflet';
import 'leaflet-geosearch/dist/geosearch.css';

const SearchBox = () => {
  const mapRef = React.useRef(null);

  React.useEffect(() => {
    if (mapRef.current) {
      const provider = new OpenStreetMapProvider();
      const searchControl = new GeoSearchControl({
        provider,
        style: 'bar',
        autoCompleteDelay: 1000,
        searchLabel: 'Enter address',
        showMarker: true,
        showPopup: false,
        autoClose: true,
        retainZoomLevel: false,
        animateZoom: true,
        keepResult: true,
      });
      const map = mapRef.current.leafletElement;
      map.addControl(searchControl);
      return () => {
        map.removeControl(searchControl);
      };
    }
  }, []);

  return (
    <div>
      <MapContainer
        center={[0, 0]}
        zoom={3}
        style={{ height: '500px', width: '100%' }}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
      />
    </div>
  );
};

export default SearchBox;
