import { Component,inject } from '@angular/core';
import { BookingDetailsComponent} from '../booking-details/booking-details.component'

import {CommonModule} from '@angular/common';
import {BookingService} from '../booking.service';
import { HeaderComponent } from '../header/header.component';





@Component({
  selector: 'app-booking-categories',
  standalone: true,
  imports: [BookingDetailsComponent,CommonModule, HeaderComponent],
  templateUrl: './booking-categories.component.html',
  styleUrl: './booking-categories.component.css'
})
export class BookingCategoriesComponent {
  bookings: any[] = [];
  bookingService: BookingService = inject(BookingService);

  constructor() { }

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
}


