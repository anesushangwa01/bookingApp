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
  // auths: any[] = [];


  // user: any;

 
  // ngOnInit() {
  //   this.auth.user$.subscribe(user => {
  //     this.user = user;
  //   });
  //   this.auth.isAuthenticated().subscribe();
  // }


  user: any;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookingService.user$.subscribe(
      (userInfo) => {
        if (userInfo) {
          this.user = userInfo;
          console.log('User info received:', this.user);
        } else {
          console.warn('No user info received.');
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching user info:', error);
        this.errorMessage = 'Error fetching user info';
        this.isLoading = false;
      }
    );
  }


}
