import tkinter as tk
from tkinter import ttk
from datetime import datetime

# Sample data of trucks
truck_data = [
    {"pickup": "Place 1", "destination": "Place 2", "truck_id": "Truck1", "delivery_date": "2023-12-01"},
    {"pickup": "Place 1", "destination": "Place 2", "truck_id": "Truck2", "delivery_date": "2023-12-02"},
    {"pickup": "Place 3", "destination": "Place C", "truck_id": "Truck3", "delivery_date": "2023-12-03"},
    # Add more sample data as needed
]

def calculate_route():
    pickup_location = pickup_var.get()
    destination = destination_var.get()
    quantity = quantity_var.get()
    crop = crop_var.get()
    delivery_date_str = delivery_date_var.get()

    # Validate quantity
    try:
        quantity = float(quantity)
        if quantity < 50:
            raise ValueError("Quantity must be at least 50 kgs.")
    except ValueError:
        result_label.config(text="Please enter a valid quantity (at least 50 kgs).")
        return

    # Validate crop
    valid_crops = ["rice", "wheat", "sugarcane"]
    if crop.lower() not in valid_crops:
        result_label.config(text="Please select a valid crop (rice, wheat, or sugarcane).")
        return

    # Validate delivery date
    if not delivery_date_str:
        result_label.config(text="Please enter a delivery date.")
        return

    try:
        delivery_date = datetime.strptime(delivery_date_str, "%Y-%m-%d").date()
    except ValueError:
        result_label.config(text="Please enter a valid delivery date in the format YYYY-MM-DD.")
        return

    # Filter trucks based on user input
    relevant_trucks = [
        truck["truck_id"] for truck in truck_data
        if truck["pickup"] == pickup_location and truck["destination"] == destination
        and datetime.strptime(truck["delivery_date"], "%Y-%m-%d").date() <= delivery_date
    ]

    # Display the relevant trucks in the result label
    if relevant_trucks:
        result_label.config(text=f"Trucks from {pickup_location} to {destination} for {quantity} kgs of {crop} reaching before {delivery_date_str}: {', '.join(relevant_trucks)}")
    else:
        result_label.config(text=f"No trucks found from {pickup_location} to {destination} reaching before {delivery_date_str}.")

# Create the main window
window = tk.Tk()
window.title("Route Calculator")

# Create dropdowns for pickup location and destination
pickup_options = ["Place 1", "Place 2", "Place 3", "Place 4", "Place 5"]
pickup_var = tk.StringVar(value=pickup_options[0])
pickup_label = ttk.Label(window, text="Pickup Location:")
pickup_dropdown = ttk.Combobox(window, textvariable=pickup_var, values=pickup_options)

destination_var = tk.StringVar(value=pickup_options[1])  # Default to the second place
destination_label = ttk.Label(window, text="Destination:")
destination_dropdown = ttk.Combobox(window, textvariable=destination_var, values=pickup_options)

# Create entry widgets for quantity, crop, and delivery date
quantity_var = tk.StringVar()
quantity_label = ttk.Label(window, text="Quantity (in kgs):")
quantity_entry = ttk.Entry(window, textvariable=quantity_var)

crop_var = tk.StringVar()
crop_label = ttk.Label(window, text="Crop:")
crop_dropdown = ttk.Combobox(window, textvariable=crop_var, values=["Rice", "Wheat", "Sugarcane"])

delivery_date_var = tk.StringVar()
delivery_date_label = ttk.Label(window, text="Delivery Date:")
delivery_date_entry = ttk.Entry(window, textvariable=delivery_date_var)

# Create a button to calculate the route
calculate_button = ttk.Button(window, text="Calculate Route", command=calculate_route)

# Display the result
result_label = ttk.Label(window, text="")

# Layout
pickup_label.grid(row=0, column=0, padx=10, pady=10)
pickup_dropdown.grid(row=0, column=1, padx=10, pady=10)
destination_label.grid(row=1, column=0, padx=10, pady=10)
destination_dropdown.grid(row=1, column=1, padx=10, pady=10)
quantity_label.grid(row=2, column=0, padx=10, pady=10)
quantity_entry.grid(row=2, column=1, padx=10, pady=10)
crop_label.grid(row=3, column=0, padx=10, pady=10)
crop_dropdown.grid(row=3, column=1, padx=10, pady=10)
delivery_date_label.grid(row=4, column=0, padx=10, pady=10)
delivery_date_entry.grid(row=4, column=1, padx=10, pady=10)
calculate_button.grid(row=5, column=0, columnspan=2, pady=10)
result_label.grid(row=6, column=0, columnspan=2, pady=10)

# Start the Tkinter event loop
window.mainloop()
