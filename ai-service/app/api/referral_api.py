from fastapi import APIRouter, HTTPException
from app.schemas.referral_schema import ReferralPriorityRequest, ReferralPriorityResponse
from app.services.referral_service import ReferralService

router = APIRouter(
    prefix="/referral-priority",
    tags=["Referral Priority Engine"]
)

@router.post("", response_model=ReferralPriorityResponse, summary="Determine priority for a patient referral")
async def referral_priority_endpoint(request: ReferralPriorityRequest):
    """Determine patient referral priority via ReferralService."""
    try:
        response = ReferralService.get_priority(request)
        return response
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Bad request: {str(e)}")
