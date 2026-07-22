import joblib
import pandas as pd
import os

class SeverityModelWrapper:
    """Severity model singleton wrapper."""
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(SeverityModelWrapper, cls).__new__(cls)
            cls._instance.model = None
            cls._instance.encoder = None
        return cls._instance

    def load(self):
        """Load model and encoder."""
        model_path = "trained_models/severity_model.pkl"
        encoder_path = "trained_models/gender_encoder.pkl"
        
        if not os.path.exists(model_path) or not os.path.exists(encoder_path):
            raise FileNotFoundError("Model or encoder not found. Please train the model first.")
        
        try:
            self.model = joblib.load(model_path)
            self.encoder = joblib.load(encoder_path)
            print("Severity model and encoder loaded successfully.")
        except Exception as e:
            raise ValueError(f"Failed to load model or encoder. The files might be corrupted. Details: {str(e)}")

    def predict(self, features: dict) -> dict:
        """Predict severity probabilities from features."""
        if self.model is None or self.encoder is None:
            raise RuntimeError("Model is not loaded.")
        
        df = pd.DataFrame([features])
        
        df['gender'] = self.encoder.transform(df['gender'])
        
        probas = self.model.predict_proba(df)[0]
        classes = self.model.classes_
        
        probabilities = {cls: round(float(prob), 4) for cls, prob in zip(self.model.classes_, probas)}
        
        predicted_class = max(probabilities, key=probabilities.get)
        
        return {
            "predicted_class": predicted_class,
            "probabilities": probabilities
        }

severity_model_instance = SeverityModelWrapper()
