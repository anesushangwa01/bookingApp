import { Component } from '@angular/core';
import { BookingService } from '../booking.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router , ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  notificationMessage: string = '';
  loading: boolean = false;

  constructor(private fb: FormBuilder, private authService: BookingService, private router: Router,    private route: ActivatedRoute) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['notify']) {
        this.notificationMessage = 'Please login to access your bookings.';
      }
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService.login(this.loginForm.value).subscribe(
        (response: any) => {
          console.log('Login successful', response);
          localStorage.setItem('token', response.token); // Store the token
          this.loading= true;
          this.router.navigate(['/']).then(() => {
            window.location.reload(); // Refresh the site after navigation
          });
        },
        error => {
          if (error.status === 400) {
            this.errorMessage = error.error.message; // Use the message from backend
          } else {
            this.errorMessage = 'Login failed. Please try again.';
       
          }
          console.error('Login error', error);
        }
      );
    }
  }
}
