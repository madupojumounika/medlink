from contextlib import asynccontextmanager
from fastapi import FastAPI

from app.api import severity_api, hospital_api, referral_api
from app.models.severity_model import severity_model_instance
from app.models.hospital_recommender import hospital_recommender_instance

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load models once on app startup."""
    print("Starting MedLink AI Service...")
    
    # Load Severity Model
    try:
        severity_model_instance.load()
    except FileNotFoundError as e:
        print(f"Warning: {str(e)}")
        print("Please run train_model.py before attempting to predict.")
        
    # Load Hospital Recommender Dataset
    try:
        hospital_recommender_instance.load()
    except FileNotFoundError as e:
        print(f"Warning: {str(e)}")
        print("Please run generate_hospitals.py before attempting to use the recommendation engine.")
    
    yield
    
    print("Shutting down MedLink AI Service...")

app = FastAPI(
    title="MedLink AI Service",
    description="AI microservice for the MedLink platform, providing medical predictions and insights.",
    version="1.0.0",
    lifespan=lifespan
)

    # Register routers
app.include_router(severity_api.router)
app.include_router(hospital_api.router)
app.include_router(referral_api.router)

@app.get(
    "/",
    tags=["Root"],
    summary="Root endpoint",
    description="Welcome endpoint to verify the service is accessible.",
)
async def root():
    return {
        "success": True,
        "message": "Welcome to MedLink AI Service"
    }


@app.get(
    "/health",
    tags=["Health"],
    summary="Health check endpoint",
    description="Checks the health status of the MedLink AI Service.",
)
async def health_check():
    return {
        "success": True,
        "service": "MedLink AI Service",
        "status": "Running"
    }
