class ReferralPriorityEngine:
    """Rule-based referral priority engine."""
    
    @staticmethod
    def determine_priority(severity: str, hospital_score: float, distance_km: float, 
                           icu_available: bool, ambulance_available: bool, waiting_time_minutes: int) -> dict:
        priority = "Routine"
        reasons = []
        recommendation = "Proceed with routine referral."
        
        transfer_time_mins = int((distance_km / 40.0) * 60) + 5
        estimated_transfer_time = f"{transfer_time_mins} minutes"
        
        if severity == "Critical" and (not icu_available or waiting_time_minutes > 30):
            priority = "Critical Transfer"
            recommendation = "Immediate ICU transfer required to alternative facility."
            reasons.append("Critical severity")
            if not icu_available:
                reasons.append("No ICU available at current facility")
            if waiting_time_minutes > 30:
                reasons.append("Long waiting time")
                
        elif (severity == "High" or severity == "Critical") and ambulance_available:
            priority = "Emergency"
            recommendation = "Immediate ambulance transfer."
            reasons.append(f"{severity} severity")
            reasons.append("Ambulance available")
            if icu_available:
                reasons.append("ICU available")
            if hospital_score > 80:
                reasons.append("Hospital score above threshold")
                
        elif severity == "Medium" or (severity in ["Low", "Medium"] and waiting_time_minutes > 60) or (severity == "Medium" and distance_km < 10):
            priority = "Urgent"
            recommendation = "Transfer within 2-4 hours."
            if severity == "Medium":
                reasons.append("Medium severity")
            if waiting_time_minutes > 60:
                reasons.append("High waiting time")
            if distance_km < 10:
                reasons.append("Hospital nearby")
                
        else:
            priority = "Routine"
            recommendation = "Standard non-emergency transfer."
            reasons.append("Low severity")
            
        return {
            "priority": priority,
            "estimated_transfer_time": estimated_transfer_time,
            "recommendation": recommendation,
            "reason": reasons
        }

referral_priority_engine_instance = ReferralPriorityEngine()
