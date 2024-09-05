import { Component } from '@angular/core';
import { BookingService } from '../booking.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MyaccountComponent } from '../myaccount/myaccount.component';

@Component({
  selector: 'app-booking-info',
  standalone: true,
  imports: [CommonModule, MyaccountComponent],
  templateUrl: './booking-info.component.html',
  styleUrl: './booking-info.component.css'
})
export class BookingInfoComponent {
  successMessage: string | null = null;
  bookings: any[] = [];
  isLoading: boolean = true;
  showMessage: boolean = false;

  constructor(private bookingService: BookingService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.bookingService.getBookings().subscribe(
      data => {
        this.bookings = data;
        this.isLoading = false;
      },
      err => {
        console.error('Error fetching bookings', err);
        this.isLoading = false;
        // this.router.navigate(['/login']);
      }
    );

   



    this.route.queryParams.subscribe(params => {
      this.successMessage = params['message'] || null;
      if (this.successMessage) {
        this.showMessage = true;

        setTimeout(() => {
          this.showMessage = false;
        }, 2000); 
      }
    });
  }

  closeMessage() {
    this.showMessage = false;
  }
  }


  
  

