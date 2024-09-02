import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router , RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookingService } from '../booking.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking-view-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './booking-view-details.component.html',
  styleUrls: ['./booking-view-details.component.css']
})
export class BookingViewDetailsComponent {
  booking: any;
  userInfo: any;
  loading: boolean = false;
  totalAmount: number = 0;

  // Costs
  roomCosts = {
    single: 100,
    double: 200,
    suite: 400
  };
  guestCost = 50;

  applyForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    checkInDate: new FormControl('', Validators.required),
    checkOutDate: new FormControl('', Validators.required),
    numberOfGuests: new FormControl(null, [Validators.required, Validators.min(1)]),  // No default value
    roomType: new FormControl('', Validators.required),  // No default value
    specialRequests: new FormControl(''),
    hotelName: new FormControl('')
  });

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch booking details and user info
    this.route.paramMap.subscribe(params => {
      const bookingId = params.get('id');
      if (bookingId) {
        this.fetchBookingDetails(bookingId);
      }
    });

    this.bookingService.getUserInfo().subscribe(user => {
      this.userInfo = user;
      if (this.userInfo) {
        this.applyForm.patchValue({
          firstName: this.userInfo.name,
          email: this.userInfo.email
        });
      }
    });

    // Listen to form changes and recalculate total amount
    this.applyForm.valueChanges.subscribe(() => {
      this.calculateTotalAmount();
    });
  }

  fetchBookingDetails(bookingId: string): void {
    this.bookingService.getBookingById(bookingId).subscribe(
      (data: any) => {
        this.booking = data;
        this.applyForm.patchValue({ hotelName: data.name });
      },
      error => {
        console.error('Error fetching booking details:', error);
      }
    );
  }

  calculateTotalAmount(): void {
    const roomType = this.applyForm.get('roomType')?.value as 'single' | 'double' | 'suite';
const numberOfGuests = this.applyForm.get('numberOfGuests')?.value || 0;

const checkInDateValue = this.applyForm.get('checkInDate')?.value;
const checkOutDateValue = this.applyForm.get('checkOutDate')?.value;

const checkInDate = checkInDateValue ? new Date(checkInDateValue) : null;
const checkOutDate = checkOutDateValue ? new Date(checkOutDateValue) : null;

const roomCost = this.roomCosts[roomType] || 0;
const guestCost = numberOfGuests * this.guestCost;
const perDayCost = 100;

let dateCost = 0;

if (checkInDate && checkOutDate) {
  // Calculate the number of days between check-in and check-out dates
  const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
  const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

  dateCost = numberOfDays * perDayCost;
}

this.totalAmount = roomCost + guestCost + dateCost;

    
  }

  submitApplication() {
    if (this.applyForm.valid) {
      this.loading = true; 

      this.bookingService.applyHotel(this.applyForm.value).subscribe(
        response => {
          console.log('Application submitted successfully', response);
          this.applyForm.reset();
          this.loading = false;
          this.router.navigate(['/bookinginfo'], {
            queryParams: { message: 'Application submitted successfully!' }
          });
        },
        error => {
          console.error('Error submitting application', error);
          this.loading = false;
        }
      );
    } else {
      this.applyForm.markAllAsTouched();
    }
  }
}