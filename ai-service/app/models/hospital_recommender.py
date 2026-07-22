import pandas as pd
import os
from app.utils.geo import calculate_haversine_distance

class HospitalRecommender:
    """Weighted scoring hospital recommendation engine."""
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(HospitalRecommender, cls).__new__(cls)
            cls._instance.hospitals_df = None
        return cls._instance
        
    def load(self):
        """Load hospital data."""
        file_path = "datasets/hospitals.csv"
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"Hospital data not found at {file_path}. Run generate_hospitals.py first.")
        
        self.hospitals_df = pd.read_csv(file_path)
        print("Hospital dataset loaded successfully.")
        
    def recommend(self, patient_lat: float, patient_lon: float, severity: str, required_specialty: str) -> list:
        if self.hospitals_df is None:
            raise RuntimeError("Hospital dataset is not loaded.")
            
        scored_hospitals = []
        
        for _, row in self.hospitals_df.iterrows():
            score = 0.0
            reasons = []
            
            dist_km = calculate_haversine_distance(patient_lat, patient_lon, row['latitude'], row['longitude'])
            if dist_km <= 5.0:
                dist_score = 30.0
                if dist_km <= 5.0: reasons.append("Nearest suitable hospital (within 5km)")
            elif dist_km <= 20.0:
                dist_score = 30.0 - (dist_km - 5.0) * (20.0 / 15.0)
            else:
                dist_score = max(0.0, 10.0 - (dist_km - 20.0) * 0.2)
            score += dist_score
            
            if severity in ["Critical", "High"]:
                if row['emergency_supported'] and row['icu_beds_available'] > 0 and row['ventilators_available'] > 0:
                    score += 25.0
                    reasons.append("Equipped for high severity (ICU & emergency available)")
                else:
                    score -= 50.0 
            else:
                score += 25.0
                
            if row['specialty'].lower() == required_specialty.lower():
                score += 15.0
                reasons.append(f"Specialty matched ({required_specialty})")
                
            doc_score = min(10.0, (row['available_doctors'] / 50.0) * 10.0)
            score += doc_score
            if row['available_doctors'] > 30:
                reasons.append("High doctor availability")
                
            occ_score = max(0.0, 10.0 - ((row['occupancy_percentage'] - 40.0) / 6.0))
            score += occ_score
            if row['occupancy_percentage'] < 70.0:
                reasons.append("Low occupancy")
                
            score += (row['hospital_rating'] / 5.0) * 10.0
            if row['hospital_rating'] >= 4.0:
                reasons.append("Highly rated facility")
                
            scored_hospitals.append({
                "hospital_name": row['hospital_name'],
                "recommendation_score": round(max(0.0, min(100.0, score)), 2),
                "distance_km": dist_km,
                "icu_beds_available": int(row['icu_beds_available']),
                "available_doctors": int(row['available_doctors']),
                "specialty": row['specialty'],
                "reason": list(set(reasons))[:4]
            })
            
        scored_hospitals.sort(key=lambda x: x['recommendation_score'], reverse=True)
        
        return scored_hospitals[:3]

hospital_recommender_instance = HospitalRecommender()
