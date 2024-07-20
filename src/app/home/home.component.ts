import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterOutlet , RouterLink, RouterModule} from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { BookingService } from '../booking.service';
import { CommonModule } from '@angular/common';
import { GoogleAuthComponent } from '../google-auth/google-auth.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule,NgbCarouselModule, RouterOutlet , RouterLink,RouterModule, HeaderComponent, GoogleAuthComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // constructor(private auth:  BookingService) { }
  auths: any[] = [];


  // user: any;

 
  // ngOnInit() {
  //   this.auth.user$.subscribe(user => {
  //     this.user = user;
  //   });
  //   this.auth.isAuthenticated().subscribe({
  //     next: (isAuthenticated) => {
  //       console.log('User authenticated:', isAuthenticated);
  //     },
  //     error: (err) => {
  //       console.error('Authentication check failed:', err);
  //     }
  //   });
  // }


  isAuthenticated = false;
  user: any;

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.bookingService.isAuthenticated().subscribe(
      isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
        if (isAuthenticated) {
          const user = localStorage.getItem('user');
          this.user = user ? JSON.parse(user) : null; // Safely parse or set user to null
          console.log('User loaded from localStorage:', this.user); // Debugging log
        }
      },
      error => {
        console.error('Authentication check failed:', error);
      }
    );
  }
  


}
