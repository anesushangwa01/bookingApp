import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookingService } from '../booking.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking-view-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking-view-details.component.html',
  styleUrls: ['./booking-view-details.component.css']
})
export class BookingViewDetailsComponent {
  booking: any;
  
  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService
  ) {}

  applyForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    checkInDate: new FormControl('', Validators.required),
    checkOutDate: new FormControl('', Validators.required),
    numberOfGuests: new FormControl('', [Validators.required, Validators.min(1)]),
    roomType: new FormControl('', Validators.required),
    numberOfRooms: new FormControl('', [Validators.required, Validators.min(1)]),
    specialRequests: new FormControl(''),
    hotelName: new FormControl('')  // Add hotel name to the form
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const bookingId = params.get('id');
      if (bookingId) {
        this.fetchBookingDetails(bookingId);
      } else {
        console.error('Booking ID is null.');
      }
    });
  }

  fetchBookingDetails(bookingId: string): void {
    this.bookingService.getBookingById(bookingId).subscribe(
      (data: any) => {
        this.booking = data;
        // Populate the hotel name field in the form
        this.applyForm.patchValue({ hotelName: data.name });
      },
      error => {
        console.error('Error fetching booking details:', error);
        // Optionally handle the error here (e.g., show an error message)
      }
    );
  }

  submitApplication() {
    if (this.applyForm.valid) {
      this.bookingService.applyHotel({
        firstName: this.applyForm.value.firstName,
        lastName: this.applyForm.value.lastName,
        email: this.applyForm.value.email,
        hotelName: this.applyForm.value.hotelName,
        checkInDate: this.applyForm.value.checkInDate,
        checkOutDate: this.applyForm.value.checkOutDate,
        numberOfGuests: this.applyForm.value.numberOfGuests,
        roomType: this.applyForm.value.roomType,
        numberOfRooms: this.applyForm.value.numberOfRooms,
        specialRequests: this.applyForm.value.specialRequests
      }).subscribe(
        response => {
          console.log('Application submitted successfully', response);
          this.applyForm.reset();
        },
        error => {
          console.error('Error submitting application', error);
        }
      );
    } else {
      console.error('Form is not valid');
      this.applyForm.markAllAsTouched();  // Optionally mark all form fields as touched to display validation messages
    }
  }
}
