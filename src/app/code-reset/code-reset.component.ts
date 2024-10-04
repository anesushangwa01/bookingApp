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

  constructor(private fb: FormBuilder, private bookingService: BookingService,    private router: Router) {
    this.requestResetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onRequestReset() {
    if (this.requestResetForm.valid) {
      this.bookingService.requestResetCode(this.requestResetForm.value).subscribe(
        response => {
          this.successMessage = 'Reset code sent to your email. Check your inbox!';
          this.errorMessage = '';
          this.router.navigate(['/reset']);
        },
        error => {
          this.errorMessage = 'Failed to send reset code. Please try again.';
          this.successMessage = '';
          console.error('Error requesting reset code', error);
        }
      );
    }
  }

}
