import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-add-bookings',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule ],
  templateUrl: './add-bookings.component.html',
  styleUrl: './add-bookings.component.css'
})
export class AddBookingsComponent {
  applyForm: FormGroup;
  bookings: any[] = [];

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


  submitApplication() {
    if (this.applyForm.valid) {
      this.bookingService.addBooking(this.applyForm.value).subscribe(
        response => {
          console.log('Booking added successfully:', response);
          this.applyForm.reset();
        },
        error => {
          console.error('Error adding booking:', error);
        }
      );
    }
  }

}
