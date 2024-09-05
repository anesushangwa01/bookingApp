import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookingService } from '../booking.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  errorMessage: string = '';
  registerForm: FormGroup;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private registerService: BookingService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      favoriteMovie: ['', Validators.required],
      favoriteCountry: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true; 
      this.registerService.register(this.registerForm.value).subscribe(
        response => {
          console.log('Registration successful', response);
          this.isLoading =false;
          this.router.navigate(['/login']); // Redirect to the login route
        },
        error => {
          if (error.status === 409) {
            this.errorMessage = error.error.message; // Use the message from backend
          } else {
            this.errorMessage = 'Registration failed. Please try again.';
            this.isLoading = false;
          }
          console.error('Registration error', error);
        }
      );
    }
  }
}