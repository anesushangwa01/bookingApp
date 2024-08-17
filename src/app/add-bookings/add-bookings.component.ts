import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-add-bookings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-bookings.component.html',
  styleUrls: ['./add-bookings.component.css']
})
export class AddBookingsComponent implements OnInit {
  applyForm: FormGroup;
  bookings: any[] = [];
  errorMessage: string | null = null;
  isEditMode = false;
  currentBookingId: string | null = null;

  constructor(private fb: FormBuilder, private bookingService: BookingService) {
    this.applyForm = this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      photo1: ['', Validators.required],
      photo2: ['', Validators.required],
      photo3: ['', Validators.required],
      photo4: ['', Validators.required],
      photo5: ['', Validators.required],
      availableUnits: [0, Validators.required],
      wifi: [false],
      laundry: [false],
      amount: [0, Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.fetchBookings();
  }

  fetchBookings() {
    this.bookingService.getAllBooking().subscribe(
      (data: any[]) => {
        this.bookings = data;
      },
      error => {
        console.error('Error fetching bookings:', error);
      }
    );
  }

  editBooking(booking: any) {
    this.isEditMode = true;
    this.currentBookingId = booking._id;
    this.applyForm.patchValue({
      name: booking.name,
      city: booking.city,
      state: booking.state,
      photo1: booking.photo1,
      photo2: booking.photo2,
      photo3: booking.photo3,
      photo4: booking.photo4,
      photo5: booking.photo5,
      availableUnits: booking.availableUnits,
      wifi: booking.wifi,
      laundry: booking.laundry,
      amount: booking.amount,
      description: booking.description
    });
  }

  updateBooking() {
    if (this.applyForm.valid) {
      this.bookingService.updateBooking(this.currentBookingId!, this.applyForm.value).subscribe(
        response => {
          console.log('Booking updated successfully:', response);
          this.applyForm.reset();
          this.isEditMode = false;
          this.currentBookingId = null;
          this.fetchBookings();  // Refresh the list of bookings
          this.errorMessage = null;
        },
        error => {
          console.error('Error updating booking:', error);
          if (error.error && error.error.message) {
            this.errorMessage = error.error.message;
          } else {
            this.errorMessage = 'An error occurred while updating the booking.';
          }
        }
      );
    }
  }

  submitApplication() {
    if (this.applyForm.valid) {
      this.bookingService.addBooking(this.applyForm.value).subscribe(
        response => {
          console.log('Booking added successfully:', response);
          this.applyForm.reset();
          this.errorMessage = null;
          this.fetchBookings();  // Refresh the list of bookings
        },
        error => {
          console.error('Error adding booking:', error);
          if (error.error && error.error.message) {
            this.errorMessage = error.error.message;
          } else {
            this.errorMessage = 'An error occurred while adding the booking.';
          }
        }
      );
    }
  }

  deleteBooking(id: string) {
    this.bookingService.deleteBooking(id).subscribe(
      response => {
        this.bookings = this.bookings.filter(booking => booking._id !== id);
        console.log(response.message);
      },
      error => this.errorMessage = error
    );
  }
}
