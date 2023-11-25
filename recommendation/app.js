const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Declare features as a global variable
let features = [];

// Define your endpoint for predictions
app.post('/predict', (req, res) => {
  // Ensure the request body and features are defined
  if (
    req.body &&
    req.body.N &&
    req.body.P &&
    req.body.K &&
    req.body.temperature &&
    req.body.humidity &&
    req.body.ph &&
    req.body.rainfall
  ) {
    // Extract features from the request body
    features = [
      parseFloat(req.body.N),
      parseFloat(req.body.P),
      parseFloat(req.body.K),
      parseFloat(req.body.temperature),
      parseFloat(req.body.humidity),
      parseFloat(req.body.ph),
      parseFloat(req.body.rainfall),
    ];

    // Execute the Python script to make predictions
    const pythonScriptPath = 'model.py'; // Update this with the correct path
    const command = `python ${pythonScriptPath} ${features.join(' ')}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('Error executing Python script:', error);
        console.error('stderr:', stderr);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        let prediction = stdout.trim();
        console.log('Python script output:', prediction);

        // Clear features after execution
        features = [];
        
        // Use the prediction in your application as needed
        res.json( prediction );
      }
    });
  } else {
    // Handle the case where some or all features are missing
    res.status(400).json({ error: 'Invalid request. Make sure all features are provided.' });
  }
});

// Serve HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});