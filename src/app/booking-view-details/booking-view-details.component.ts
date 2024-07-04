import { Component,inject } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommonModule} from '@angular/common';
import {BookingService} from '../booking.service';
import { booking } from '../bookAppmodel';


@Component({
  selector: 'app-booking-view-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-view-details.component.html',
  styleUrl: './booking-view-details.component.css'
})
export class BookingViewDetailsComponent {

  // route: ActivatedRoute = inject(ActivatedRoute);
  // bookingId = -1;
  // constructor() {
  //     this.bookingId = Number(this.route.snapshot.params['id']);
  // }


    route: ActivatedRoute = inject(ActivatedRoute);
    bookingService = inject(BookingService);
    booking: booking | undefined;
    constructor() {
      const bookingId = Number(this.route.snapshot.params['id']);
      this.booking = this.bookingService.getHousingLocationById(bookingId);
    }
  }


