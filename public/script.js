User
function calculateRoute() {
    // Extract form data
    const pickup = document.getElementById('pickup').value;
    const destination = document.getElementById('destination').value;
    const deliveryDate = document.getElementById('deliveryDate').value;

    // Validate form data (add your own validation logic)
    if (!pickup || !destination || !deliveryDate) {
        alert('Incomplete form data. Please fill in all fields.');
        return;
    }

    // Fetch trucks based on delivery date
    fetch(`/getTrucks?pickup=${pickup}&destination=${destination}&deliveryDate=${deliveryDate}`)
        .then(response => response.json())
        .then(trucks => {
            // Display trucks in checkboxes
            displayTrucks(trucks);
        })
        .catch(error => {
            console.error('Error fetching trucks:', error);
        });
}
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
function displayTrucks(trucks) {
    const truckFrame = document.getElementById('truckFrame');

    // Clear existing checkboxes
    while (truckFrame.firstChild) {
        truckFrame.removeChild(truckFrame.firstChild);
    }

    // Display trucks in radio buttons
    trucks.forEach(truck => {
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'truck';
        radio.value = truck.truck_id;
        radio.id = `truck${truck.truck_id}`;

        const label = document.createElement('label');
        label.htmlFor = `truck${truck.truck_id}`;
        label.appendChild(document.createTextNode(`Truck ${truck.truck_id} (Delivery Date: ${truck.delivery_date})`));

        truckFrame.appendChild(radio);
        truckFrame.appendChild(label);
        truckFrame.appendChild(document.createElement('br'));
    });

    // Enable or disable the "Submit Booking Request" button based on whether trucks are available
    const submitButton = document.getElementById('submitButton');
    submitButton.disabled = trucks.length === 0;
}


function submitBookingRequest() {
    // Extract form data
    const pickup = document.getElementById('pickup').value;
    const destination = document.getElementById('destination').value;
    const quantity = document.getElementById('quantity').value;
    const crop = document.getElementById('crop').value;
    const deliveryDate = document.getElementById('deliveryDate').value;

    // Extract selected truck
    const selectedTruck = document.querySelector('input[name="truck"]:checked');

  /*  // Validate form data (add your own validation logic)
    if (!pickup || !destination || !quantity || !crop || !deliveryDate || !selectedTruck) {
        alert('Incomplete form data. Please fill in all fields and select a truck.');
        return;
    }
    */

    // Create a FormData object to send the form data to the server
    const formData = new FormData();
    formData.append('pickup', pickup);
    formData.append('destination', destination);
    formData.append('quantity', quantity);
    formData.append('crop', crop);
    formData.append('deliveryDate', deliveryDate);
    formData.append('selectedTruck', selectedTruck.value);

    

    // Send a POST request to the server
    fetch('/submitBookingRequest', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.text())
    .then(message => {
        // Display the server's response
        alert(message);
    })
    .catch(error => {
        console.error('Error submitting booking request:', error);
    });
}