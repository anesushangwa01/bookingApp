import { Component, Input } from '@angular/core';
import { booking } from '../bookAppmodel';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css'
})
export class BookingDetailsComponent {
  @Input() booking!: booking;
}
