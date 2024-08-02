import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,  ReactiveFormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BookingService } from '../booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,  ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private registerService: BookingService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.registerService.register(this.registerForm.value).subscribe(
        response => {
          console.log('Registration successful', response);
          this.router.navigate(['/login']); // Redirect to the login route
        },
        error => {
          console.error('Registration error', error);
        }
      );
    }
  }



}
