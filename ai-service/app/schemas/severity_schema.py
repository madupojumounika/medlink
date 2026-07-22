from pydantic import BaseModel, Field

class SeverityPredictionRequest(BaseModel):
    age: int = Field(..., ge=0, le=120, description="Age of the patient")
    gender: str = Field(..., description="Gender of the patient ('Male' or 'Female')")
    heart_rate: int = Field(..., ge=0, le=300, description="Heart rate in bpm")
    systolic_bp: int = Field(..., ge=0, le=300, description="Systolic blood pressure")
    diastolic_bp: int = Field(..., ge=0, le=200, description="Diastolic blood pressure")
    spo2: int = Field(..., ge=0, le=100, description="Oxygen saturation percentage")
    respiratory_rate: int = Field(..., ge=0, le=100, description="Respiratory rate per minute")
    temperature: float = Field(..., ge=20.0, le=45.0, description="Body temperature in Celsius")

class ModelInfo(BaseModel):
    name: str = "Emergency Severity Prediction"
    algorithm: str = "Random Forest"
    version: str = "1.0"

class PredictionResult(BaseModel):
    severity: str
    confidence: float
    risk_score: float
    recommendation: str

class SeverityPredictionResponse(BaseModel):
    success: bool
    prediction: PredictionResult
    model: ModelInfo = Field(default_factory=ModelInfo)
