import React, { useState } from 'react';
import './App.css';

function App() {
  const [trip_duration, setTripDuration] = useState('');
  const [distance_traveled, setDistance] = useState('');
  const [num_of_passengers, setNumPassengers] = useState('');
  const [fare, setFare] = useState('');
  const [tip, setTip] = useState('');
  const [miscellaneous_fees, setMiscFees] = useState('');
  const [surge_applied, setSurgeApplied] = useState('');
  const [predictedFare, setPredictedFare] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          trip_duration,
          distance_traveled,
          num_of_passengers,
          fare,
          tip,
          miscellaneous_fees,
          surge_applied
        })
      });
      if (!response.ok) {
        throw new Error('Failed to predict fare');
      }
      const data = await response.json();
      setPredictedFare(data.predictedFare);
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to predict fare');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cab Fare Predictor</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Trip Duration:</label>
            <input type="text" value={trip_duration} onChange={(e) => setTripDuration(e.target.value)} />
          </div>
          
          <div className="input-group">
            <label>Distance Traveled:</label>
            <input type="text" value={distance_traveled} onChange={(e) => setDistance(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Number of Passengers:</label>
            <input type="text" value={num_of_passengers} onChange={(e) => setNumPassengers(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Fare:</label>
            <input type="text" value={fare} onChange={(e) => setFare(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Tip:</label>
            <input type="text" value={tip} onChange={(e) => setTip(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Miscellaneous Fees:</label>
            <input type="text" value={miscellaneous_fees} onChange={(e) => setMiscFees(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Surge Applied:</label>
            <input type="text" value={surge_applied} onChange={(e) => setSurgeApplied(e.target.value)} />
          </div>
  
          
          <button type="submit">Predict Fare</button>
        </form>
        
        {predictedFare && (
          <div className="predicted-fare">
            Predicted Fare: {predictedFare}
            
          </div>
        )}

        {error && <div className="error">{error}</div>}
      </header>
    </div>
  );
}

export default App;
