# Metamorph - Urban Planning AI Platform

A comprehensive urban planning platform using AI/ML for city layout optimization and visualization.

## Tech Stack

### Frontend
- **React.js** - Interactive web-based UI
- **Leaflet** - City layouts and maps visualization

### Backend
- **FastAPI** - API development
- **PostgreSQL** - Data storage

### AI/ML Stack
- **PyTorch** - Deep learning model development
- **PyTorch Geometric** - Graph Neural Networks
- **Hugging Face Diffusers** - Diffusion layout and image generation
- **Scikit-learn** - Preprocessing and scaling
- **NumPy & Pandas** - Data handling and analysis

### Simulation Tools
- **GeoPandas** - Map-based data handling
- **Shapely** - Geometric operations
- **Rasterio** - Terrain and population data I/O
- **SUMO** - Traffic simulation and flow analysis

## Quick Start

```bash
# Automated setup
python setup.py

# Start both services
./run.sh

# Or manual setup:
# Backend: source venv/bin/activate && cd backend && uvicorn main:app --reload
# Frontend: cd frontend && npm start

# Access:
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API docs: http://localhost:8000/docs
```

## Project Structure

```
metamorph2/
├── backend/          # FastAPI backend
├── frontend/         # React.js frontend
├── ml/              # AI/ML models and training
├── simulation/      # SUMO and simulation tools
├── docker-compose.yml
└── README.md
```