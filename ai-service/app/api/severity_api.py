from fastapi import APIRouter, HTTPException
from app.schemas.severity_schema import SeverityPredictionRequest, SeverityPredictionResponse
from app.services.severity_service import SeverityService

router = APIRouter(
    prefix="/predict-severity",
    tags=["Severity Prediction"]
)

@router.post("", response_model=SeverityPredictionResponse, summary="Predict patient severity")
async def predict_severity_endpoint(request: SeverityPredictionRequest):
    """Predict patient severity via SeverityService."""
    try:
        response = SeverityService.predict_severity(request)
        return response
    except FileNotFoundError as e:
        raise HTTPException(status_code=503, detail=f"Service Unavailable: {str(e)}")
    except ValueError as e:
        # Handling model loading errors or invalid probabilities
        raise HTTPException(status_code=503, detail=f"Service Unavailable (Corrupted Model): {str(e)}")
    except RuntimeError as e:
        # Prediction failures due to unloaded model or execution issues
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Bad request: {str(e)}")
