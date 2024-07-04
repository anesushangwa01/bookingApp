import { Component,inject } from '@angular/core';
import { BookingDetailsComponent} from '../booking-details/booking-details.component'
import { booking } from '../bookAppmodel';
import {CommonModule} from '@angular/common';
import {BookingService} from '../booking.service';





@Component({
  selector: 'app-booking-categories',
  standalone: true,
  imports: [BookingDetailsComponent,CommonModule],
  templateUrl: './booking-categories.component.html',
  styleUrl: './booking-categories.component.css'
})
export class BookingCategoriesComponent {
  bookingService: BookingService = inject(BookingService);
  bookings: booking[] = [];

  constructor() {
    this.bookings = this.bookingService.getAllHousingLocations();
  }

}


