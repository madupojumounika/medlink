import logging
from datetime import datetime, timezone
from app.schemas.severity_schema import SeverityPredictionRequest, SeverityPredictionResponse, PredictionResult
from app.models.severity_model import severity_model_instance

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

RECOMMENDATIONS = {
    "Low": "Home care and observation.",
    "Medium": "Visit nearest hospital within 24 hours.",
    "High": "Immediate hospital evaluation recommended.",
    "Critical": "Activate ambulance and ICU referral immediately."
}

class SeverityService:
    """Severity prediction service logic."""
    @staticmethod
    def calculate_risk_score(probabilities: dict) -> float:
        weights = {
            "Low": 0.0,
            "Medium": 33.33,
            "High": 66.67,
            "Critical": 100.0
        }
        
        risk_score = sum(probabilities.get(cls, 0.0) * weight for cls, weight in weights.items())
        return round(risk_score, 2)

    @staticmethod
    def predict_severity(request_data: SeverityPredictionRequest) -> SeverityPredictionResponse:
        features = request_data.model_dump()
        
        try:
            prediction_result = severity_model_instance.predict(features)
            
            predicted_class = prediction_result["predicted_class"]
            probabilities = prediction_result["probabilities"]
            
            confidence = round(probabilities.get(predicted_class, 0.0) * 100, 2)
            
            risk_score = SeverityService.calculate_risk_score(probabilities)
            
            recommendation = RECOMMENDATIONS.get(predicted_class, "Seek medical advice.")
            
            log_msg = (
                f"Prediction Event - "
                f"Severity: {predicted_class}, "
                f"Confidence: {confidence}%, "
                f"Risk Score: {risk_score}"
            )
            logger.info(log_msg)
            
            return SeverityPredictionResponse(
                success=True,
                prediction=PredictionResult(
                    severity=predicted_class,
                    confidence=confidence,
                    risk_score=risk_score,
                    recommendation=recommendation
                )
            )
        except RuntimeError as e:
            raise e
        except ValueError as e:
            raise e
        except Exception as e:
            raise RuntimeError(f"Prediction failed: {str(e)}")
