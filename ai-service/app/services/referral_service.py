from app.schemas.referral_schema import ReferralPriorityRequest, ReferralPriorityResponse
from app.models.referral_priority import referral_priority_engine_instance

class ReferralService:
    """Referral priority service logic."""
    
    @staticmethod
    def get_priority(request_data: ReferralPriorityRequest) -> ReferralPriorityResponse:
        try:
            result = referral_priority_engine_instance.determine_priority(
                severity=request_data.severity,
                hospital_score=request_data.hospital_score,
                distance_km=request_data.distance_km,
                icu_available=request_data.icu_available,
                ambulance_available=request_data.ambulance_available,
                waiting_time_minutes=request_data.waiting_time_minutes
            )
            
            return ReferralPriorityResponse(
                success=True,
                priority=result["priority"],
                estimated_transfer_time=result["estimated_transfer_time"],
                recommendation=result["recommendation"],
                reason=result["reason"]
            )
        except Exception as e:
            raise RuntimeError(f"Referral priority evaluation failed: {str(e)}")
