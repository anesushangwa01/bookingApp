import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BookingService } from '../booking.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-taxibooking',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './taxibooking.component.html',
  styleUrl: './taxibooking.component.css'
})
export class TaxibookingComponent {

  bookingForm!: FormGroup;
  availableTaxis: any[] = []; // To store the list of available taxis
  selectedTaxi: any = null; // To store the taxi selected by the user for booking
 // Form group to handle the booking details

  constructor(private taxiService:  BookingService, private fb: FormBuilder) {}

  ngOnInit(): void {
    // Fetch available taxis when the component loads
    this.getAvailableTaxis();

    // Initialize the form with validation
    this.bookingForm = this.fb.group({
      fromLocation: ['', Validators.required],
      toLocation: ['', Validators.required],
      pickupTime: ['', ]
    });
  }

  // Fetch the available taxis from the backend
  getAvailableTaxis() {
    this.taxiService.getAvailableTaxis().subscribe(
      (data) => {
        this.availableTaxis = data;
      },
      (error) => {
        console.error('Error fetching available taxis:', error);
      }
    );
  }

  // Handle the selection of a taxi to book
  bookTaxi(taxi: any) {
    this.selectedTaxi = taxi;
    // You can reset or update the form here if needed based on the taxi details
  }

  // Submit the booking form data to the backend
  submitBooking() {
    // Ensure the form is valid before submitting
    if (this.bookingForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    const bookingData = {
      ...this.bookingForm.value,
      taxiId: this.selectedTaxi._id // Include the selected taxi ID in the form data
    };

    this.taxiService.bookTaxi(bookingData).subscribe(
      (response) => {
        console.log('Taxi booked successfully:', response);
        alert('Taxi booked successfully!');
        // Optionally reset the form and clear the selected taxi
        this.selectedTaxi = null;
        this.bookingForm.reset();
      },
      (error) => {
        console.error('Error booking taxi:', error);
        alert('There was an error booking the taxi.');
      }
    );
  }

}
