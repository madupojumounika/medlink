from app.schemas.hospital_schema import HospitalRecommendationRequest, HospitalRecommendationResponse, RecommendedHospitalDetails
from app.models.hospital_recommender import hospital_recommender_instance

class HospitalService:
    """Hospital recommendation service logic."""
    
    @staticmethod
    def recommend_hospital(request_data: HospitalRecommendationRequest) -> HospitalRecommendationResponse:
        try:
            hospitals = hospital_recommender_instance.recommend(
                patient_lat=request_data.latitude,
                patient_lon=request_data.longitude,
                severity=request_data.severity,
                required_specialty=request_data.required_specialty
            )
            
            if not hospitals:
                raise RuntimeError("No suitable hospitals found.")
                
            best_hospital_data = hospitals[0]
            
            recommended_hospital = RecommendedHospitalDetails(
                hospital_name=best_hospital_data["hospital_name"],
                recommendation_score=best_hospital_data["recommendation_score"],
                distance_km=best_hospital_data["distance_km"],
                icu_beds_available=best_hospital_data["icu_beds_available"],
                available_doctors=best_hospital_data["available_doctors"],
                specialty=best_hospital_data["specialty"],
                reason=best_hospital_data["reason"]
            )
            
            return HospitalRecommendationResponse(
                success=True,
                recommended_hospital=recommended_hospital
            )
            
        except Exception as e:
            raise RuntimeError(f"Recommendation failed: {str(e)}")
