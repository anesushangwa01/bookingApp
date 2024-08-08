import { Component, HostListener } from '@angular/core';
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
    this.onScroll();
  }
  @HostListener('window:scroll', [])
  onScroll(): void {
    const elements = document.querySelectorAll('.fade-in');
    const windowHeight = window.innerHeight;

    elements.forEach(element => {
      const positionFromTop = element.getBoundingClientRect().top;

      if (positionFromTop - windowHeight <= 0) {
        element.classList.add('visible');
      }
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
