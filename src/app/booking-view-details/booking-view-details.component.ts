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

  // Room type costs
  roomCosts = {
    single: 100,
    double: 200,
    suite: 400
  };

  // Cost per additional guest
  guestCost = 50;

  applyForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    checkInDate: new FormControl('', Validators.required),
    checkOutDate: new FormControl('', Validators.required),
    numberOfGuests: new FormControl(1, [Validators.required, Validators.min(1)]),
    roomType: new FormControl('single', Validators.required),
    specialRequests: new FormControl(''),
    hotelName: new FormControl('')
  });

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
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

    // Recalculate total amount whenever room type or number of guests changes
    this.applyForm.get('roomType')?.valueChanges.subscribe(() => this.calculateTotalAmount());
    this.applyForm.get('numberOfGuests')?.valueChanges.subscribe(() => this.calculateTotalAmount());

    // Calculate the initial total amount
    this.calculateTotalAmount();
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
    const numberOfGuests = this.applyForm.get('numberOfGuests')?.value || 1;

    const roomCost = this.roomCosts[roomType] || 0;
    const guestCost = (numberOfGuests - 1) * this.guestCost;

    this.totalAmount = roomCost + guestCost;
  }

  submitApplication(): void {
    if (this.applyForm.valid) {
      this.loading = true;

      this.bookingService.applyHotel({
        firstName: this.applyForm.value.firstName,
        email: this.applyForm.value.email,
        hotelName: this.applyForm.value.hotelName,
        checkInDate: this.applyForm.value.checkInDate,
        checkOutDate: this.applyForm.value.checkOutDate,
        numberOfGuests: this.applyForm.value.numberOfGuests,
        roomType: this.applyForm.value.roomType,
        specialRequests: this.applyForm.value.specialRequests
      }).subscribe(
        response => {
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