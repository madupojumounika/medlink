from pydantic import BaseModel, Field
from typing import List

class ReferralPriorityRequest(BaseModel):
    severity: str = Field(..., description="Patient severity (e.g., Low, Medium, High, Critical)")
    hospital_score: float = Field(..., description="Score of the receiving hospital (0-100)")
    distance_km: float = Field(..., description="Distance to the hospital in kilometers")
    icu_available: bool = Field(..., description="Whether ICU beds are available at the destination")
    ambulance_available: bool = Field(..., description="Whether an ambulance is available for transfer")
    waiting_time_minutes: int = Field(..., description="Expected waiting time at the destination in minutes")

class ReferralPriorityResponse(BaseModel):
    success: bool
    priority: str
    estimated_transfer_time: str
    recommendation: str
    reason: List[str]
