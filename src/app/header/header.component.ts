import { Component } from '@angular/core';
import {RouterModule, Router} from '@angular/router';
import { NgbDropdown,  NgbDropdownModule , NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from '../booking.service';
import { CommonModule } from '@angular/common';
import { GoogleAuthComponent } from '../google-auth/google-auth.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, GoogleAuthComponent, NgbDropdownModule , NgbCollapseModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  user: any;
  isCollapsed = true;
  constructor(private bookingService: BookingService) {}
  

  ngOnInit() {
    this.bookingService.user$.subscribe(user => {
      this.user = user;
    });
    this.bookingService.isAuthenticated().subscribe();
  }

  logout() {
    this.bookingService.logout();
  }
  login() {
    this.bookingService.login();
  }
}
