const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { spawn } = require('child_process');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint for prediction
app.post('/predict', (req, res) => {
  const {
    trip_duration,
    distance_traveled,
    num_of_passengers,
    fare,
    tip,
    miscellaneous_fees,
    surge_applied
  } = req.body;

  // Convert all input data to strings to pass to the Python script
  const args = [
    trip_duration,
    distance_traveled,
    num_of_passengers,
    fare,
    tip,
    miscellaneous_fees,
    surge_applied
  ].map(String);

  // Execute predictor.py script with input data as arguments
  const pythonProcess = spawn('python', ['predictor.py', ...args]);

  // Capture stdout data (the predicted fare)
  pythonProcess.stdout.on('data', (data) => {
    res.json({ predictedFare: data.toString().trim() });
  });

  // Handle errors
  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Error executing the prediction script.' });
    }
  });

  pythonProcess.on('close', (code) => {
    if (code !== 0 && !res.headersSent) {
      res.status(500).json({ error: 'Prediction script exited with an error.' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
