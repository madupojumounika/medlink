import pandas as pd
import random
import os

def generate_hospitals(num_records=100, filename="datasets/hospitals.csv"):
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    
    # NYC base coordinates
    base_lat = 40.7128
    base_lon = -74.0060
    
    specialties = ["Cardiology", "Neurology", "Orthopedics", "General", "Trauma", "Pediatrics"]
    
    hospitals = []
    
    for i in range(1, num_records + 1):
        # Random coordinates within ~50km radius
        lat_offset = random.uniform(-0.45, 0.45)
        lon_offset = random.uniform(-0.45, 0.45)
        
        specialty = random.choice(specialties)
        
        # Major hospitals have larger capacities
        is_major = random.random() > 0.7
        
        icu_beds = random.randint(10, 50) if is_major else random.randint(0, 15)
        ventilators = random.randint(15, 60) if is_major else random.randint(0, 20)
        doctors = random.randint(20, 100) if is_major else random.randint(5, 30)
        occupancy = random.uniform(40.0, 99.0)
        rating = round(random.uniform(3.0, 5.0), 1)
        
        # Trauma and General usually support emergencies
        if specialty in ["Trauma", "General"]:
            emergency = True
        else:
            emergency = random.choice([True, False])
            
        hospital = {
            "hospital_id": f"H{str(i).zfill(3)}",
            "hospital_name": f"City Care {specialty} Center {i}" if not is_major else f"Metro General Hospital {i}",
            "latitude": round(base_lat + lat_offset, 6),
            "longitude": round(base_lon + lon_offset, 6),
            "specialty": specialty,
            "icu_beds_available": icu_beds,
            "ventilators_available": ventilators,
            "available_doctors": doctors,
            "occupancy_percentage": round(occupancy, 2),
            "emergency_supported": emergency,
            "hospital_rating": rating
        }
        
        hospitals.append(hospital)
        
    df = pd.DataFrame(hospitals)
    df.to_csv(filename, index=False)
    print(f"Generated {num_records} hospitals and saved to {filename}")

if __name__ == "__main__":
    generate_hospitals()
