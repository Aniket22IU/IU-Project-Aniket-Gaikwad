import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const generateLayout = async (parameters) => {
  const response = await api.post('/api/v1/urban-planning/generate-layout', parameters);
  return response.data;
};

export const runSimulation = async (layoutData) => {
  const response = await api.post('/api/v1/simulation/traffic', layoutData);
  return response.data;
};

export const trainGNN = async (trainingData) => {
  const response = await api.post('/api/v1/ml/train-gnn', trainingData);
  return response.data;
};

export const generateDiffusion = async (prompt) => {
  const response = await api.post('/api/v1/ml/generate-diffusion', { prompt });
  return response.data;
};