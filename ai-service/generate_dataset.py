import random
import pandas as pd
import os

def get_vital_ranges():
    """Return vital sign ranges for each severity level"""
    return {
        "heart_rate": {
            "Low": [(60, 100)],
            "Medium": [(101, 119), (50, 59)],
            "High": [(120, 149), (40, 49)],
            "Critical": [(150, 200), (20, 39)]
        },
        "systolic_bp": {
            "Low": [(90, 120)],
            "Medium": [(121, 139), (85, 89)],
            "High": [(140, 189), (70, 84)],
            "Critical": [(190, 250), (40, 69)]
        },
        "diastolic_bp": {
            "Low": [(60, 80)],
            "Medium": [(81, 89), (50, 59)],
            "High": [(90, 110), (40, 49)],
            "Critical": [(111, 150), (20, 39)]
        },
        "spo2": {
            "Low": [(95, 100)],
            "Medium": [(92, 94)],
            "High": [(85, 91)],
            "Critical": [(70, 84)]
        },
        "respiratory_rate": {
            "Low": [(12, 20)],
            "Medium": [(21, 29), (10, 11)],
            "High": [(30, 39), (8, 9)],
            "Critical": [(40, 60), (4, 7)]
        },
        "temperature": {
            "Low": [(36.5, 37.5)],
            "Medium": [(37.6, 38.5), (35.5, 36.4)],
            "High": [(38.6, 40.5), (35.0, 35.4)],
            "Critical": [(40.6, 42.0), (32.0, 34.9)]
        }
    }

def generate_patient(severity):
    """Generate a realistic patient record for a given severity."""
    age = random.randint(1, 100)
    gender = random.choice(["Male", "Female"])
    
    ranges = get_vital_ranges()
    vitals = {}
    vital_keys = list(ranges.keys())
    
    if severity == "Low":
        target_keys = []
    else:
        # Randomize 2-4 abnormal vitals
        num_abnormal = random.randint(2, 4)
        target_keys = random.sample(vital_keys, num_abnormal)
        
    for key in vital_keys:
        # Apply severity or fallback to normal
        sev_to_use = severity if key in target_keys else "Low"
            
        range_options = ranges[key][sev_to_use]
        chosen_range = random.choice(range_options)
        
        if key == "temperature":
            val = round(random.uniform(chosen_range[0], chosen_range[1]), 1)
        else:
            val = random.randint(chosen_range[0], chosen_range[1])
            
        vitals[key] = val
        
    return {
        "age": age,
        "gender": gender,
        **vitals,
        "severity": severity
    }

def generate_dataset(num_records=5000, filename="datasets/severity_dataset.csv"):
    """Generate a balanced patient dataset and save to CSV."""
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    
    print(f"Generating {num_records} patient records...")
    
    # Ensure balanced classes
    severities = ["Low", "Medium", "High", "Critical"] * base_count
    
    # Handle remainder
    remainder = num_records % 4
    if remainder > 0:
        severities += random.choices(["Low", "Medium", "High", "Critical"], k=remainder)
    
    data = [generate_patient(sev) for sev in severities]
    
    # Shuffle data
    
    df = pd.DataFrame(data)
    df.to_csv(filename, index=False)
    
    balance = df['severity'].value_counts().to_dict()
    print(f"Dataset generated and saved to {filename}")
    print(f"Class distribution: {balance}")

if __name__ == "__main__":
    generate_dataset()
