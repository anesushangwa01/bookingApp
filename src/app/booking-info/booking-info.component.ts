import { Component } from '@angular/core';
import { BookingService } from '../booking.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-info.component.html',
  styleUrl: './booking-info.component.css'
})
export class BookingInfoComponent {

  bookings: any[] = [];

  constructor(private bookingService: BookingService, private router: Router) { }

  ngOnInit(): void {
    this.bookingService.getBookings().subscribe(
      data => {
        this.bookings = data;
      },
      err => {
        console.error('Error fetching bookings', err);
        this.router.navigate(['/login']);
      }
    );
  }

  
}
