import { Component } from '@angular/core';
import { BookingService } from '../booking.service';
import { FormBuilder, FormGroup, Validators ,  ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService:  BookingService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe((response: any) => {
        console.log('Login successful', response);
        localStorage.setItem('token', response.token); // Store the token
      }, error => {
        console.error('Login error', error);
      });
    }
  }

}
