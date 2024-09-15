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

  submitBooking() {
    if (this.bookingForm.invalid || !this.selectedTaxi) {
      alert('Please fill in all required fields and select a taxi.');
      return;
    }
  
    const userId = this.taxiService.getUserIdFromToken(); // Get the user ID from the token
  
    if (!userId) {
      alert('User not authenticated.');
      return;
    }
  
    const bookingData = {
      ...this.bookingForm.value,
      pickupTime: this.bookingForm.value.pickupTime
        ? new Date(this.bookingForm.value.pickupTime).toISOString()
        : null,
      taxiId: this.selectedTaxi._id,
      userId: userId // Include the user ID in the booking data
    };
  
    this.taxiService.bookTaxi(bookingData).subscribe(
      (response) => {
        console.log('Taxi booked successfully:', response);
        alert('Taxi booked successfully!');
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
