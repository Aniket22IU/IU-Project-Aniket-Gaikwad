import React, { useState } from 'react';

const ControlPanel = ({ onLayoutGenerated, onSimulationRun, onGnnTrained, onDiffusionGenerated }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [isDiffusing, setIsDiffusing] = useState(false);

  const handleGenerateLayout = async () => {
    setIsGenerating(true);
    setTimeout(() => {
      const mockLayout = {
        id: 'layout_' + Date.now(),
        buildings: [
          { id: 1, type: 'residential', lat: 51.505, lng: -0.09, height: 3 },
          { id: 2, type: 'commercial', lat: 51.506, lng: -0.088, height: 5 },
          { id: 3, type: 'office', lat: 51.507, lng: -0.087, height: 8 }
        ],
        roads: [
          { id: 1, points: [[51.504, -0.091], [51.508, -0.086]] },
          { id: 2, points: [[51.505, -0.092], [51.507, -0.085]] }
        ]
      };
      onLayoutGenerated(mockLayout);
      setIsGenerating(false);
    }, 2000);
  };

  const handleRunSimulation = async () => {
    setIsSimulating(true);
    setTimeout(() => {
      const mockResults = {
        traffic_flow: 85,
        congestion_level: 'Medium',
        average_speed: '25 km/h',
        peak_hours: '8-10 AM, 5-7 PM'
      };
      onSimulationRun(mockResults);
      setIsSimulating(false);
    }, 3000);
  };

  const handleTrainGNN = async () => {
    setIsTraining(true);
    setTimeout(() => {
      onGnnTrained();
      setIsTraining(false);
    }, 4000);
  };

  const handleGenerateDiffusion = async () => {
    setIsDiffusing(true);
    setTimeout(() => {
      onDiffusionGenerated();
      setIsDiffusing(false);
    }, 3000);
  };

  return (
    <div className="control-panel">
      <h3>Urban Planning Controls</h3>
      
      <div className="control-section">
        <h4>Layout Generation</h4>
        <button 
          onClick={handleGenerateLayout}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Generate Layout'}
        </button>
      </div>

      <div className="control-section">
        <h4>Simulation</h4>
        <button 
          onClick={handleRunSimulation}
          disabled={isSimulating}
        >
          {isSimulating ? 'Running...' : 'Run Traffic Simulation'}
        </button>
      </div>

      <div className="control-section">
        <h4>AI Models</h4>
        <button 
          onClick={handleTrainGNN}
          disabled={isTraining}
        >
          {isTraining ? 'Training...' : 'Train GNN Model'}
        </button>
        <button 
          onClick={handleGenerateDiffusion}
          disabled={isDiffusing}
        >
          {isDiffusing ? 'Generating...' : 'Generate with Diffusion'}
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;