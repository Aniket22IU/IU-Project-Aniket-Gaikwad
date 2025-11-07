import React from 'react';

const ResultsPanel = ({ layout, simulationResults, gnnResults, diffusionResults }) => {
  return (
    <div className="results-panel">
      <h3>Results Dashboard</h3>
      
      {layout && (
        <div className="result-section">
          <h4>🏗️ Generated Layout</h4>
          <div className="result-content">
            <p><strong>Layout ID:</strong> {layout.id}</p>
            <p><strong>Area Type:</strong> {layout.areaType}</p>
            <p><strong>Buildings:</strong> {layout.buildings.length}</p>
            <div className="building-list">
              {layout.buildings.map(building => (
                <div key={building.id} className="building-item">
                  <span className={`building-type ${building.type}`}>
                    {building.type}
                  </span>
                  <span>{building.height} floors</span>
                </div>
              ))}
            </div>
            <p><strong>Roads:</strong> {layout.roads.length} segments</p>
          </div>
        </div>
      )}

      {simulationResults && (
        <div className="result-section">
          <h4>🚗 Traffic Simulation</h4>
          <div className="result-content">
            <div className="metric">
              <span className="metric-label">Area Type:</span>
              <span className="metric-value">{simulationResults.area_type}</span>
            </div>
            <div className="metric">
              <span className="metric-label">Traffic Flow:</span>
              <span className="metric-value">{simulationResults.traffic_flow}%</span>
            </div>
            <div className="metric">
              <span className="metric-label">Congestion:</span>
              <span className="metric-value">{simulationResults.congestion_level}</span>
            </div>
            <div className="metric">
              <span className="metric-label">Average Speed:</span>
              <span className="metric-value">{simulationResults.average_speed}</span>
            </div>
            <div className="metric">
              <span className="metric-label">Peak Hours:</span>
              <span className="metric-value">{simulationResults.peak_hours}</span>
            </div>
          </div>
        </div>
      )}

      {gnnResults && (
        <div className="result-section">
          <h4>🧠 GNN Model Training</h4>
          <div className="result-content">
            <div className="metric">
              <span className="metric-label">Status:</span>
              <span className="metric-value success">Complete</span>
            </div>
            <div className="metric">
              <span className="metric-label">Area Complexity:</span>
              <span className="metric-value">{gnnResults.area_complexity}</span>
            </div>
            <div className="metric">
              <span className="metric-label">Accuracy:</span>
              <span className="metric-value">{gnnResults.accuracy}</span>
            </div>
            <div className="metric">
              <span className="metric-label">Training Time:</span>
              <span className="metric-value">{gnnResults.training_time}</span>
            </div>
          </div>
        </div>
      )}

      {diffusionResults && (
        <div className="result-section">
          <h4>🎨 Diffusion Generation</h4>
          <div className="result-content">
            <div className="metric">
              <span className="metric-label">Status:</span>
              <span className="metric-value success">Generated</span>
            </div>
            <div className="metric">
              <span className="metric-label">Area Style:</span>
              <span className="metric-value">{diffusionResults.area_style}</span>
            </div>
            <div className="metric">
              <span className="metric-label">Design Style:</span>
              <span className="metric-value">{diffusionResults.style}</span>
            </div>
            <div className="metric">
              <span className="metric-label">Generation Time:</span>
              <span className="metric-value">{diffusionResults.generation_time}</span>
            </div>
          </div>
        </div>
      )}

      {!layout && !simulationResults && !gnnResults && !diffusionResults && (
        <div className="no-results">
          <p>No results yet. Use the controls to generate layouts and run simulations.</p>
        </div>
      )}
    </div>
  );
};

export default ResultsPanel;