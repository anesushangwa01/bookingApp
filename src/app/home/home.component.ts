import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterOutlet , RouterLink, RouterModule, Router} from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { BookingService } from '../booking.service';
import { CommonModule } from '@angular/common';
import { GoogleAuthComponent } from '../google-auth/google-auth.component';
import { HttpErrorResponse } from '@angular/common/http';

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




 

  userInfo: any;

  constructor(private authService: BookingService,  private router: Router) {}

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
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
