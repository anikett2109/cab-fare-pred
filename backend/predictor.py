import sys
import pickle
import pandas as pd

# Load the trained model (make sure to provide the correct path to your model file)
model = pickle.load(open('model.pkl', 'rb'))

def predict_fare(trip_duration, distance_traveled, num_of_passengers, fare, tip, miscellaneous_fees, surge_applied):
    # Convert string arguments to numeric values
    trip_duration = float(trip_duration)
    distance_traveled = float(distance_traveled)
    num_of_passengers = int(num_of_passengers)
    fare = float(fare)
    tip = float(tip)
    miscellaneous_fees = float(miscellaneous_fees)
    surge_applied = float(surge_applied)

    # Create a DataFrame with the correct feature names
    df = pd.DataFrame([[trip_duration, distance_traveled, num_of_passengers, fare, tip, miscellaneous_fees, surge_applied]],
                      columns=['trip_duration', 'distance_traveled', 'num_of_passengers', 'fare', 'tip', 'miscellaneous_fees', 'surge_applied'])

    # Predict the fare using the loaded model
    predicted_fare = model.predict(df)

    # Print the predicted fare
    print(predicted_fare[0])

if __name__ == '__main__':
    if len(sys.argv) != 8:
        print("Error: This script requires 7 arguments for prediction.")
        sys.exit(1)

    # Command-line arguments for each feature
    _, trip_duration, distance_traveled, num_of_passengers, fare, tip, miscellaneous_fees, surge_applied = sys.argv

    # Call the predict function with the provided arguments
    predict_fare(trip_duration, distance_traveled, num_of_passengers, fare, tip, miscellaneous_fees, surge_applied)
