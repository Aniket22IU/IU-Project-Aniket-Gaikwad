from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import urban_planning, simulation, ml_models

app = FastAPI(title="Metamorph API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(urban_planning.router, prefix="/api/v1")
app.include_router(simulation.router, prefix="/api/v1")
app.include_router(ml_models.router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Metamorph Urban Planning API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}