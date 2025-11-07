import React, { useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Rectangle, Polyline, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const AreaSelector = ({ onAreaSelected, selectedArea }) => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [startPoint, setStartPoint] = useState(null);

  useMapEvents({
    click(e) {
      if (isSelecting) {
        if (!startPoint) {
          setStartPoint([e.latlng.lat, e.latlng.lng]);
        } else {
          const endPoint = [e.latlng.lat, e.latlng.lng];
          const bounds = [
            [Math.min(startPoint[0], endPoint[0]), Math.min(startPoint[1], endPoint[1])],
            [Math.max(startPoint[0], endPoint[0]), Math.max(startPoint[1], endPoint[1])]
          ];
          onAreaSelected(bounds);
          setStartPoint(null);
          setIsSelecting(false);
        }
      }
    }
  });

  return (
    <>
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        zIndex: 1000,
        background: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
      }}>
        <button 
          onClick={() => {
            setIsSelecting(!isSelecting);
            setStartPoint(null);
          }}
          style={{
            background: isSelecting ? '#f44336' : '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {isSelecting ? 'Cancel Selection' : 'Select Area'}
        </button>
        {isSelecting && (
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#666' }}>
            {!startPoint ? 'Click to set first corner' : 'Click to set second corner'}
          </p>
        )}
      </div>
      
      {selectedArea && (
        <Rectangle
          bounds={selectedArea}
          pathOptions={{ color: '#FF5722', fillOpacity: 0.2, weight: 3, dashArray: '10, 10' }}
        >
          <Popup>Selected Planning Area</Popup>
        </Rectangle>
      )}
    </>
  );
};

const MapComponent = ({ layout, simulationResults, onAreaSelected, selectedArea }) => {
  const position = [51.505, -0.09];

  const getBuildingColor = (type) => {
    switch(type) {
      case 'residential': return '#4CAF50';
      case 'commercial': return '#2196F3';
      case 'office': return '#FF9800';
      default: return '#9E9E9E';
    }
  };

  return (
    <div className="map-container">
      <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <AreaSelector onAreaSelected={onAreaSelected} selectedArea={selectedArea} />
        
        {/* Default marker */}
        <Marker position={position}>
          <Popup>Urban Planning Area</Popup>
        </Marker>

        {/* Generated buildings */}
        {layout?.buildings?.map(building => (
          <Rectangle
            key={building.id}
            bounds={[
              [building.lat - 0.001, building.lng - 0.001],
              [building.lat + 0.001, building.lng + 0.001]
            ]}
            pathOptions={{ color: getBuildingColor(building.type), fillOpacity: 0.7 }}
          >
            <Popup>
              {building.type} Building<br/>
              Height: {building.height} floors
            </Popup>
          </Rectangle>
        ))}

        {/* Generated roads */}
        {layout?.roads?.map(road => (
          <Polyline
            key={road.id}
            positions={road.points}
            pathOptions={{ color: '#666', weight: 4 }}
          >
            <Popup>Road Network</Popup>
          </Polyline>
        ))}
      </MapContainer>
      
      {/* Simulation Results Panel */}
      {simulationResults && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'white',
          padding: '10px',
          borderRadius: '5px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          zIndex: 1000
        }}>
          <h4>Traffic Analysis</h4>
          <p>Flow: {simulationResults.traffic_flow}%</p>
          <p>Congestion: {simulationResults.congestion_level}</p>
          <p>Avg Speed: {simulationResults.average_speed}</p>
        </div>
      )}
    </div>
  );
};

export default MapComponent;