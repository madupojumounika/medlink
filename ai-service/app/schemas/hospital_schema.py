from pydantic import BaseModel, Field
from typing import List

class HospitalRecommendationRequest(BaseModel):
    severity: str = Field(..., description="Patient severity (e.g., Low, Medium, High, Critical)")
    required_specialty: str = Field(..., description="Required medical specialty")
    latitude: float = Field(..., description="Patient's current latitude")
    longitude: float = Field(..., description="Patient's current longitude")

class RecommendedHospitalDetails(BaseModel):
    hospital_name: str
    recommendation_score: float
    distance_km: float
    icu_beds_available: int
    available_doctors: int
    specialty: str
    reason: List[str]

class HospitalRecommendationResponse(BaseModel):
    success: bool
    recommended_hospital: RecommendedHospitalDetails
