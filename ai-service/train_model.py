import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import (
    accuracy_score, 
    classification_report, 
    precision_score, 
    recall_score, 
    f1_score, 
    confusion_matrix
)
import joblib
import os

def train():
    dataset_path = "datasets/severity_dataset.csv"
    if not os.path.exists(dataset_path):
        print(f"Error: {dataset_path} not found. Please run generate_dataset.py first.")
        return

    print("Loading dataset...")
    df = pd.read_csv(dataset_path)

    print(f"\nDataset Shape: {df.shape}")
    print("\nClass Distribution:")
    print(df['severity'].value_counts().to_string())

    print("\nEncoding categorical columns...")
    gender_encoder = LabelEncoder()
    df['gender'] = gender_encoder.fit_transform(df['gender'])

    X = df.drop(columns=['severity'])
    y = df['severity']

    print("Splitting train/test sets...")
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    print("Training RandomForestClassifier...")
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    print("\nEvaluating model...")
    y_pred = model.predict(X_test)
    
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred, average='weighted')
    recall = recall_score(y_test, y_pred, average='weighted')
    f1 = f1_score(y_test, y_pred, average='weighted')
    conf_matrix = confusion_matrix(y_test, y_pred)

    print(f"\nAccuracy:  {accuracy:.4f}")
    print(f"Precision: {precision:.4f}")
    print(f"Recall:    {recall:.4f}")
    print(f"F1 Score:  {f1:.4f}")
    
    print("\nConfusion Matrix:")
    print(conf_matrix)

    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))

    print("\n--- Model Evaluation Note ---")
    print("Note: The remarkably high accuracy is expected and directly results from the synthetic nature of the dataset. "
          "Because generate_dataset.py uses strict, un-noised, rule-based thresholds for each severity class, "
          "tree-based models like Random Forest can easily discover and perfectly split on these defined boundaries, "
          "leading to near-perfect performance.")

    print("\nFeature Importance:")
    importances = model.feature_importances_
    feature_names = X.columns
    feature_importance_df = pd.DataFrame({'Feature': feature_names, 'Importance': importances})
    feature_importance_df = feature_importance_df.sort_values(by='Importance', ascending=False)
    print(feature_importance_df.to_string(index=False))

    print("\nSaving model and encoder...")
    os.makedirs("trained_models", exist_ok=True)
    joblib.dump(model, "trained_models/severity_model.pkl")
    joblib.dump(gender_encoder, "trained_models/gender_encoder.pkl")
    # Save class labels for prediction consistency
    joblib.dump(model.classes_, "trained_models/classes.pkl")
    print("Files saved to trained_models/ directory successfully.")

if __name__ == "__main__":
    train()
