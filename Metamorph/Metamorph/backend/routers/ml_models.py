from fastapi import APIRouter

router = APIRouter(prefix="/ml", tags=["machine-learning"])

@router.post("/train-gnn")
def train_gnn_model(training_data: dict):
    return {"model_id": "gnn_model_123", "status": "training"}

@router.post("/generate-diffusion")
def generate_diffusion_layout(prompt: str):
    return {"generated_layout": "diffusion_layout_123"}

@router.get("/models")
def list_models():
    return {"models": []}