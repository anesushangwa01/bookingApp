import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookingService } from '../booking.service';
import { RouterModule , Router} from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent {

  errorMessage: string = '';
  successMessage: string = '';
  resetForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private router: Router
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      resetCode: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.resetForm.valid) {
      this.bookingService.resetPassword(this.resetForm.value).subscribe(
        response => {
          console.log('Password reset successful', response);
          this.successMessage = 'Password reset successful. Redirecting to login...';
          this.errorMessage = '';
          setTimeout(() => {
            this.router.navigate(['/login']); // Redirect to the login route
          }, 2000); // Wait 2 seconds before redirecting
        },
        error => {
          this.errorMessage = 'Password reset failed. Please check your reset code and try again.';
          this.successMessage = '';
          console.error('Reset error', error);
        }
      );
    }
  }
}
