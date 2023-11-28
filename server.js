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

// Sample data of trucks
let truckData = [
    { pickup: 'Place 1', destination: 'Place 2', truck_id: 'Truck1', delivery_date: '2023-12-01' },
    { pickup: 'Place 1', destination: 'Place 2', truck_id: 'Truck2', delivery_date: '2023-12-02' },
    { pickup: 'Place 1', destination: 'Place 2', truck_id: 'Truck1', delivery_date: '2023-12-03' },
    { pickup: 'Place 1', destination: 'Place 2', truck_id: 'Truck2', delivery_date: '2023-12-04' },
    // Add more sample data as needed
];

// Connect to MongoDB and insert the sample data
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        return Truck.insertMany(truckData);
    })
    .then(() => console.log('Sample data inserted'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Handle form submissions
app.post('/submitBookingRequest', (req, res) => {
    // ...
});