import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookingService } from '../booking.service';
import { RouterModule , Router} from '@angular/router';
@Component({
  selector: 'app-code-reset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './code-reset.component.html',
  styleUrl: './code-reset.component.css'
})
export class CodeResetComponent {

  errorMessage: string = '';
  successMessage: string = '';
  requestResetForm: FormGroup;
  isLoading: boolean = false;
  

  constructor(private fb: FormBuilder, private bookingService: BookingService,    private router: Router) {
    this.requestResetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onRequestReset() {
    if (this.requestResetForm.valid) {
      this.isLoading = true; 
      this.bookingService.requestResetCode(this.requestResetForm.value).subscribe(
        response => {
          // Display success message immediately
          this.successMessage = 'Reset code sent to your email. Check your inbox! or your spam folder';
          this.errorMessage = '';
  
          // Delay the redirection by 5 seconds (5000 milliseconds)
          setTimeout(() => {
            this.router.navigate(['/reset']);
          }, 5000);
        },
        error => {
          // Handle error without delay
          this.errorMessage = 'Failed to send reset code. Please try again.';
          this.successMessage = '';
          this.isLoading = false; 
          console.error('Error requesting reset code', error);
        }
      );
    }
  }
  

}
