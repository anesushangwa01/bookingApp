import { Component } from '@angular/core';
import { BookingService } from '../booking.service';
import { ActivatedRoute } from '@angular/router'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-myaccount',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './myaccount.component.html',
  styleUrl: './myaccount.component.css'
})
export class MyaccountComponent {
  accountAmount: number | null = null; // To hold the account amount
  errorMessage: string | null = null; // To hold any error messages

  constructor(private accountService:  BookingService) {}

  ngOnInit(): void {
    // Fetch the account amount when the component initializes
    this.accountService.getAccountAmount().subscribe(
      (data) => {
        this.accountAmount = data.amount; // Assign the fetched amount to the variable
      },
      (error) => {
        console.error('Error fetching account amount:', error);
        this.errorMessage = error.error.message || 'Failed to fetch account amount'; // Handle errors
      }
    );
  }
}
