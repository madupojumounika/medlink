from fastapi import APIRouter, HTTPException
from app.schemas.hospital_schema import HospitalRecommendationRequest, HospitalRecommendationResponse
from app.services.hospital_service import HospitalService

router = APIRouter(
    prefix="/recommend-hospital",
    tags=["Hospital Recommendation"]
)

@router.post("", response_model=HospitalRecommendationResponse, summary="Recommend a hospital for a patient")
async def recommend_hospital_endpoint(request: HospitalRecommendationRequest):
    """Recommend hospital via HospitalService."""
    try:
        response = HospitalService.recommend_hospital(request)
        return response
    except FileNotFoundError as e:
        raise HTTPException(status_code=503, detail=f"Service Unavailable: {str(e)}")
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Bad request: {str(e)}")
