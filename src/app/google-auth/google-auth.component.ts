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


  



  userInfo: any;

  constructor(private authService: BookingService, private router:Router) {}

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe(
      response => {
        this.userInfo = response;
        // console.log('User Info:', response);
      },
      (error: HttpErrorResponse) => {
        // console.error('Error fetching user info:', error);
      }
    );
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
    this.router.navigate(['/login']);
  }

  // logout() {
  //   this.bookingService.logout();
  // }

}
