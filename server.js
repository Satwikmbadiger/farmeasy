const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

const mongoURI = 'mongodb://localhost:27017/Transport';

// Define a schema and model for the trucks
const truckSchema = new mongoose.Schema({
  pickup: String,
  destination: String,
  truck_id: String,
  delivery_date: Date
});
const Truck = mongoose.model('Truck', truckSchema);

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Serve static files from the 'public' directory
app.use(express.static('public'));


app.post('/submitBookingRequest', (req, res) => {
  const newTruck = new Truck({
      pickup: req.body.pickup,
      destination: req.body.destination,
      truck_id: req.body.selectedTruck,
      delivery_date: req.body.deliveryDate
  });

  newTruck.save()
      .then(() => res.send('Booking request submitted successfully'))
      .catch(err => {
          console.error('Error submitting booking request:', err);
          res.status(500).send('Error submitting booking request');
      });
});

// Handle form submissions
app.post('/submitBookingRequest', (req, res) => {
  const newTruck = new Truck({
    pickup: req.body.pickup,
    destination: req.body.destination,
    truck_id: req.body.selectedTruck,
    delivery_date: req.body.deliveryDate
  });

  newTruck.save()
    .then(() => res.send('Booking request submitted successfully'))
    .catch(err => {
      console.error('Error submitting booking request:', err);
      res.status(500).send('Error submitting booking request');
    });
});

// Fetch truck data from MongoDB
app.get('/getTrucks', (req, res) => {
    const deliveryDate = new Date(req.query.deliveryDate);
    const pickup = req.query.pickup;
    const destination = req.query.destination;
  
    Truck.find({ 
      delivery_date: { $lte: deliveryDate },

    })
    .then(trucks => res.json(trucks))
    .catch(err => {
      console.error('Error fetching trucks:', err);
      res.status(500).send('Error fetching trucks');
    });
  });


app.listen(port, () => console.log(`Server running on port ${port}`));