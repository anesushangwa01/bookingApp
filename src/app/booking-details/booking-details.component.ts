import { Component, Input } from '@angular/core';
// import { booking } from '../bookAppmodel';
import { RouterOutlet , RouterLink, RouterModule} from '@angular/router';


@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [ RouterOutlet , RouterLink, RouterModule],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css'
})
export class BookingDetailsComponent {
  @Input() booking!: any;
  
}
