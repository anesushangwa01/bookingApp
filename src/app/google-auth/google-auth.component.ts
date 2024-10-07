import { Component, Input } from '@angular/core';
import { BookingService } from '../booking.service';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { Router } from '@angular/router';
import { NgbDropdown,  NgbDropdownModule , NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-google-auth',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbDropdown,  NgbDropdownModule , NgbCollapseModule],
  templateUrl: './google-auth.component.html',
  styleUrl: './google-auth.component.css'
})
export class GoogleAuthComponent {

  isCollapsed = true;
  



  userInfo: any;

  constructor(private authService: BookingService, private router:Router) {}

  closeNavbar() {
    this.isCollapsed = true;
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
  
    // Only call getUserInfo if a token exists
    if (token) {
      this.authService.getUserInfo().subscribe(
        response => {
          this.userInfo = response;
        },
        (error: HttpErrorResponse) => {
          if (error.status === 403) {
            console.error('Access forbidden. Redirecting to login.');
            this.router.navigate(['/login']); // Redirect to login page
          } else {
            console.error('Error fetching user info:', error);
          }
        }
      );
    } else {
      console.log('No token found. User is not authenticated.');
      // Optionally redirect to login page or show a message
    }
  }
  











   
  // ngOnInit() {
  //   this.auth.user$.subscribe(user => {
  //     this.user = user;
  //   });
  //   this.auth.isAuthenticated().subscribe();
  // }


  // ngOnInit() {
  //   this.bookingService.user$.subscribe(user => {
  //     this.user = user;
  //   });

  
  // }
  // login() {
  //   this.authService.login();

  // }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']).then(() => {
      window.location.reload(); // Refresh the site after navigation
    });
  }
  

  // logout() {
  //   this.bookingService.logout();
  // }

}
