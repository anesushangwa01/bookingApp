import { Component } from '@angular/core';
import { BookingDetailsComponent} from '../booking-details/booking-details.component'
import { booking } from '../bookAppmodel';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-booking-categories',
  standalone: true,
  imports: [BookingDetailsComponent,CommonModule],
  templateUrl: './booking-categories.component.html',
  styleUrl: './booking-categories.component.css'
})
export class BookingCategoriesComponent {
  

  readonly baseUrl = 'https://angular.dev/assets/tutorials/common';
  booking: booking = {
    id: 9999,
    name: 'Test Home',
    city: 'Test city',
    state: 'ST',
    photo: `${this.baseUrl}/example-house.jpg`,
    availableUnits: 99,
    wifi: true,
    laundry: false,
  };

}
