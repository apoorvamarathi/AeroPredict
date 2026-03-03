# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# import pandas as pd
# import joblib
# import uvicorn
# from datetime import datetime

# app = FastAPI(title="Flight Delay Prediction API")

# # Allow CORS for React frontend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],  # React default port
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Load model once at startup
# model = joblib.load("../flight_delay_model.pkl")

# class FlightInput(BaseModel):
#     airline: str
#     origin: str
#     dest: str
#     date: str          # format YYYY-MM-DD
#     dep_time: str      # format HH:MM
#     distance: int

# @app.get("/")
# def root():
#     return {"message": "Flight Delay Prediction API"}

# @app.post("/predict")
# def predict(flight: FlightInput):
#     # Parse date and time
#     flight_date = datetime.strptime(flight.date, "%Y-%m-%d")
#     dep_time = datetime.strptime(flight.dep_time, "%H:%M")

#     # Build feature dictionary (same as your prepare_input function)
#     month = flight_date.month
#     day_of_month = flight_date.day
#     day_of_week = flight_date.weekday()  # Monday=0
#     quarter = (month - 1) // 3 + 1
#     crs_dep_time = dep_time.hour * 100 + dep_time.minute

#     # Estimate arrival time (same logic as before)
#     flight_hours = flight.distance / 500
#     arrival_estimate = dep_time.hour + flight_hours + 0.5
#     if arrival_estimate >= 24:
#         arrival_estimate -= 24
#     crs_arr_time = int(arrival_estimate) * 100 + int((arrival_estimate % 1) * 60)

#     # Create DataFrame with exactly the columns the model expects
#     input_dict = {
#         "Quarter": [quarter],
#         "Month": [month],
#         "DayofMonth": [day_of_month],
#         "DayOfWeek": [day_of_week],
#         "CRSDepTime": [crs_dep_time],
#         "CRSArrTime": [crs_arr_time],
#         "Distance": [flight.distance],
#         "Reporting_Airline": [flight.airline],
#         "Origin": [flight.origin],
#         "Dest": [flight.dest]
#     }
#     df = pd.DataFrame(input_dict)

#     # Predict
#     pred = int(model.predict(df)[0])                 # 0 or 1
#     proba = model.predict_proba(df)[0].tolist()      # [prob_no_delay, prob_delay]

#     return {
#         "prediction": pred,
#         "probability": proba,
#         "delay_status": "Delayed" if pred == 1 else "On Time",
#         "confidence": round(max(proba) * 100, 2)
#     }

# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000)


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
import uvicorn
from datetime import datetime

app = FastAPI(title="Flight Delay Prediction API")

# Allow CORS for React frontend (Vite default port)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # Add your frontend URL
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model once at startup
model = joblib.load("../flight_delay_model.pkl")

# Load dataset for metadata (adjust path if needed)
df = pd.read_csv("../airline_cleaned.csv")

class FlightInput(BaseModel):
    airline: str
    origin: str
    dest: str
    date: str          # format YYYY-MM-DD
    dep_time: str      # format HH:MM
    distance: int

@app.get("/")
def root():
    return {"message": "Flight Delay Prediction API"}

@app.get("/metadata")
def get_metadata():
    """Return unique airlines, origins, destinations for dropdowns"""
    return {
        "airlines": sorted(df['Reporting_Airline'].dropna().unique().tolist()),
        "origins": sorted(df['Origin'].dropna().unique().tolist()),
        "destinations": sorted(df['Dest'].dropna().unique().tolist())
    }

@app.post("/predict")
def predict(flight: FlightInput):
    # Parse date and time
    flight_date = datetime.strptime(flight.date, "%Y-%m-%d")
    dep_time = datetime.strptime(flight.dep_time, "%H:%M")

    # Build feature dictionary
    month = flight_date.month
    day_of_month = flight_date.day
    day_of_week = flight_date.weekday()  # Monday=0
    quarter = (month - 1) // 3 + 1
    crs_dep_time = dep_time.hour * 100 + dep_time.minute

    # Estimate arrival time
    flight_hours = flight.distance / 500
    arrival_estimate = dep_time.hour + flight_hours + 0.5
    if arrival_estimate >= 24:
        arrival_estimate -= 24
    crs_arr_time = int(arrival_estimate) * 100 + int((arrival_estimate % 1) * 60)

    # Create DataFrame with exactly the columns the model expects
    input_dict = {
        "Quarter": [quarter],
        "Month": [month],
        "DayofMonth": [day_of_month],
        "DayOfWeek": [day_of_week],
        "CRSDepTime": [crs_dep_time],
        "CRSArrTime": [crs_arr_time],
        "Distance": [flight.distance],
        "Reporting_Airline": [flight.airline],
        "Origin": [flight.origin],
        "Dest": [flight.dest]
    }
    df_input = pd.DataFrame(input_dict)

    # Predict
    pred = int(model.predict(df_input)[0])                 # 0 or 1
    proba = model.predict_proba(df_input)[0].tolist()      # [prob_no_delay, prob_delay]

    return {
        "prediction": pred,
        "probability": proba,
        "delay_status": "Delayed" if pred == 1 else "On Time",
        "confidence": round(max(proba) * 100, 2)
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

